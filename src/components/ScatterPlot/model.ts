export interface DataPoint {
  [Axes: string]: number;
}

export interface Polygon {
  id: number;
  points: { x: number; y: number }[];
  visible: boolean;
  color: string;
  text: string;
  counts: number;
  percentage: number;
}

export interface ScatterPlotProps {
  data: DataPoint[];
  xAxes: string;
  yAxes: string;
  title: string;
}

export interface PolygonControlsProps {
  handleToggleVisibility: (id: number) => void;
  handleColorChange: (id: number, color: string) => void;
  throttledHandleUpdateText: (id: number, text: string) => void;
}
