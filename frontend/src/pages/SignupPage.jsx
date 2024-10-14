import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import {AuthContext} from '../context/AuthContext';
import '../styles/SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '' 
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {email, password, confirmPassword} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try{
            await signup(email, password);
            navigate('/enter-otp', {state: {email}});
        }catch(err){
            setError(err.response?.data?.message || 'Signup failed');
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1>Sign Up</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter your email"
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter your password"
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={onChange} 
                        required 
                        placeholder="Confirm your password"
                    />

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
                <div className="redirect-links">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;