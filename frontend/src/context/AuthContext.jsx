import React, { useEffect, useState, createContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
        const { token } = response.data;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = token;
        fetchUser();
    };

    const signup = async (email, password) => {
        const response = await axios.post(`http://localhost:5000/api/auth/register`, { email, password });
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
            const response = await axios.get(`http://localhost:5000/api/auth/user`);
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
