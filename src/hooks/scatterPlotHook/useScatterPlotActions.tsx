import { Polygon } from "@/components/ScatterPlot/model";
import { Action, State } from "@/contexts/model";
import { useCallback, useMemo } from "react";

const useScatterPlotActions = (
  dispatch: React.Dispatch<Action>,
  state: State,
  colors: string[]
) => {
  const getNextColor = useCallback(() => {
    dispatch({ type: "NEXT_COLOR" });
    return colors[state.colorIndex];
  }, [state.colorIndex]);

  return useMemo(
    () => ({
      setIsPolygonMode: () => dispatch({ type: "TOGGLE_POLYGON_MODE" }),
      setPolygonPoints: (points: { x: number; y: number }[]) =>
        dispatch({ type: "SET_POLYGON_POINTS", payload: points }),
      setPolygons: (polygons: Polygon[]) =>
        dispatch({ type: "SET_POLYGONS", payload: polygons }),
      setLineStyle: (style: string) =>
        dispatch({ type: "SET_LINE_STYLE", payload: style }),
      getNextColor,
    }),
    [dispatch, getNextColor]
  );
};

export default useScatterPlotActions;
