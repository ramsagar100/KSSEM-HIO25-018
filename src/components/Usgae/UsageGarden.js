import React, { useState, useEffect } from "react";
import "./Usage.css";
import CurveGraph from "./Graph";

const CHANNEL_ID = "3153117";
const READ_API_KEY = "ZJHFP876HZ9DBOAD";
const POLL_INTERVAL_MS = 20000;
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;

const UsageGarden = () => {
  const [soilMoisture, setSoilMoisture] = useState("-");
  const [lastUpdate, setLastUpdate] = useState("-");

  // Fetch live ThingSpeak data
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.feeds && data.feeds.length > 0) {
        const lastEntry = data.feeds[0];
        const moisture = parseFloat(lastEntry.field1);

        if (!isNaN(moisture)) {
          // Clamp the value between 0–100 for safe display
          const clamped = Math.min(100, Math.max(0, moisture));
          setSoilMoisture(clamped.toFixed(0));
        }
        
        setLastUpdate(new Date(lastEntry.created_at).toLocaleString());
      }
    } catch (err) {
      console.error("ThingSpeak fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const maxValue = 100;

  // Calculate gauge fill
  const calculateDashOffset = (value) => {
    const arcLength = Math.PI * 90; // semicircle path length
    return arcLength * (1 - (value !== "-" ? value / maxValue : 0));
  };

  // Determine status text
  const getStatus = (value) => {
    if (value === "-") return "Loading...";
    const num = parseFloat(value);
    if (num < 30) return "💧 Dry";
    if (num < 70) return "🌿 Optimal";
    return "🌊 Wet";
  };

  return (
    <section className="usage-statistics">
      <div className="main-gauge">
        <h2>🌱 Live Soil Moisture</h2>

        <div className="blynk-gauge">
          <svg viewBox="0 0 200 100" className="gauge-svg">
            {/* Background semicircle */}
            <path
              d="M10 90 A90 90 0 0 1 190 90"
              fill="none"
              stroke="#eee"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Foreground semicircle */}
            <path
              d="M10 90 A90 90 0 0 1 190 90"
              fill="none"
              stroke="#4caf50"
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
            <span>100%</span>
          </div>
          <div className="status-text">{getStatus(soilMoisture)}</div>
        </div>

        <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
          Last Updated: {lastUpdate}
        </p>
      </div>

      <h1 className="usage-title">Soil Moisture Trend</h1>
      <CurveGraph title="Soil Moisture Levels (Live Feed)" />
    </section>
  );
};

export default UsageGarden;
