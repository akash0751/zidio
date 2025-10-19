import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${api}/api/user`,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("tempToken", response.data.token);
        alert("OTP sent to your email");
        navigate("/OtpVerificationPage");
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  

  return (
    <div className="signup-page">
      <div className="signup-card shadow-lg">
        <div className="signup-header text-center">
          
          <h2 className="signup-title">Create Your Account</h2>
          <p className="signup-subtitle">
            Join our career ecosystem and build your verified resume.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn signup-btn w-100">
            Sign Up
          </button>
        </form>

        

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
