import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import Button from '../components/Button';
import '../styles/LandingPage.css';
import Footer from '../components/Footer';
import {ThemeContext} from "../context/ThemeContext";

const LandingPage = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <div className='landing-page'>
      <div className='top-right-button'>
        <Button onClick={toggleTheme} variant='secondary'>
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
      <div className='hero-section'>
        <h1>Welcome to <span style={{ textDecoration: 'underline black' }}>CryptoScout</span></h1>
        <p>Track your favourite cryptocurrency prices and get real-time alerts</p>
        <div className='cta-buttons'>
          <Link to="/signup">
            <Button variant='primary'>Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant='primary'>Login</Button>
          </Link>
        </div>
      </div>
      <div className='feature-section'>
        <h2>Features</h2>
        <div className='feature-list'>
          <div className='feature-item'>
            <img src="https://i.ibb.co/pfYQZ91/track.png" alt ="Track"/>
            <h3>Real-time Tracking</h3>
            <p>Monitor the market in real-time and stay updated with live price changes.</p>
          </div>
          <div className='feature-item'>
            <img src="https://i.ibb.co/XprpYB8/alert.png" alt="Alerts"/>
            <h3>Price Alert</h3>
            <p>Set custom alerts to never miss an oppurtunity with your favourite coins.</p>
          </div>
          <div className="feature-item">
            <img src="https://i.ibb.co/yQWPmh7/security.png" alt="Security" />
            <h3>Secure Authentication</h3>
            <p>Safeguard your account with secure login and verification methods.</p>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default LandingPage;