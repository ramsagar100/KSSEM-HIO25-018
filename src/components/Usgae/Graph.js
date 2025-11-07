import React from "react";
import "./Usage.css";
const CurveGraph = () => {
  const blueLine = [9500, 9800, 10500, 11500, 12500, 14000, 16000, 17500, 14000, 12000, 15000];
  const orangeLine = [9200, 9700, 10200, 11000, 12000, 13500, 15000, 16000, 13000, 11500, 14000];
  const years = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const spacingX = 50; // Distance between years
  const maxY = 20000;  // Maximum Y axis value
  const height = 300;
  const width = spacingX * (years.length - 1) + 100; // some margin

  const scaleY = (value) => height - (value / maxY) * height;

  const generatePath = (data) => {
    return data.map((y, i) => {
      const x = i * spacingX + 50;
      const scaledY = scaleY(y);
      return `${i === 0 ? "M" : "L"} ${x},${scaledY}`;
    }).join(" ");
  };

  return (
    <div style={{ overflowX: "auto" }} className="graph">
      <svg width={width} height={height} style={{ background: "#fff" }}>
        {/* Grid Lines */}
        {[5000, 10000, 15000, 20000].map((val, idx) => (
          <g key={idx}>
            <line x1="0" y1={scaleY(val)} x2={width} y2={scaleY(val)} stroke="#ddd" strokeDasharray="5,5" />
            <text x="5" y={scaleY(val) - 5} fontSize="10" fill="#777">${val / 1000}K</text>
          </g>
        ))}

        {/* X Axis Labels */}
        {years.map((year, idx) => (
          <text
            key={idx}
            x={idx * spacingX + 45}
            y={height - 5}
            fontSize="10"
            fill="#333"
          >
            {year}
          </text>
        ))}

        {/* Orange Line */}
        <path
          d={generatePath(orangeLine)}
          fill="none"
          stroke="#ffa500"
          strokeWidth="2"
        />

        {/* Blue Line */}
        <path
          d={generatePath(blueLine)}
          fill="none"
          stroke="#007bff"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default CurveGraph;
