import React, { useEffect } from "react";
import axios from 'axios';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = React.useState(localStorage.getItem('authToken'));
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const login = async (email, password) => {
        const response = await axios.post(`${process.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
        const { token } = response.data;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = token;
        fetchUser();
    };

    const signup = async (email, password) => {
        const response = await axios.post(`${process.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { email, password });
        const { token } = response.data;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = token;
        fetchUser();
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    };

    const fetchUser = async () => {
        if (!authToken) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${process.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL}/api/auth/user`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = authToken;
            fetchUser();
        } else {
            setLoading(false);
        }

        // Cleanup to avoid side effects when component unmounts
        return () => {
            delete axios.defaults.headers.common['Authorization'];
        };
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ authToken, user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
