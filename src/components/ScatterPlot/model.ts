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
  lineStyle: string;
}

export interface ScatterPlotWrapperProps {
  xAxes: string;
  yAxes: string;
  title: string;
}

export interface PolygonControlsProps {
  handleToggleVisibility: (id: number) => void;
  handleColorChange: (id: number, color: string) => void;
  handleLineStyleChange: (id: number, lineStyle: string) => void;
  handleUpdateText: (id: number, text: string) => void;
}
