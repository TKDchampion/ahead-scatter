"use client";
import React from "react";
import { PolygonControlsProps } from "./model";

const PolygonControls: React.FC<PolygonControlsProps> = ({
  handleToggleVisibility,
  setIsPolygonMode,
  setPolygonPoints,
  isPolygonMode,
  polygons,
}) => {
  return (
    <div className="pl-8">
      <div className="flex items-center mb-4">
        <button
          onClick={() => {
            setIsPolygonMode((preIsPolygon) => !preIsPolygon);
            setPolygonPoints([]);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          {isPolygonMode ? "Exit Polygon Mode" : "Draw Polygon"}
        </button>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolygonControls;
