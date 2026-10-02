import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    // Quick Interactive Eligibility Checker state
    const [checkMed, setCheckMed] = useState("");
    const [checkResult, setCheckResult] = useState(null);

    const handleQuickCheck = (e) => {
        e.preventDefault();
        if (!checkMed.trim()) return;

        const q = checkMed.toLowerCase();
        if (q.includes("opened") || q.includes("liquid") || q.includes("loose") || q.includes("expired")) {
            setCheckResult({
                status: "warning",
                title: "⚠️ Manual Inspection Required / Likely Ineligible",
                message: "Opened bottles, loose unsealed tablets, and expired items cannot be redistributed for safety."
            });
        } else if (q.includes("insulin") || q.includes("cold")) {
            setCheckResult({
                status: "success",
                title: "❄️ Cold-Chain Verification Needed",
                message: "Unopened insulin vials/pens are accepted if transported in an insulated cool-pack."
            });
        } else {
            setCheckResult({
                status: "success",
                title: "✅ Eligible for Donation",
                message: `Sealed ${checkMed} with ≥60 days until expiration is actively accepted at all partner drop-off centers!`
            });
        }
    };

    return (
        <main className="home-container">
            <div className="home-hero-overlay">
                {/* Hero Card */}
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

                {/* Interactive Instant Eligibility Checker */}
                <div className="quick-checker-card">
                    <div className="checker-header">
                        <span className="checker-tag">⚡ Instant Check</span>
                        <h3>Can I Donate My Medicine?</h3>
                        <p>Type the medicine name (e.g. Paracetamol, Insulin, Amoxicillin, Cardiac strip) to check instant acceptance rules.</p>
                    </div>

                    <form onSubmit={handleQuickCheck} className="checker-form">
                        <div className="checker-input-wrapper">
                            <input
                                type="text"
                                placeholder="Enter medicine name or package condition..."
                                value={checkMed}
                                onChange={(e) => {
                                    setCheckMed(e.target.value);
                                    if (checkResult) setCheckResult(null);
                                }}
                            />
                            <button type="submit" className="checker-btn">
                                Check Eligibility ➔
                            </button>
                        </div>
                    </form>

                    {checkResult && (
                        <div className={`checker-result-box ${checkResult.status}`}>
                            <strong>{checkResult.title}</strong>
                            <p>{checkResult.message}</p>
                            <Link to="/guidelines" className="checker-link">Read Full Category Guidelines →</Link>
                        </div>
                    )}
                </div>

                {/* Enhanced 3 Feature Pillar Cards */}
                <div className="home-features-grid">
                    <Link to="/donation-centers" className="feature-card interactive-card">
                        <div className="card-top-row">
                            <div className="feature-icon bg-teal">📍</div>
                            <span className="card-pill">Interactive Map</span>
                        </div>
                        <h3>Verified Drop-off Points</h3>
                        <p>Locate accredited NGO and hospital medicine banks with confirmed operating hours, GPS navigation, and 24/7 drop boxes.</p>
                        <ul className="card-highlights">
                            <li>✓ Live Open/Closed timings</li>
                            <li>✓ Direct GPS directions link</li>
                            <li>✓ 1-click drop-off slot booking</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span>Locate Centers</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>

                    <Link to="/guidelines" className="feature-card interactive-card">
                        <div className="card-top-row">
                            <div className="feature-icon bg-indigo">🛡️</div>
                            <span className="card-pill">6 Core Protocols</span>
                        </div>
                        <h3>Category & Expiry Rules</h3>
                        <p>Strict clinical safety criteria for prescription antibiotics, cardiac meds, insulin cold-chain, and pediatric care.</p>
                        <ul className="card-highlights">
                            <li>✓ ≥60-90 days expiry verification</li>
                            <li>✓ Blister pack & seal standards</li>
                            <li>✓ Prohibited items warning list</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span>Read Guidelines</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>

                    <Link to="/analytics" className="feature-card interactive-card">
                        <div className="card-top-row">
                            <div className="feature-icon bg-sky">📈</div>
                            <span className="card-pill">78% Match Surge</span>
                        </div>
                        <h3>Data-Driven Analytics</h3>
                        <p>Real-time demand tracking and SQL-backed insights that optimize medicine distribution across urban centers.</p>
                        <ul className="card-highlights">
                            <li>✓ Surplus vs shortfall modeling</li>
                            <li>✓ Cold-chain priority analytics</li>
                            <li>✓ Regional demand heatmaps</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span>Explore Analytics</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;