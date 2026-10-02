import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <span className="footer-icon">💊</span>
                    <span className="footer-title">Medicine Donation Center Locator</span>
                </div>
                <div className="footer-meta">
                    <span>&copy; {new Date().getFullYear()} Medication Donation Network • Powered by Supabase & SQL Analytics</span>
                    <span className="footer-status-pill">● System Live & Verified</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
