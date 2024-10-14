import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from "../components/Button";
import '../styles/ResetPasswordPage.css';

// const ResetPasswordPage = () => {
//     const navigate = useNavigate();
//     const { token } = useParams();

//     const [newPassword, setNewPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const onChange = (e) => setNewPassword(e.target.value);

//     const resetPassword = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password: newPassword });
//             navigate('/login');
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error resetting password');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="reset-password-page">
//             <div className="reset-password-container">
//                 <h2>Reset Password</h2>
//                 {error && <div className="error-message">{error}</div>}
//                 <form onSubmit={resetPassword}>
//                     <label htmlFor="newPassword">New Password</label>
//                     <input
//                         type="password"
//                         id="newPassword"
//                         name="newPassword"
//                         value={newPassword}
//                         onChange={onChange}
//                         required
//                         placeholder="Enter your new password"
//                     />
//                     <Button type="submit" variant="primary" disabled={loading}>
//                         {loading ? 'Resetting Password...' : 'Reset Password'}
//                     </Button>
//                 </form>
//             </div>
//         </div>
//     );
// };

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Extract token from URL

    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = (e) => setNewPassword(e.target.value);

    const resetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Send the new password and token to the backend API
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password: newPassword });

            // On success, redirect to the login page
            navigate('/login');
        } catch (err) {
            // Handle error response from the server
            setError(err.response?.data?.message || 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <h2>Reset Password</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={resetPassword}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={onChange}
                        required
                        placeholder="Enter your new password"
                    />
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;