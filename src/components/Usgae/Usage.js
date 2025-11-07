import React from "react";
import "./Usage.css";
import CurveGraph from "./Graph";

const Usage = () => {
  // UX Improvement: Consolidate data into a clear array of objects.
  // This makes it easier to manage and fixes the gauge logic.
  const usageData = [
    { label: "Today", value: 30, max: 100, unit: "L", color: "#00c6ff" },
    { label: "Weekly", value: 65, max: 100, unit: "L", color: "#ff6347" },
    { label: "Monthly", value: 75, max: 100, unit: "L", color: "#32cd32" },
  ];

  return (
    // UI Improvement: Use a semantic <section> wrapper
    <section className="usage-statistics">
      <h1 className="usage-title">Overall Water Usage</h1>
      
      <div className="usage-container">
        {usageData.map((data, index) => {
          // UX Fix: Correctly calculate gauge rotation.
          // The old logic (180 - value) was incorrect.
          // This calculates the percentage and converts it to degrees (0-180).
          // We use (1 - percentage) because 0% fill = 180deg rotation (hidden).
          const percentage = data.value / data.max;
          const rotation = (1 - percentage) * 180;

          return (
            <div className="card" key={index}>
              <h3>{data.label} Usage</h3>
              <div className="semicircle-wrapper">
                <div className="semicircle-bg">
                  <div
                    className="semicircle-fill"
                    style={{
                      // Apply the corrected rotation
                      transform: `rotate(${rotation}deg)`,
                      background: data.color,
                    }}
                  ></div>
                </div>
                <div className="center-text">
                  {/* Display the value and unit */}
                  <span>{`${data.value}${data.unit}`}</span>
                </div>
              </div>
              <div className="range">
                <span>0{data.unit}</span>
                {/* UX Improvement: Show the actual max value */}
                <span>{data.max}{data.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* UI Improvement: Pass a title to the graph component */}
      <CurveGraph title="Monthly Usage Trend (This Year vs. Last Year)" />
    </section>
  );
};

export default Usage;