"use client";
import React from "react";

const Selecter: React.FC<{
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}> = ({ value, onChange, options, id = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-2 py-1 border rounded"
    >
      {options.map((option) => (
        <option key={`${option}_${id}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Selecter;
