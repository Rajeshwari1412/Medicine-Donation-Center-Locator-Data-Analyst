import "./Header.css";
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
                            Category-Based Guidelines & Timings
                        </span>
                    </div>
                </NavLink>

                <nav className="components">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
                    <NavLink to="/guidelines" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Guidelines</NavLink>
                    <NavLink to="/donation-centers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Centers & Timings</NavLink>
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Analytics <span className="boost-badge">78% Boost</span>
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active auth-btn" : "nav-item auth-btn"}>Register</NavLink>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item active login-btn" : "nav-item login-btn"}>Login</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;