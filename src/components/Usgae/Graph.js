import React from "react";
import "./Usage.css";

// UI Improvement: Accept a title prop
const CurveGraph = ({ title }) => {
  const blueLine = [9500, 9800, 10500, 11500, 12500, 14000, 16000, 17500, 14000, 12000, 15000];
  const orangeLine = [9200, 9700, 10200, 11000, 12000, 13500, 15000, 16000, 13000, 11500, 14000];
  
  // UX Fix: Data arrays have 11 points, so the labels array should too.
  // Removed "Dec" to match the data.
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  const spacingX = 50; // Distance between months
  const maxY = 20000;  // Maximum Y axis value
  const height = 300;
  const width = spacingX * (months.length - 1) + 100; // some margin

  const scaleY = (value) => height - (value / maxY) * height;

  const generatePath = (data) => {
    return data.map((y, i) => {
      const x = i * spacingX + 50;
      const scaledY = scaleY(y);
      return `${i === 0 ? "M" : "L"} ${x},${scaledY}`;
    }).join(" ");
  };

  return (
    // UI Fix: Replaced brittle CSS with a cleaner container
    <div className="graph-container">
      {/* UI Improvement: Added a clear title */}
      {title && <h2 className="graph-title">{title}</h2>}
      
      {/* UI Improvement: Added a simple legend */}
      <div className="graph-legend">
        <div><span className="legend-color-blue"></span> This Year</div>
        <div><span className="legend-color-orange"></span> Last Year</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <svg width={width} height={height} className="graph-svg">
          {/* Grid Lines */}
          {[5000, 10000, 15000, 20000].map((val, idx) => (
            <g key={idx}>
              <line x1="50" y1={scaleY(val)} x2={width - 50} y2={scaleY(val)} stroke="#ddd" strokeDasharray="4,4" />
              {/* UX Fix: Changed Y-axis labels from dollars ($) to Liters (L) */}
              <text x="5" y={scaleY(val) + 4} fontSize="10" fill="#777">{val / 1000}KL</text>
            </g>
          ))}

          {/* X Axis Labels */}
          {months.map((month, idx) => (
            <text
              key={idx}
              x={idx * spacingX + 50}
              y={height - 5}
              fontSize="10"
              fill="#333"
              textAnchor="middle" // Center-align text
            >
              {month}
            </text>
          ))}

          {/* Orange Line */}
          <path
            d={generatePath(orangeLine)}
            fill="none"
            stroke="#ffa500"
            strokeWidth="2"
            className="graph-path"
          />

          {/* Blue Line */}
          <path
            d={generatePath(blueLine)}
            fill="none"
            stroke="#007bff"
            strokeWidth="3"
            className="graph-path"
          />
        </svg>
      </div>
    </div>
  );
};

export default CurveGraph;