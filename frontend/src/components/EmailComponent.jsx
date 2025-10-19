import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EmailComponent.css";

const EmailComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/forgotPassword`, { email });
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetToken", res.data.token);
      alert(res.data.message);
      navigate("/otpVerify");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="email-wrapper">
      <div className="email-card">
        {/* Logo and brand */}
        <div className="brand-section">
          
          <h2 className="brand-title">SKILL BUILDER</h2>
        </div>

        <h3 className="page-title">Reset Your Password</h3>
        <p className="page-subtitle">
          Enter your registered email to receive an OTP and reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="emailInput">Email Address</label>
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailComponent;
