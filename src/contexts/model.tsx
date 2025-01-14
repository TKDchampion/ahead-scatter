import { Polygon } from "@/components/ScatterPlot/model";

export interface ScatterPlotContextProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  tempMousePosition: React.RefObject<{ x: number; y: number } | null>;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  maxVisiblePoints?: number;
  colors: string[];
  isPolygonMode: boolean;
  setIsPolygonMode: () => void;
  polygonPoints: { x: number; y: number }[];
  setPolygonPoints: (points: { x: number; y: number }[]) => void;
  polygons: Polygon[];
  setPolygons: (polygons: Polygon[]) => void;
  drawLineStyle: string;
  setDrawLineStyle: (style: string) => void;
  colorIndex: number;
  getNextColor: () => string;
}

export type State = {
  isPolygonMode: boolean;
  polygonPoints: { x: number; y: number }[];
  polygons: Polygon[];
  drawLineStyle: string;
  colorIndex: number;
};

export type Action =
  | { type: "TOGGLE_POLYGON_MODE"; payload?: boolean }
  | { type: "SET_POLYGON_POINTS"; payload: { x: number; y: number }[] }
  | { type: "SET_POLYGONS"; payload: Polygon[] }
  | { type: "ADD_POLYGON"; payload: Polygon }
  | { type: "SET_DRAW_LINE_STYLE"; payload: string }
  | { type: "SET_COLOR_INDEX"; payload: number }
  | { type: "NEXT_COLOR" };
