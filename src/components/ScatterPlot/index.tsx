import { ScatterPlotProvider } from "@/contexts/ScatterPlotContext";
import { getDataCSV } from "@/services/scatter";
import * as d3 from "d3";
import { ScatterPlotWrapperProps } from "./model";
import ScatterPlotWrapper from "./ScatterPlotWrapper";

export default async function ScatterPlot({
  xAxes,
  yAxes,
  title,
}: ScatterPlotWrapperProps) {
  const fileContents = await getDataCSV("CD45_pos");
  const rows = d3.csvParse(fileContents || "");
  const data = rows.map((row) => ({
    [xAxes]: +row[xAxes],
    [yAxes]: +row[yAxes],
  }));

  return (
    <ScatterPlotProvider data={data} xAxes={xAxes} yAxes={yAxes} title={title}>
      <ScatterPlotWrapper />
    </ScatterPlotProvider>
  );
}
