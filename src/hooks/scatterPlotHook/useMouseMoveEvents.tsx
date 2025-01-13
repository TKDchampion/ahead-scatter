import { useCallback } from "react";
import throttle from "lodash/throttle";

export const useMouseEvents = (
  isPolygonMode: boolean,
  svgRef: React.RefObject<SVGElement | null>,
  polygons: any[],
  polygonPoints: any[],
  tempMousePosition: React.RefObject<any>,
  lineStyle: any,
  updatePolygonsDraw: Function
) => {
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

      updatePolygonsDraw(
        svgRef,
        polygons,
        polygonPoints,
        tempMousePosition,
        lineStyle
      );
    }, 50),
    [
      isPolygonMode,
      polygons,
      polygonPoints,
      svgRef,
      tempMousePosition,
      lineStyle,
    ]
  );

  return { throttledMouseMove };
};
