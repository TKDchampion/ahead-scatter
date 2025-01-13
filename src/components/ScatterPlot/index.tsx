"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import * as d3 from "d3";
import throttle from "lodash/throttle";
import { Polygon, ScatterPlotProps } from "./model";
import PolygonControls from "./PolygonControls";

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xAxes,
  yAxes,
  title,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isPolygonMode, setIsPolygonMode] = useState(false);
  const [polygonPoints, setPolygonPoints] = useState<
    { x: number; y: number }[]
  >([]);
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const tempMousePosition = useRef<{ x: number; y: number } | null>(null);
  const width = 800;
  const height = 900;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  const colors = [
    "red",
    "orange",
    "#f5d803",
    "green",
    "blue",
    "indigo",
    "violet",
  ];
  const [colorIndex, setColorIndex] = useState(0);

  const getNextColor = () => {
    const color = colors[colorIndex];
    setColorIndex((prev) => (prev + 1) % colors.length);
    return color;
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (d) =>
        d[xAxes] >= 200 && d[xAxes] <= 1000 && d[yAxes] >= 0 && d[yAxes] <= 1000
    );
  }, [data, xAxes, yAxes]);

  const renderScatterPlot = () => {
    const xScale = d3
      .scaleLinear()
      .domain([200, 1000])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 1000])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "black")
      .text(title);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickSizeOuter(0));

    svg
      .append("g")
      .selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[xAxes]))
      .attr("cy", (d) => yScale(d[yAxes]))
      .attr("r", 2)
      .attr("fill", "gray");
  };

  const updatePolygons = (polygons: Polygon[]) => {
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
            .style("fill", polygon.color);
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
        .attr("stroke-dasharray", "4 2")
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

  const handleToggleVisibility = (id: number) => {
    const newPolygons = polygons.map((polygon) =>
      polygon.id === id ? { ...polygon, visible: !polygon.visible } : polygon
    );
    setPolygons(newPolygons);
    updatePolygons(newPolygons);
  };

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();
    renderScatterPlot();
  }, [filteredData, xAxes, yAxes, title]);

  useEffect(() => {
    setPolygons(polygons.map((polygon) => polygon));
    updatePolygons(polygons);
  }, [polygonPoints]);

  const throttledMouseMove = useCallback(
    throttle((event: React.MouseEvent) => {
      if (!isPolygonMode) return;
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      tempMousePosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      updatePolygons(polygons);
    }, 50),
    [isPolygonMode, polygons]
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!isPolygonMode) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const newPoint = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (
      polygonPoints.length > 2 &&
      Math.hypot(
        newPoint.x - polygonPoints[0].x,
        newPoint.y - polygonPoints[0].y
      ) < 10
    ) {
      const newPolygon = {
        id: Date.now(),
        points: polygonPoints,
        visible: true,
        color: getNextColor(),
        text: `Polygon ${polygons.length + 1}`,
        counts: 0,
        percentage: 0,
      };
      setPolygons([...polygons, newPolygon]);
      setPolygonPoints([]);
    } else {
      setPolygonPoints([...polygonPoints, newPoint]);
    }
  };

  return (
    <div className="w-[800px] m-auto">
      <svg
        ref={svgRef}
        onMouseMove={throttledMouseMove}
        onMouseDown={handleMouseDown}
      />
      <PolygonControls
        handleToggleVisibility={handleToggleVisibility}
        setIsPolygonMode={setIsPolygonMode}
        setPolygonPoints={setPolygonPoints}
        isPolygonMode={isPolygonMode}
        polygons={polygons}
      />
    </div>
  );
};

export default ScatterPlot;
