import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
    return(
        <button className={`btn ${variant}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;