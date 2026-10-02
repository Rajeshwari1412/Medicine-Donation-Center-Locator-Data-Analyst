import "./Header.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="main-navbar">
            <div className="navbar-container">
                <NavLink to="/" className="brand-logo-link">
                    <div className="brand-badge-icon">💊</div>
                    <div id="brand-name">
                        <h1>Medicine Donation Center Locator</h1>
                        <span className="brand-tagline">
                            AI-Powered Distribution & 80G Tax Network
                        </span>
                    </div>
                </NavLink>

                <nav className="components">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Home
                    </NavLink>
                    <NavLink to="/emergency-sos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} style={{ color: "#fca5a5" }}>
                        🚨 SOS <span style={{ background: "#ef4444", color: "#fff", fontSize: "0.65rem", padding: "1px 5px", borderRadius: "10px", fontWeight: 800 }}>ICU</span>
                    </NavLink>
                    <NavLink to="/cabinet" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        🏠 Cabinet
                    </NavLink>
                    <NavLink to="/scanner" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        📷 Scanner <span className="scanner-nav-pill">AI</span>
                    </NavLink>
                    <NavLink to="/donation-centers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Centers & Timings
                    </NavLink>
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Analytics <span className="boost-badge">78%</span>
                    </NavLink>
                    <NavLink to="/certificate" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        📜 80G Receipt
                    </NavLink>
                    <NavLink to="/guidelines" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Guidelines
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active auth-btn" : "nav-item auth-btn"}>
                        Register
                    </NavLink>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item active login-btn" : "nav-item login-btn"}>
                        Login
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;