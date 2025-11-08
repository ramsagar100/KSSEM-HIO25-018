import React, { useState, useEffect } from "react";
import "./Usage.css";
import CurveGraph from "./Graph";

const CHANNEL_ID = "3152998";
const READ_API_KEY = "NWTU8JZHC0BHR2JK";
const POLL_INTERVAL_MS = 20000; // 20s
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;

const UsageGarden = () => {
  const [soilMoisture, setSoilMoisture] = useState("-");
  const [flowRate, setFlowRate] = useState("-");
  const [totalVolume, setTotalVolume] = useState("-");
  const [waterLevel, setWaterLevel] = useState("-");
  const [lastUpdate, setLastUpdate] = useState("-");

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.feeds && data.feeds.length > 0) {
        const lastEntry = data.feeds[0];
        setSoilMoisture(parseFloat(lastEntry.field2).toFixed(0)); // field 2 for soil moisture
        setFlowRate(parseFloat(lastEntry.field1).toFixed(2));
        setTotalVolume(parseFloat(lastEntry.field3).toFixed(2));
        setWaterLevel(parseFloat(lastEntry.field4).toFixed(0));
        setLastUpdate(new Date(lastEntry.created_at).toLocaleString());
      }
    } catch (err) {
      console.error("Failed to fetch ThingSpeak data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const maxValue = 100; // Soil Moisture is in % (0-100)

  // Function to calculate stroke-dashoffset for semicircle
  const calculateDashOffset = (value) => {
    const arcLength = Math.PI * 90; // semicircle length
    return arcLength * (1 - (value !== "-" ? value / maxValue : 0));
  };

  // Dummy usage data for Today/Weekly/Monthly
  const usageData = [
    { label: "Today", value: 30, max: 100, unit: "L", color: "#00c6ff" },
    { label: "Weekly", value: 65, max: 100, unit: "L", color: "#ff6347" },
    { label: "Monthly", value: 75, max: 100, unit: "L", color: "#32cd32" },
  ];

  return (
    <section className="usage-statistics">
      {/* --- Top Live Gauge (Soil Moisture) --- */}
      <div className="main-gauge">
        <h2>Live Soil Moisture</h2>
        <div className="blynk-gauge">
          <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="gauge-svg">
            {/* Background semicircle */}
            <path
              d="M10 90 A90 90 0 0 1 190 90"
              fill="none"
              stroke="#ddd"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Foreground semicircle (value) */}
            <path
              d="M10 90 A90 90 0 0 1 190 90"
              fill="none"
              stroke="#32cd32"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${Math.PI * 90}`}
              strokeDashoffset={`${calculateDashOffset(soilMoisture)}`}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="blynk-value">
            {soilMoisture} <span className="unit">%</span>
          </div>
          <div className="blynk-range">
            <span>0%</span>
            <span>{maxValue}%</span>
          </div>
        </div>
      </div>

      {/* --- Dummy Smaller Gauges --- */}
      <div className="usage-container">
        {usageData.map((data, index) => {
          const percentage = data.value / data.max;
          const dashLength = Math.PI * 45;
          const dashOffset = dashLength * (1 - percentage);

          return (
            <div className="card" key={index}>
              <h3>{data.label} Usage</h3>
              <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="small-gauge">
                <path
                  d="M5 45 A45 45 0 0 1 95 45"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M5 45 A45 45 0 0 1 95 45"
                  fill="none"
                  stroke={data.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength}`}
                  strokeDashoffset={`${dashOffset}`}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="center-text">{data.value}{data.unit}</div>
              <div className="range">
                <span>0{data.unit}</span>
                <span>{data.max}{data.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Last Updated: {lastUpdate}
      </p>

      {/* --- Curve Graph --- */}
      <h1 className="usage-title">Overall Water Usage</h1>
      <CurveGraph title="Monthly Usage Trend (This Year vs. Last Year)" />
    </section>
  );
};

export default UsageGarden;
