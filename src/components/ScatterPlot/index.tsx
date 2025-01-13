import { ScatterPlotProvider } from "@/contexts/ScatterPlotContext";
import { ScatterPlotProps } from "./model";
import ScatterPlot from "./ScatterPlot";

const ScatterPlotWrapper: React.FC<ScatterPlotProps> = (props) => {
  return (
    <ScatterPlotProvider {...props}>
      <ScatterPlot />
    </ScatterPlotProvider>
  );
};

export default ScatterPlotWrapper;
