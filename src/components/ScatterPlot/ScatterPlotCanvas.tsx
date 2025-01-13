"use client";
import React from "react";
import { useScatterPlotContext } from "@/contexts/ScatterPlotContext";

interface ScatterPlotCanvasProps {
  handleMouseMove: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  handleMouseDown: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const ScatterPlotCanvas: React.FC<ScatterPlotCanvasProps> = ({
  handleMouseMove,
  handleMouseDown,
}) => {
  const { svgRef } = useScatterPlotContext();

  return (
    <svg
      ref={svgRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ScatterPlotCanvas;
