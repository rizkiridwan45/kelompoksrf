import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="mb-4">© {currentYear} Universitas Bumi. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
