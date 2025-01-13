"use client";
import React, { useCallback } from "react";
import throttle from "lodash/throttle";
import PolygonControls from "./PolygonControls";
import { useScatterPlotContext } from "@/contexts/ScatterPlotContext";
import {
  addPolygonOrPoint,
  isPolygonClosing,
  updatePolygonsDraw,
} from "@/utils/scatterPlotUtils/polygonDraw";
import ScatterPlotCanvas from "./ScatterPlotCanvas";
import { useMouseEvents } from "@/hooks/scatterPlotHook/useMouseEvents";

const ScatterPlot: React.FC = () => {
  const {
    svgRef,
    isPolygonMode,
    polygonPoints,
    setPolygonPoints,
    polygons,
    setPolygons,
    lineStyle,
    tempMousePosition,
    getNextColor,
  } = useScatterPlotContext();

  const updatePolygons = useCallback(
    (updateFn: (polygon: any) => any) => {
      const newPolygons = polygons.map(updateFn);
      setPolygons(newPolygons);
      updatePolygonsDraw(
        svgRef,
        newPolygons,
        polygonPoints,
        tempMousePosition,
        lineStyle
      );
    },
    [polygons, svgRef, polygonPoints, tempMousePosition, lineStyle]
  );

  const handleToggleVisibility = (id: number) => {
    updatePolygons((polygon) =>
      polygon.id === id ? { ...polygon, visible: !polygon.visible } : polygon
    );
  };

  const handleColorChange = (id: number, color: string) => {
    updatePolygons((polygon) =>
      polygon.id === id ? { ...polygon, color } : polygon
    );
  };

  const throttledHandleUpdateText = useCallback(
    throttle((id: number, text: string) => {
      updatePolygons((polygon) =>
        polygon.id === id ? { ...polygon, text } : polygon
      );
    }, 50),
    [updatePolygons]
  );

  const { throttledMouseMove } = useMouseEvents(
    isPolygonMode,
    svgRef,
    polygons,
    polygonPoints,
    tempMousePosition,
    lineStyle,
    updatePolygonsDraw
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

    const isClosing = isPolygonClosing(newPoint, polygonPoints);

    const { newPolygons, newPolygonPoints } = addPolygonOrPoint(
      isClosing,
      newPoint,
      polygonPoints,
      polygons,
      getNextColor
    );

    setPolygons(newPolygons);
    setPolygonPoints(newPolygonPoints);
  };

  return (
    <div className="w-[800px] m-auto">
      <ScatterPlotCanvas
        handleMouseDown={handleMouseDown}
        handleMouseMove={throttledMouseMove}
      />
      <PolygonControls
        handleToggleVisibility={handleToggleVisibility}
        handleColorChange={handleColorChange}
        throttledHandleUpdateText={throttledHandleUpdateText}
      />
    </div>
  );
};

export default ScatterPlot;
