import { DataPoint, Polygon } from "@/components/ScatterPlot/model";
import * as d3 from "d3";

export const calculatePointsInPolygons = (
  filteredData: DataPoint[],
  polygons: Polygon[],
  xAxes: string,
  yAxes: string,
  margin: { top: number; right: number; bottom: number; left: number },
  width: number,
  height: number
): Polygon[] => {
  const xScale = d3
    .scaleLinear()
    .domain([200, 1000])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([height - margin.bottom, margin.top]);

  const isPointInPolygon = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ): boolean => {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y;
      const xj = polygon[j].x,
        yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  return polygons.map((polygon) => {
    const count = filteredData.filter((d) => {
      const point = { x: xScale(d[xAxes]), y: yScale(d[yAxes]) };
      return isPointInPolygon(point, polygon.points);
    }).length;

    const percentage = (count / filteredData.length) * 100;

    return { ...polygon, counts: count, percentage };
  });
};

export const updatePolygonsDraw = (
  svgRef: React.RefObject<SVGSVGElement | null>,
  polygons: Polygon[],
  polygonPoints: { x: number; y: number }[],
  tempMousePosition: React.RefObject<{ x: number; y: number } | null>,
  lineStyle: string
) => {
  const svg = d3.select(svgRef.current);
  svg.select(".dynamic-group").remove();

  const dynamicGroup = svg.append("g").attr("class", "dynamic-group");

  polygons.forEach((polygon) => {
    if (polygon.visible) {
      dynamicGroup
        .append("polygon")
        .attr("points", polygon.points.map((p) => `${p.x},${p.y}`).join(" "))
        .attr("fill", "none")
        .attr("stroke", polygon.color)
        .attr("stroke-width", 2)
        .attr("opacity", 0.6);

      const [p1, p2] = polygon.points.slice(0, 2);
      if (p1 && p2) {
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        dynamicGroup
          .append("text")
          .attr("x", midX)
          .attr("y", midY - 5)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("fill", polygon.color)
          .text(
            `${polygon.text} (${
              polygon.counts
            } points, ${polygon.percentage.toFixed(2)}%)`
          );
      }
    }
  });

  if (polygonPoints.length > 0) {
    dynamicGroup
      .append("path")
      .attr(
        "d",
        d3
          .line<{ x: number; y: number }>()
          .x((d) => d.x)
          .y((d) => d.y)([...polygonPoints, tempMousePosition.current!]) || ""
      )
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-dasharray", lineStyle === "dashed" ? "4 4" : "none")
      .attr("stroke-width", 1);

    dynamicGroup
      .selectAll("circle")
      .data(polygonPoints)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 4)
      .attr("fill", "red");
  }
};

export const addPolygonOrPoint = (
  isClosingPolygon: boolean,
  newPoint: any,
  polygonPoints: any[],
  polygons: any[],
  getNextColor: Function
) => {
  if (isClosingPolygon) {
    return {
      newPolygons: [
        ...polygons,
        {
          id: Date.now(),
          points: polygonPoints,
          visible: true,
          color: getNextColor(),
          text: `Polygon ${polygons.length + 1}`,
          counts: 0,
          percentage: 0,
        },
      ],
      newPolygonPoints: [],
    };
  } else {
    return {
      newPolygons: polygons,
      newPolygonPoints: [...polygonPoints, newPoint],
    };
  }
};

export const isPolygonClosing = (newPoint: any, polygonPoints: any[]) => {
  if (polygonPoints.length < 3) return false;
  const firstPoint = polygonPoints[0];
  return Math.hypot(newPoint.x - firstPoint.x, newPoint.y - firstPoint.y) < 10;
};
