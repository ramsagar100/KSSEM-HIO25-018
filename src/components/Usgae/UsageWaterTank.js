import React, { useState, useEffect } from "react";
import "./Usage.css";
import CurveGraph from "./Graph";

const CHANNEL_ID = "3153117";
const READ_API_KEY = "ZJHFP876HZ9DBOAD";
const POLL_INTERVAL_MS = 20000; // 20s
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;

const MAX_DISTANCE = 30; // cm - adjust this to your tank height (sensor to tank bottom)
const MIN_DISTANCE = 3; // cm - when tank is full (distance to water is very low)

const UsagewaterTank = () => {
  const [sensorValue, setSensorValue] = useState("-");
  const [fillPercentage, setFillPercentage] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("-");

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.feeds && data.feeds.length > 0) {
        const lastEntry = data.feeds[0];
        const rawValue = parseFloat(lastEntry.field4);

        if (!isNaN(rawValue)) {
          // Map 0-1000 value to fill %
          const percent = ((1000 - rawValue) / 1000) * 100;
          setSensorValue(rawValue.toFixed(0));
          setFillPercentage(percent.toFixed(0));
        }

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

  const getStatus = () => {
    if (fillPercentage < 25) return "🚨 Low Water Level";
    if (fillPercentage < 75) return "💧 Normal Level";
    return "✅ Tank Full";
  };

  return (
    <section className="usage-statistics">
      <h2>🚰 Water Tank Level Monitor</h2>

      <div className="tank-visual">
        <div className="tank">
          <div
            className="tank-fill"
            style={{ height: `${fillPercentage}%` }}
          ></div>
          <div className="tank-overlay">
            <div className="tank-label">{fillPercentage}%</div>
          </div>
        </div>
        <p className="tank-status">{getStatus()}</p>
      </div>

      <div className="sensor-info">
        <p>🔼 Sensor Value: {sensorValue}</p>
        <p>📅 Last Updated: {lastUpdate}</p>
      </div>

      <h3 style={{ marginTop: "30px" }}>
        📊 Monthly Usage Trend (This Year vs. Last Year)
      </h3>
      <CurveGraph title="Monthly Usage Trend (This Year vs. Last Year)" />
    </section>
  );
};


export default UsagewaterTank;
