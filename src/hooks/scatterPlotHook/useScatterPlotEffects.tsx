import { DataPoint } from "@/components/ScatterPlot/model";
import { Action, State } from "@/contexts/model";
import { renderScatterPlot } from "@/utils/scatterPlotUtils/scatterPlot";
import { useEffect } from "react";
import * as d3 from "d3";
import {
  calculatePointsInPolygons,
  updatePolygonsDraw,
} from "@/utils/scatterPlotUtils/polygonDraw";

const useScatterPlotEffects = (
  svgRef: React.RefObject<SVGSVGElement | null>,
  filteredData: DataPoint[],
  xAxes: string,
  yAxes: string,
  title: string,
  state: State,
  dispatch: React.Dispatch<Action>,
  margin: { top: number; right: number; bottom: number; left: number },
  width: number,
  height: number,
  tempMousePosition: React.RefObject<{ x: number; y: number } | null>
) => {
  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    if (svgRef.current) {
      renderScatterPlot(
        svgRef,
        filteredData,
        xAxes,
        yAxes,
        title,
        width,
        height,
        margin
      );
    }
  }, [filteredData, xAxes, yAxes, title]);

  useEffect(() => {
    const updatedPolygons = calculatePointsInPolygons(
      filteredData,
      state.polygons,
      xAxes,
      yAxes,
      margin,
      width,
      height
    );
    dispatch({ type: "SET_POLYGONS", payload: updatedPolygons });

    updatePolygonsDraw(
      svgRef,
      updatedPolygons,
      state.polygonPoints,
      tempMousePosition,
      state.drawLineStyle
    );
  }, [state.polygonPoints]);
};

export default useScatterPlotEffects;
