import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";


import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/LoginPage.css";
import OtpVerificationPage from "./components/OtpVerificationPage";
import SetNewPasswordPage from "./components/SetNewPasswordPage";
import ForgotOtp from "./components/ForgotOtp";
import EmailComponent from "./components/EmailComponent";
import SkillPage from "./components/SkillPage";
import ProjectPage from "./components/ProjectPage";
import EducationPage from "./components/EducationPage";
import AchievementPage from "./components/Achievement";
import HomePage from "./components/HomePage";
import InfoPage from "./components/InfoPage";


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/" element={<HomePage />} />
          <Route path="/OtpVerificationPage" element={<OtpVerificationPage />} />
          <Route path='/otpVerify' element={<ForgotOtp />} />
          <Route path='/SetNewPasswordPage' element={<SetNewPasswordPage />} />
          <Route path="/email" element={<EmailComponent />} />
          <Route path="/skills" element={<SkillPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/achievements" element={<AchievementPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
