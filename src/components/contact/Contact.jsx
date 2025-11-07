import React, { useState } from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Optional: Clear message after few seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="contact mb">
        <Back name="Contact Us" title="Get Helps & Friendly Support" cover={img} />
        <div className="container">
          <form className="shadow" onSubmit={handleSubmit}>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea cols="30" rows="10" placeholder="Message" required></textarea>
            <button type="submit">Submit Request</button>
            {submitted && <p className="success-message">✅ Request Sent Successfully!</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
