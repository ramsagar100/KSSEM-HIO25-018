import React, { useState, useEffect } from "react";
import "./Usage.css";
import CurveGraph from "./Graph";

const CHANNEL_ID = "3152998";
const READ_API_KEY = "NWTU8JZHC0BHR2JK";
const POLL_INTERVAL_MS = 20000; // 20s
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;

const UsagewaterTank = () => {
  const [waterLevel, setWaterLevel] = useState("-");
  const [lastUpdate, setLastUpdate] = useState("-");

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.feeds && data.feeds.length > 0) {
        const lastEntry = data.feeds[0];
        setWaterLevel(parseFloat(lastEntry.field4).toFixed(0)); // ultrasonic water level
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

  // Calculate fill height in percentage (0 = empty, 100 = full)
  const fillPercentage = waterLevel !== "-" ? Math.min(Math.max(waterLevel, 0), 100) : 0;

  return (
    <section className="usage-statistics">
      <h2>Water Tank Level</h2>
      <div className="tank-gauge-container">
        <div className="tank">
          <div
            className="tank-fill"
            style={{ height: `${fillPercentage}%` }}
          ></div>
        </div>
        <div className="tank-value">{waterLevel !== "-" ? `${waterLevel}%` : "-"}</div>
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Last Updated: {lastUpdate}
      </p>

      {/* Dummy smaller gauges (can keep for other stats) */}
      <CurveGraph title="Monthly Usage Trend (This Year vs. Last Year)" />
    </section>
  );
};

export default UsagewaterTank;
