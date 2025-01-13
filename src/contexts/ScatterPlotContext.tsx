"use client";
import React, { createContext, useReducer, useRef, useMemo } from "react";
import { DataPoint } from "@/components/ScatterPlot/model";
import { Action, ScatterPlotContextProps, State } from "./model";
import useFilteredData from "@/hooks/scatterPlotHook/useFilteredData";
import useScatterPlotEffects from "@/hooks/scatterPlotHook/useScatterPlotEffects";
import useScatterPlotActions from "@/hooks/scatterPlotHook/useScatterPlotActions";

const initialState: State = {
  isPolygonMode: false,
  polygonPoints: [],
  polygons: [],
  lineStyle: "solid",
  colorIndex: 0,
};

const colors = [
  "red",
  "orange",
  "#f5d803",
  "green",
  "blue",
  "indigo",
  "violet",
];

const ScatterPlotContext = createContext<ScatterPlotContextProps | undefined>(
  undefined
);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_POLYGON_MODE":
      return { ...state, isPolygonMode: !state.isPolygonMode };
    case "SET_POLYGON_POINTS":
      return { ...state, polygonPoints: action.payload };
    case "SET_POLYGONS":
      return { ...state, polygons: action.payload };
    case "SET_LINE_STYLE":
      return { ...state, lineStyle: action.payload };
    case "NEXT_COLOR":
      return { ...state, colorIndex: (state.colorIndex + 1) % colors.length };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const ScatterPlotProvider: React.FC<{
  children?: React.ReactNode;
  data: DataPoint[];
  xAxes: string;
  yAxes: string;
  title: string;
}> = ({ children, data, xAxes, yAxes, title }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tempMousePosition = useRef<{ x: number; y: number } | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const width = 800;
  const height = 900;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const maxVisiblePoints = 25000;

  const filteredData = useFilteredData(data, xAxes, yAxes, maxVisiblePoints);
  const actions = useScatterPlotActions(dispatch, state, colors);

  useScatterPlotEffects(
    svgRef,
    filteredData,
    xAxes,
    yAxes,
    title,
    state,
    dispatch,
    margin,
    width,
    height,
    tempMousePosition
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      svgRef,
      tempMousePosition,
      colors,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <ScatterPlotContext.Provider value={contextValue}>
      {children}
    </ScatterPlotContext.Provider>
  );
};

export const useScatterPlotContext = () => {
  const context = React.useContext(ScatterPlotContext);
  if (!context) {
    throw new Error(
      "useScatterPlotContext must be used within a ScatterPlotProvider"
    );
  }
  return context;
};
