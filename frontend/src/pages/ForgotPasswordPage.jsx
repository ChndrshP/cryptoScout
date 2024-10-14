import React, {useState} from "react";
import Button from "../components/Button";
import axios from "axios";
import "../styles/ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try{
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {email});
            setMessage(response.data.message);
        }catch(err){
            setError(err.response?.data?.message || 'Request failed');
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Enter your email"
                    />

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;