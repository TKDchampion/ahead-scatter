"use client";
import React, { useCallback } from "react";
import PolygonControls from "./PolygonControls";
import { useScatterPlotContext } from "@/contexts/ScatterPlotContext";
import {
  addPolygonOrPoint,
  isPolygonClosing,
  updatePolygonsDraw,
} from "@/utils/scatterPlotUtils/polygonDraw";
import ScatterPlotCanvas from "./ScatterPlotCanvas";
import { useMouseEvents } from "@/hooks/scatterPlotHook/useMouseMoveEvents";

const ScatterPlotWrapper: React.FC = () => {
  const {
    svgRef,
    isPolygonMode,
    polygonPoints,
    setPolygonPoints,
    polygons,
    setPolygons,
    drawLineStyle,
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
        drawLineStyle
      );
    },
    [polygons, svgRef, polygonPoints, tempMousePosition, drawLineStyle]
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

  const handleLineStyleChange = (id: number, lineStyle: string) => {
    updatePolygons((polygon) =>
      polygon.id === id ? { ...polygon, lineStyle } : polygon
    );
  };

  const handleUpdateText = useCallback(
    (id: number, text: string) => {
      updatePolygons((polygon) =>
        polygon.id === id ? { ...polygon, text } : polygon
      );
    },
    [updatePolygons]
  );

  const { throttledMouseMove } = useMouseEvents(
    isPolygonMode,
    svgRef,
    polygons,
    polygonPoints,
    tempMousePosition,
    drawLineStyle,
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
      getNextColor,
      drawLineStyle
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
        handleUpdateText={handleUpdateText}
        handleLineStyleChange={handleLineStyleChange}
      />
    </div>
  );
};

export default ScatterPlotWrapper;
