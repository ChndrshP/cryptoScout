import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Use ThemeProvider instead of ThemeContext
// import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';
import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import EnterOtpPage from './pages/EnterOtpPage';
// import HomePage from './pages/HomePage';
// import AlertPage from './pages/AlertPage';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<AuthLayout> <LoginPage/> </AuthLayout>}/>
          <Route path="/signup" element={<AuthLayout> <SignupPage/> </AuthLayout>}/>
          <Route path="/forgot-password" element={<AuthLayout> <ForgotPasswordPage/> </AuthLayout>}/>
          <Route path="/enter-otp" element={<AuthLayout> <EnterOtpPage/> </AuthLayout>}/>
          <Route path="/home" element={<MainLayout> <HomePage/> </MainLayout>}/>
          <Route path="/alert" element={<MainLayout> <AlertPage/> </MainLayout>}/> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
