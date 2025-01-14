"use client";
import React from "react";
import { PolygonControlsProps } from "./model";
import throttle from "lodash/throttle";
import { useScatterPlotContext } from "@/contexts/ScatterPlotContext";
import { debounce } from "lodash";

const PolygonControls: React.FC<PolygonControlsProps> = ({
  handleToggleVisibility,
  handleColorChange,
  handleUpdateText,
}) => {
  const {
    isPolygonMode,
    setIsPolygonMode,
    setPolygonPoints,
    polygons,
    lineStyle,
    setLineStyle,
    colors,
  } = useScatterPlotContext();

  const debounceOnChange = debounce((id: number, text: string) => {
    handleUpdateText(id, text);
  }, 50);

  return (
    <div className="pl-8">
      <div className="flex items-center mb-4">
        <button
          onClick={() => {
            setIsPolygonMode();
            setPolygonPoints([]);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          {isPolygonMode ? "Exit Polygon Mode" : "Draw Polygon"}
        </button>
        <select
          value={lineStyle}
          onChange={(e) => setLineStyle(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
        </select>
      </div>
      <div className="mb-4">
        {polygons.map((polygon) => (
          <div key={polygon.id} className="mb-2 flex items-center">
            <button
              onClick={() => handleToggleVisibility(polygon.id)}
              className="px-4 py-2 rounded mr-2"
              style={{
                backgroundColor: polygon.visible ? polygon.color : "#ccc",
                color: polygon.visible ? "white" : "black",
              }}
            >
              {polygon.visible ? "Hide" : "Show"}
            </button>
            <input
              type="text"
              defaultValue={polygon.text}
              onChange={(e) => debounceOnChange(polygon.id, e.target.value)}
              className="px-2 py-1 border rounded mr-2"
              placeholder="Edit text"
            />
            <select
              value={polygon.color}
              onChange={(e) => handleColorChange(polygon.id, e.target.value)}
              className="px-2 py-1 border rounded"
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <span className="ml-2 text-gray-700">
              Points: {polygon.counts} ({polygon.percentage.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolygonControls;
