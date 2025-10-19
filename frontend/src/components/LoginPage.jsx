import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const api = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorPopup(false);

    try {
      const response = await axios.post(`${api}/api/login`, {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setShowSuccessPopup(true);

        setTimeout(() => setShowSuccessPopup(false), 1500);
        setTimeout(() => navigate("/"), 1800);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed.";
      setErrorMessage(msg);
      setShowErrorPopup(true);

      setTimeout(() => setShowErrorPopup(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    localStorage.setItem("resetEmail", email);
    navigate("/email");
  };

  return (
    <div className="login-page">
      {showSuccessPopup && (
        <div className="success-toast">✅ Login Successful! Redirecting...</div>
      )}
      {showErrorPopup && <div className="error-toast">❌ {errorMessage}</div>}

      <div className="login-card shadow-lg">
        <div className="login-header text-center">
          
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Log in to continue building your verified career profile.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn login-btn w-100" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="forgot-password text-center">
          <button className="btn btn-link p-0" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </p>

        

        <p className="signup-link text-center">
          Don't have an account?{" "}
          <span className="signup-text" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
