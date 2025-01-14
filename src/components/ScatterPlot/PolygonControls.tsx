"use client";
import React from "react";
import { PolygonControlsProps } from "./model";
import { useScatterPlotContext } from "@/contexts/ScatterPlotContext";
import Selecter from "../Selecter";
import PolygonControlsItem from "./PolygonControlsItem";

const PolygonControls: React.FC<PolygonControlsProps> = ({
  handleToggleVisibility,
  handleColorChange,
  handleUpdateText,
  handleLineStyleChange,
}) => {
  const {
    isPolygonMode,
    setIsPolygonMode,
    setPolygonPoints,
    polygons,
    drawLineStyle,
    setDrawLineStyle,
    colors,
  } = useScatterPlotContext();

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
        <Selecter
          value={drawLineStyle}
          onChange={setDrawLineStyle}
          options={["solid", "dashed"]}
        />
      </div>
      <div className="mb-4">
        {polygons.map((polygon) => (
          <PolygonControlsItem
            key={polygon.id}
            polygon={polygon}
            colors={colors}
            handleToggleVisibility={handleToggleVisibility}
            handleColorChange={handleColorChange}
            handleUpdateText={handleUpdateText}
            handleLineStyleChange={handleLineStyleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default PolygonControls;
