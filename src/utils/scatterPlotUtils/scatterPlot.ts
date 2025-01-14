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

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height);

  svg.selectAll("*").remove();

  const xAxisGroup = svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));
  xAxisGroup
    .selectAll("text")
    .style("font-size", "14px")
    .style("fill", "black");
  xAxisGroup.selectAll("path,line").attr("stroke", "black");

  const yAxisGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale).tickSizeOuter(0));
  yAxisGroup
    .selectAll("text")
    .style("font-size", "14px")
    .style("fill", "black");
  yAxisGroup.selectAll("path,line").attr("stroke", "black");

  svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(d[xAxes]))
    .attr("cy", (d) => yScale(d[yAxes]))
    .attr("r", 2)
    .attr("fill", "gray");

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
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - margin.bottom + 40)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "black")
    .text(xAxes);

  svg
    .append("text")
    .attr("x", -height / 2)
    .attr("y", margin.left - 40)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "black")
    .text(yAxes);

  svg
    .append("rect")
    .attr("x", margin.left + 0.5)
    .attr("y", margin.top + 0.5)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1);
};
