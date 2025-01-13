import { ScatterPlotProvider } from "@/contexts/ScatterPlotContext";
import ScatterPlot from "./ScatterPlot";
import { getDataCSV } from "@/services/scatter";
import * as d3 from "d3";

const xAxes = "CD45-KrO";
const yAxes = "SS INT LIN";
const title = "Cell Distribution (CD45+)";
export default async function ScatterPlotWrapper() {
  const fileContents = await getDataCSV("CD45_pos");
  const rows = d3.csvParse(fileContents || "");
  const data = rows.map((row) => ({
    [xAxes]: +row[xAxes],
    [yAxes]: +row[yAxes],
  }));

  return (
    <ScatterPlotProvider data={data} xAxes={xAxes} yAxes={yAxes} title={title}>
      <ScatterPlot />
    </ScatterPlotProvider>
  );
}
