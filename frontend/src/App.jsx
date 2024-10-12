import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EnterOtpPage from './pages/EnterOtpPage';
import HomePage from './pages/HomePage';
import AlertPage from './pages/AlertPage';

const App = () => {
  return (
    <ThemeContext>
        <Router>
            <Routes>
                <Router path="/" element={<LandingPage />} />
                <Router path="/login" element={<AuthLayout> <LoginPage/> </AuthLayout>}/>
                <Router path="/signup" element={<AuthLayout> <SignupPage/> </AuthLayout>}/>
                <Router path="/forgot-password" element={<AuthLayout> <ForgotPasswordPage/> </AuthLayout>}/>
                <Router path="/enter-otp" element={<AuthLayout> <EnterOtpPage/> </AuthLayout>}/>
                <Router path="/home" element={<MainLayout> <HomePage/> </MainLayout>}/>
                <Router path="/alert" element={<MainLayout> <AlertPage/> </MainLayout>}/>
            </Routes>
        </Router>
    </ThemeContext>
  )
}

export default App;