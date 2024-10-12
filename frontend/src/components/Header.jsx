import React, {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return(
        <header className="header">
            <h1>CryptoScout</h1>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
        </header>
    );
};

export default Header;