import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EnterOtpPage from './pages/EnterOtpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthLayout> <LoginPage/> </AuthLayout>}/>
            <Route path="/signup" element={<AuthLayout> <SignupPage/> </AuthLayout>}/>
            <Route path="/enter-otp" element={<AuthLayout> <EnterOtpPage/> </AuthLayout>}/>
            <Route path="/forgot-password" element={<AuthLayout> <ForgotPasswordPage/> </AuthLayout>}/>
            <Route path="/reset-password/:token" element={<AuthLayout><ResetPasswordPage /></AuthLayout>} />
            {/*<Route path="/home" element={<MainLayout> <HomePage/> </MainLayout>}/>
            <Route path="/alert" element={<MainLayout> <AlertPage/> </MainLayout>}/> */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );  
}

export default App;