import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className='auth-layout'>
            <div className='auth-container'>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;