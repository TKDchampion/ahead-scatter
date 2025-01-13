export interface DataPoint {
  [Axes: string]: number;
}

export interface Polygon {
  id: number;
  points: { x: number; y: number }[];
}

export interface ScatterPlotProps {
  data: DataPoint[];
  xAxes: string;
  yAxes: string;
  title: string;
}

export interface PolygonControlsProps {
  setIsPolygonMode: React.Dispatch<React.SetStateAction<boolean>>;
  setPolygonPoints: React.Dispatch<
    React.SetStateAction<
      {
        x: number;
        y: number;
      }[]
    >
  >;
  isPolygonMode: boolean;
}
