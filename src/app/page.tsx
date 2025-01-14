import ScatterPlot from "@/components/ScatterPlot";
import { Suspense } from "react";

const xAxes = "CD45-KrO";
const yAxes = "SS INT LIN";
const title = "Cell Distribution (CD45+)";

export default async function Home() {
  return (
    <div className="bg-white h-full text-black p-8">
      <h1>Scatter Plot</h1>
      <Suspense fallback={<div>Loading</div>}>
        <ScatterPlot xAxes={xAxes} yAxes={yAxes} title={title} />
      </Suspense>
    </div>
  );
}
