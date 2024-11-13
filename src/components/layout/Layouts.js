import React from "react";
import Header from "./Header";
import Content from "./Contents";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout ({onLogout}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header onLogout={onLogout} />
            <div className="flex flex-1">
                <Sidebar />
                <Content />
            </div>
            <Footer />
        </div>
    );
}
export default Layout;
