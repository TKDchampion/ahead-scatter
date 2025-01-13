"use client";
import React from "react";
import { PolygonControlsProps } from "./model";

const PolygonControls: React.FC<PolygonControlsProps> = ({
  setIsPolygonMode,
  setPolygonPoints,
  isPolygonMode,
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
    </div>
  );
};

export default PolygonControls;
