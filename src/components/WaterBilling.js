import React, { useState, useEffect } from "react";
import QRious from "qrious";
import "./WaterBilling.css"; // create this file for same styling

const WaterBilling = () => {
  const pricePerLiter = 0.8;
  const prevMonthUsage = 480;
  const prevMonthBill = prevMonthUsage * pricePerLiter;
  const tenantNameOwner = "Ramsagar Nelaya";
  const [tenantBillAmount, setTenantBillAmount] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const [view, setView] = useState("login"); // login | owner | tenant | loading | bill
  const [discount, setDiscount] = useState(0);
  const [reason, setReason] = useState("");
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [finalBill, setFinalBill] = useState(0);

  const quizData = [
    { q: "Turn off taps while brushing?", a: "yes" },
    { q: "Reuse water for plants?", a: "yes" },
    { q: "Leave tap running while washing?", a: "no" },
    { q: "Fix leaking taps immediately?", a: "yes" },
  ];

  const daily = [50, 45, 60, 55, 52, 48, 50, 51, 49, 53];
  const total = daily.reduce((s, v) => s + v, 0);
  const today = daily[daily.length - 1];

  // initial bill calculation
  useEffect(() => {
    setTenantBillAmount(total * pricePerLiter);
    setFinalBill(total * pricePerLiter);
  }, []);

  const loginOwner = (u, p) => {
    if (u === "akshay" && p === "akshay") setView("owner");
    else alert("Invalid owner credentials!");
  };

  const loginTenant = (u, p) => {
    if (u === "tenant" && p === "tenant") setView("tenant");
    else alert("Invalid tenant credentials!");
  };

  const applyDiscount = () => {
    let final = total * pricePerLiter - discount;
    if (final < 0) final = 0;
    setTenantBillAmount(final);
    setFinalBill(final);
    alert(`Discount applied: ₹${discount} (${reason})`);
  };

  const generateBill = () => {
    setView("loading");
    setTimeout(() => {
      setView("bill");
    }, 3000);
  };

  const submitComplaint = (text) => {
    if (!text.trim()) return alert("Enter a complaint!");
    setComplaints([...complaints, text]);
    alert("Complaint submitted!");
  };

  const submitQuiz = () => {
    let correct = 0;
    quizData.forEach((q, i) => {
      if (quizAnswers[i]?.toLowerCase() === q.a) correct++;
    });
    const discountPercent = correct;
    const discountAmount = tenantBillAmount * (discountPercent / 100);
    const newBill = tenantBillAmount - discountAmount;
    setTenantBillAmount(newBill);
    setQuizVisible(false);
    alert(
      `You answered ${correct} correctly! Extra discount applied: ₹${discountAmount.toFixed(
        2
      )}`
    );
    generateQR(newBill);
  };

  const generateQR = (amount) => {
    const qr = new QRious({
      element: document.getElementById("qrCode"),
      value: `Pay ₹${amount.toFixed(2)} via Paytm`,
      size: 200,
    });
    document.getElementById("qrSection").style.display = "block";
  };

  const simulatePayment = () => {
    alert(`Payment of ₹${tenantBillAmount.toFixed(2)} successful!`);
    setTenantBillAmount(0);
    document.getElementById("qrSection").style.display = "none";
  };

  return (
    <div className="billing-wrapper">
      {view === "login" && (
        <div className="login-card">
          <h2>Login Portal</h2>
          <div>
            <h4>Owner Login</h4>
            <input id="ou" placeholder="Username" />
            <input id="op" type="password" placeholder="Password" />
            <button
              onClick={() =>
                loginOwner(
                  document.getElementById("ou").value,
                  document.getElementById("op").value
                )
              }
            >
              Login
            </button>
          </div>
          <hr />
          <div>
            <h4>Tenant Login</h4>
            <input id="tu" placeholder="Username" />
            <input id="tp" type="password" placeholder="Password" />
            <button
              onClick={() =>
                loginTenant(
                  document.getElementById("tu").value,
                  document.getElementById("tp").value
                )
              }
            >
              Login
            </button>
          </div>
        </div>
      )}

      {view === "owner" && (
        <div className="owner-portal">
          <h2>Owner Portal</h2>
          <div className="card">
            <h3>Previous Month</h3>
            <p>{prevMonthUsage} Liters</p>
            <p>₹{prevMonthBill.toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>This Month</h3>
            <p>{total} Liters</p>
            <p>₹{(total * pricePerLiter).toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>Today's Usage</h3>
            <p>{today} Liters</p>
            <p>₹{(today * pricePerLiter).toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>Discount for Tenant</h3>
            <input
              type="number"
              placeholder="Enter discount in ₹"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
            <input
              type="text"
              placeholder="Reason for discount"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button onClick={applyDiscount}>Apply Discount</button>
            <p>Final Bill: ₹{tenantBillAmount.toFixed(2)}</p>
          </div>
          <div className="card">
            <button onClick={generateBill}>Generate Bill</button>
            <button onClick={() => setView("login")}>Back</button>
          </div>
          <div className="card">
            <h3>Tenant Complaints</h3>
            {complaints.map((c, i) => (
              <p key={i}>
                {i + 1}. {c}
              </p>
            ))}
          </div>
        </div>
      )}

      {view === "tenant" && (
        <div className="tenant-portal">
          <h2>Tenant Portal</h2>
          <p>Total Usage: {total} L</p>
          <p>Today's Usage: {today} L</p>
          <p>Final Bill: ₹{tenantBillAmount.toFixed(2)}</p>

          <textarea id="complaint" placeholder="Enter complaint"></textarea>
          <button
            onClick={() =>
              submitComplaint(document.getElementById("complaint").value)
            }
          >
            Submit Complaint
          </button>

          <button onClick={() => setQuizVisible(true)}>Answer Quiz</button>
          {quizVisible && (
            <div className="quiz">
              {quizData.map((q, i) => (
                <div key={i}>
                  <label>{q.q}</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setQuizAnswers({ ...quizAnswers, [i]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button onClick={submitQuiz}>Submit Quiz</button>
            </div>
          )}

          <div id="qrSection" style={{ display: "none", marginTop: "20px" }}>
            <canvas id="qrCode"></canvas>
            <button onClick={simulatePayment}>Simulate Scan & Pay</button>
          </div>

          <button onClick={() => setView("login")}>Back</button>
        </div>
      )}

      {view === "loading" && (
        <div className="loading-card">
          <h2>Generating Bill...</h2>
        </div>
      )}

      {view === "bill" && (
        <div className="bill-card">
          <h2>Water Usage Bill</h2>
          <p>Tenant Name: {tenantNameOwner}</p>
          <p>Monthly Usage: {total} Liters</p>
          <p>Base Price: ₹{pricePerLiter.toFixed(2)}</p>
          <p>Total Bill: ₹{finalBill.toFixed(2)}</p>
          <p>Reason: {reason}</p>
          <button onClick={() => setView("login")}>Back</button>
        </div>
      )}
    </div>
  );
};

export default WaterBilling;
