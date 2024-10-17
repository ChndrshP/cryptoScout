import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";
import {AuthContext} from "../context/AuthContext";
import Button from '../components/Button';
import '../styles/Header.css';

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user, logout} = useContext(AuthContext);

    return(
        <header className="header">
            <div className="logo">
                <Link to="/">CryptoScout</Link>
            </div>
            <nav className="nav-links">
                {user ? (
                    <>
                        <Link to="/home">Home</Link>
                        <Link to="/alerts">Alerts</Link>
                        <Button onClick={logout} variant="secondary">Logout</Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Sign up</Link>
                    </>
                )}

                <Button onClick={toggleTheme} variant = "secondary">
                    {theme === 'light' ?  '🌙' : '☀️'}
                </Button>
            </nav>
        </header>
    );
};

export default Header;