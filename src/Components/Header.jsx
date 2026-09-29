import "./Header.css"
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <>
            <header>
                <div id="brand-name">
                    <h1>Medicine Donation Center Locator</h1>
                    <span style={{ fontSize: "11px", color: "#a7f3d0", display: "block", marginTop: "-4px" }}>
                        Category-Based Guidelines & Timings
                    </span>
                </div>
                <div className="components">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/guidelines">Guidelines</NavLink>
                    <NavLink to="/donation-centers">Centers & Timings</NavLink>
                    <NavLink to="/analytics">Analytics (78% Boost)</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </header>
            <footer>
                <h4>&copy; 2026 Medicine Donation Center Locator • Powered by Supabase & SQL Analytics</h4>
            </footer>
        </>
    )
}
export default Header;