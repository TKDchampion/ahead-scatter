"use client";
import React from "react";
import { debounce } from "lodash";
import { Polygon } from "./model";
import Selecter from "../Selecter";

const PolygonControlsItem: React.FC<{
  polygon: Polygon;
  colors: string[];
  handleToggleVisibility: (id: number) => void;
  handleColorChange: (id: number, color: string) => void;
  handleUpdateText: (id: number, text: string) => void;
  handleLineStyleChange: (id: number, style: string) => void;
}> = ({
  polygon,
  colors,
  handleToggleVisibility,
  handleColorChange,
  handleUpdateText,
  handleLineStyleChange,
}) => {
  const debounceOnChange = debounce((id: number, text: string) => {
    handleUpdateText(id, text);
  }, 50);

  return (
    <div className="mb-2 flex items-center">
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
      <Selecter
        value={polygon.color}
        onChange={(e) => handleColorChange(polygon.id, e)}
        options={colors}
      />
      <span className="mx-2 text-gray-700">
        Points: {polygon.counts} ({polygon.percentage.toFixed(2)}%)
      </span>
      <Selecter
        id="2"
        value={polygon.lineStyle}
        onChange={(e) => handleLineStyleChange(polygon.id, e)}
        options={["solid", "dashed"]}
      />
    </div>
  );
};

export default PolygonControlsItem;
