"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export interface DataPoint {
  [Axes: string]: number;
}

interface ScatterPlotProps {
  data: DataPoint[];
  xAxes: string;
  yAxes: string;
  title: string;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xAxes,
  yAxes,
  title,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 800;
    const height = 900;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Filter data
    const filteredData = data.filter(
      (d) =>
        d[xAxes] >= 200 && d[xAxes] <= 1000 && d[yAxes] >= 0 && d[yAxes] <= 1000
    );

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

    // Clear previous content
    svg.selectAll("*").remove();

    // Draw X-axis
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));
    xAxisGroup
      .selectAll("text")
      .style("font-size", "14px")
      .style("fill", "black");
    xAxisGroup.selectAll("path,line").attr("stroke", "black");

    // Draw Y-axis
    const yAxisGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickSizeOuter(0));
    yAxisGroup
      .selectAll("text")
      .style("font-size", "14px")
      .style("fill", "black");
    yAxisGroup.selectAll("path,line").attr("stroke", "black");

    // Draw points
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

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "black")
      .text(title);

    // xAxis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "black")
      .text(xAxes);

    // yAxis label
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", margin.left - 40)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "black")
      .text(yAxes);

    // Draw border
    svg
      .append("rect")
      .attr("x", margin.left + 0.5)
      .attr("y", margin.top + 0.5)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  }, [data, xAxes, yAxes]);

  return <svg className="m-auto" ref={svgRef}></svg>;
};

export default ScatterPlot;
