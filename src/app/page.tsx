import ScatterPlotWrapper from "@/components/ScatterPlot";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="bg-white h-full text-black p-8">
      <h1>Scatter Plot</h1>
      <Suspense fallback={<div>Loading</div>}>
        <ScatterPlotWrapper />
      </Suspense>
    </div>
  );
}
