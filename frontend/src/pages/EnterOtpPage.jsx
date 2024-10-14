// src/pages/EnterOtpPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import '../styles/EnterOtpPage.css';

const EnterOtpPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const email = state?.email || '';
    
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const inputRefs = useRef([]);
  
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);
  
    const handleOtpChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
    
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };
  
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };
  
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/auth/register/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: otp.join('') }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setIsVerified(true);
                setTimeout(() => {
                    setMessage('Verification successful. You can now log in.');
                    navigate('/login'); // Redirect to login after 3 seconds
                }, 3000);
            } else {
                throw new Error(data.message || 'Verification failed');
            }
        } catch (err) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };
  
    const handleResendOtp = () => {
        console.log('Resending OTP for email:', email);
    };
  
    return (
      <div className="otp-container">
        <div className="otp-card">
          <h2 className="card-title">Verify Your Email</h2>
          <p className="email-info">An OTP has been sent to <u>{email}</u></p>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          {!isVerified && (
            <form onSubmit={onSubmit} className="otp-form">
              <div>
                <label className="otp-label">Enter Your OTP</label>
                <div className="otp-input-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-input"
                    />
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className={`submit-button ${loading ? 'disabled' : ''}`}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </form>
          )}
          <button onClick={handleResendOtp} className="resend-link">
            Didn't receive an OTP? Resend OTP
          </button>
        </div>
      </div>
    );
};

export default EnterOtpPage;