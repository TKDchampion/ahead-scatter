import fs from "fs";
import path from "path";
import * as d3 from "d3";
import ScatterPlotWrapper from "@/components/ScatterPlot";

const xAxes = "CD45-KrO";
const yAxes = "SS INT LIN";
const title = "Cell Distribution (CD45+)";

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "CD45_pos.csv");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const rows = d3.csvParse(fileContents);
  const data = rows.map((row) => ({
    [xAxes]: +row[xAxes],
    [yAxes]: +row[yAxes],
  }));

  return (
    <div className="bg-white h-full text-black p-8">
      <h1>Scatter Plot</h1>
      <ScatterPlotWrapper
        data={data}
        xAxes={xAxes}
        yAxes={yAxes}
        title={title}
      />
    </div>
  );
}
