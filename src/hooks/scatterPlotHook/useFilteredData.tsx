import { DataPoint } from "@/components/ScatterPlot/model";
import { useMemo, useCallback } from "react";

const useFilteredData = (
  data: DataPoint[],
  xAxes: string,
  yAxes: string,
  maxVisiblePoints: number
) => {
  const downsampleData = useCallback(
    (inputData: DataPoint[], maxPoints: number): DataPoint[] => {
      if (inputData.length <= maxPoints) return inputData;

      const step = Math.ceil(inputData.length / maxPoints);
      return inputData.filter((_, index) => index % step === 0);
    },
    []
  );

  const filteredData = useMemo(() => {
    const filtered = data.filter(
      (d) =>
        d[xAxes] >= 200 && d[xAxes] <= 1000 && d[yAxes] >= 0 && d[yAxes] <= 1000
    );
    return downsampleData(filtered, maxVisiblePoints);
  }, [data, xAxes, yAxes, downsampleData, maxVisiblePoints]);

  return filteredData;
};

export default useFilteredData;
