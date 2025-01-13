import * as d3 from "d3";

export const renderScatterPlot = (
  svgRef: React.RefObject<SVGSVGElement | null>,
  data: any[],
  xAxes: string,
  yAxes: string,
  title: string,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) => {
  const xScale = d3
    .scaleLinear()
    .domain([200, 1000])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([height - margin.bottom, margin.top]);

  const svg = d3.select(svgRef.current);

  svg.selectAll("*").remove();

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
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(d[xAxes]))
    .attr("cy", (d) => yScale(d[yAxes]))
    .attr("r", 2)
    .attr("fill", "gray");
};
