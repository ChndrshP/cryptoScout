import React from 'react';

const AuthLayout = ({ childern }) => {
    return (
        <div className='auth-layout'>
            <div className='auth-container'>
                {childern}
            </div>
        </div>
    );
};

export default AuthLayout;