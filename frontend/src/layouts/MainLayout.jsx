import React from "react";

const MainLayout = ({ children }) => {
    return(
        <div className="main-layout">
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
};

export default MainLayout;