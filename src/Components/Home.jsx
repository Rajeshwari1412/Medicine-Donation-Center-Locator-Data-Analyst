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
                        <span className="badge-dot">•</span>
                        <span style={{ color: "#fca5a5" }}>🚨 Live SOS Dispatch</span>
                    </div>

                    <h1 className="hero-title">
                        Bridge the Healthcare Gap with <span className="highlight-text">Safe Medicine Donations</span>
                    </h1>

                    <p className="hero-description">
                        Connect with certified medical donation centers, check real-time operating hours, and ensure unused medicines reach vulnerable patients safely and compliantly.
                    </p>

                    <div className="hero-actions">
                        <Link to="/emergency-sos" className="btn-hero-primary" style={{ background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)", boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)" }}>
                            🚨 Emergency SOS Portal
                        </Link>
                        <Link to="/scanner" className="btn-hero-secondary">
                            📷 AI Label Scanner
                        </Link>
                        <Link to="/cabinet" className="btn-hero-secondary">
                            🏠 Smart Cabinet
                        </Link>
                        <Link to="/donation-centers" className="btn-hero-secondary">
                            📍 Locate Centers
                        </Link>
                    </div>

                    <div className="hero-stats-row">
                        <div className="stat-card">
                            <span className="stat-value">5,420+</span>
                            <span className="stat-label">Units Donated</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">&lt;45m</span>
                            <span className="stat-label">SOS Dispatch Speed</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">100%</span>
                            <span className="stat-label">Verified Centers</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">78%</span>
                            <span className="stat-label">Supply-Match Surge</span>
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

                {/* Enhanced Feature Pillar Cards */}
                <div className="home-features-grid">
                    <Link to="/emergency-sos" className="feature-card interactive-card" style={{ borderTop: "4px solid #ef4444" }}>
                        <div className="card-top-row">
                            <div className="feature-icon bg-rose">🚨</div>
                            <span className="card-pill" style={{ background: "#ffe4e6", color: "#be123c" }}>Emergency SOS</span>
                        </div>
                        <h3>Urgent Hospital ICU Matcher</h3>
                        <p>Real-time AI matching engine connecting critical hospital shortages with available stockpiles in nearby donation hubs.</p>
                        <ul className="card-highlights">
                            <li>✓ Under 45-min rapid courier alert</li>
                            <li>✓ Cold-chain monitored transfer</li>
                            <li>✓ 1-click ICU shortage broadcast</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span style={{ color: "#ef4444" }}>Open SOS Portal</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>

                    <Link to="/cabinet" className="feature-card interactive-card">
                        <div className="card-top-row">
                            <div className="feature-icon bg-emerald">🏠</div>
                            <span className="card-pill" style={{ background: "#d1fae5", color: "#065f46" }}>Smart Expiry Tracker</span>
                        </div>
                        <h3>Home Medicine Cabinet</h3>
                        <p>Organize your home medicines, monitor days remaining until expiration, and receive automated donate-before-expiry alerts.</p>
                        <ul className="card-highlights">
                            <li>✓ Expiry degradation countdown bars</li>
                            <li>✓ Safe vs critical alert badges</li>
                            <li>✓ 1-click batch donation converter</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span>Open Cabinet</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>

                    <Link to="/scanner" className="feature-card interactive-card">
                        <div className="card-top-row">
                            <div className="feature-icon bg-sky">📷</div>
                            <span className="card-pill">AI Vision OCR</span>
                        </div>
                        <h3>AI Medicine Label Scanner</h3>
                        <p>Capture medicine labels to instantly extract batch numbers, calculate remaining shelf-life, and get immediate verdicts.</p>
                        <ul className="card-highlights">
                            <li>✓ Automated batch & date extraction</li>
                            <li>✓ Storage condition alerts</li>
                            <li>✓ Instant eligibility calculation</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span>Launch Scanner</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>

                    <Link to="/certificate" className="feature-card interactive-card">
                        <div className="card-top-row">
                            <div className="feature-icon bg-amber">📜</div>
                            <span className="card-pill" style={{ background: "#fef3c7", color: "#92400e" }}>Section 80G</span>
                        </div>
                        <h3>Digital 80G Tax Certificates</h3>
                        <p>Generate verifiable donation certificates with unique serial numbers, itemized valuations, and QR verification.</p>
                        <ul className="card-highlights">
                            <li>✓ Form 10BE tax exemption receipt</li>
                            <li>✓ Instant tamper-proof QR code</li>
                            <li>✓ High-resolution print & PDF layout</li>
                        </ul>
                        <div className="card-footer-cta">
                            <span>Generate Receipt</span>
                            <span className="cta-arrow">➔</span>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;