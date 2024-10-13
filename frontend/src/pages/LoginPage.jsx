import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>Login</h1>
                {error && <div className='error-message'>{error}</div>}
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
                    <Button type='submit' variant='primary' disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <div className='redirect-links'>
                    <p>Don't have an account? <Link to="/signup">Create One</Link></p>
                    <p>Forgot your password? <Link to="/forgot-password">Reset Password</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;