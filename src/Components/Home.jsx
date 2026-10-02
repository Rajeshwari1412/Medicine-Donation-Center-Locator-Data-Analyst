import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <main className="home-container">
            <div className="home-hero-overlay">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span>🌱 Verified Health Impact</span>
                        <span className="badge-dot">•</span>
                        <span>Zero Wastage Initiative</span>
                    </div>

                    <h1 className="hero-title">
                        Bridge the Healthcare Gap with <span className="highlight-text">Safe Medicine Donations</span>
                    </h1>

                    <p className="hero-description">
                        Connect with certified medical donation centers, check real-time operating hours, and ensure unused medicines reach vulnerable patients safely and compliantly.
                    </p>

                    <div className="hero-actions">
                        <Link to="/donation-centers" className="btn-hero-primary">
                            📍 Locate Donation Centers
                        </Link>
                        <Link to="/guidelines" className="btn-hero-secondary">
                            📋 Donation Guidelines
                        </Link>
                        <Link to="/analytics" className="btn-hero-analytics">
                            📊 Demand Analytics <span className="pill-tag">78% Boost</span>
                        </Link>
                    </div>

                    <div className="hero-stats-row">
                        <div className="stat-card">
                            <span className="stat-value">5,420+</span>
                            <span className="stat-label">Units Donated</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">100%</span>
                            <span className="stat-label">Verified Centers</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">78%</span>
                            <span className="stat-label">Supply-Match Rate</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">0₹</span>
                            <span className="stat-label">Free for All Donors</span>
                        </div>
                    </div>
                </div>

                <div className="home-features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Verified Drop-off Points</h3>
                        <p>Locate accredited NGO and hospital medicine banks with confirmed operating hours and emergency drop-off slots.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Category & Expiry Rules</h3>
                        <p>Strict clinical safety criteria for prescription antibiotics, cardiac meds, insulin cold-chain, and pediatric care.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Data-Driven Analytics</h3>
                        <p>Real-time demand tracking and SQL-backed insights that optimize medicine distribution across urban centers.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;