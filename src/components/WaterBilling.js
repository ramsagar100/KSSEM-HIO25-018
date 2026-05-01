import React, { useState } from "react";
import QRCode from "react-qr-code";
import "./WaterBilling.css";

export default function WaterBilling() {
  const [waterUsed] = useState(458);
  const basePrice = 0.8;

  const totalAmount = (waterUsed * basePrice).toFixed(2);

  // UPI QR — SCANNABLE
  const upiString = `upi://pay?pa=ramsagar9332-1@oksbi&pn=WaterBill&am=${totalAmount}&cu=INR`;

  return (
    <div className="billing-container">
      <div className="billing-card fadeIn">

        <h2 className="title">Tenant Water Bill</h2>

        <div className="section">
          <p>Total Water Used</p>
          <h1>{waterUsed} L</h1>
        </div>

        <div className="section">
          <p>Base Price per Liter</p>
          <h2>₹{basePrice}</h2>
        </div>

        <hr />

        <div className="section">
          <p>Total Amount Payable</p>
          <h1 className="amount">₹{totalAmount}</h1>
        </div>

        <hr />

        <div className="section">
          <p>Scan to Pay</p>
          <div className="qr-wrapper zoomIn">
            <QRCode value={upiString} size={180} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
