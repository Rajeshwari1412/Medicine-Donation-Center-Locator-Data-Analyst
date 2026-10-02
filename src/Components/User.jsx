import "./User.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const mockDonationHistory = [
  {
    id: "MDC-TX-98412",
    date: "2026-09-28",
    medicine: "Amoxicillin 500mg (10 strips)",
    center: "Metro Care Community Medicine Bank",
    status: "Verified",
    taxVal: "₹ 1,850",
  },
  {
    id: "MDC-TX-97501",
    date: "2026-09-15",
    medicine: "Human Actrapid Insulin 100IU (4 Vials)",
    center: "Hope NGO Central Donation Center",
    status: "Completed",
    taxVal: "₹ 3,200",
  },
  {
    id: "MDC-TX-96104",
    date: "2026-08-30",
    medicine: "Metformin 500mg SR (8 Boxes)",
    center: "Seva Trust Red Cross Medicine Bank",
    status: "Verified",
    taxVal: "₹ 1,120",
  }
];

const User = () => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username") || "Donor Member",
    email: "donor.care@medlocator.org",
    mobile: "+91 98480 54321",
    address: "Banjara Hills, Hyderabad, Telangana",
    donorSince: "2025",
    verified: true
  });
  const [loading, setLoading] = useState(false);
  const [donations] = useState(mockDonationHistory);
  const navigate = useNavigate();

  const loadUser = async () => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:8000/api/userdetails/?username=${storedUser}`
      );
      if (res.data?.user) {
        setUser((prev) => ({
          ...prev,
          ...res.data.user
        }));
      }
    } catch (err) {
      console.log("Backend offline, continuing in demo mode with active session.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="user-dashboard-wrapper">
      {/* Top Bar */}
      <header className="user-nav-header">
        <div className="user-brand-group">
          <span className="user-brand-icon">💊</span>
          <div>
            <h1>Medication Donation Center Locator</h1>
            <span>Donor Portal & Tax Receipt System</span>
          </div>
        </div>

        <div className="user-nav-actions">
          <NavLink to="/" className="user-nav-link">Home</NavLink>
          <NavLink to="/guidelines" className="user-nav-link">Guidelines</NavLink>
          <NavLink to="/scanner" className="user-nav-link">AI Scanner</NavLink>
          <NavLink to="/analytics" className="user-nav-link">Analytics</NavLink>
          <button onClick={handleLogout} className="user-logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="user-container">
        {/* Welcome Banner */}
        <section className="user-welcome-banner">
          <div className="welcome-text">
            <h2>Welcome back, {user.username || "Valued Donor"} 👋</h2>
            <p>Thank you for contributing to healthcare accessibility and reducing medicine waste.</p>
          </div>
          <div className="welcome-badge-donor">
            <span>⭐</span>
            <div>
              <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>Status</div>
              <div>Certified Community Donor</div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="impact-metrics-grid">
          <div className="impact-metric-card">
            <div className="metric-icon-wrap cyan">📦</div>
            <div>
              <div className="metric-value">22</div>
              <div className="metric-label">Medicine Packs Donated</div>
            </div>
          </div>

          <div className="impact-metric-card">
            <div className="metric-icon-wrap emerald">❤️</div>
            <div>
              <div className="metric-value">48+</div>
              <div className="metric-label">Patients Supported</div>
            </div>
          </div>

          <div className="impact-metric-card">
            <div className="metric-icon-wrap amber">📜</div>
            <div>
              <div className="metric-value">₹6,170</div>
              <div className="metric-label">80G Tax Exemption Value</div>
            </div>
          </div>

          <div className="impact-metric-card">
            <div className="metric-icon-wrap indigo">🛡️</div>
            <div>
              <div className="metric-value">100%</div>
              <div className="metric-label">Expiry & Quality Pass Rate</div>
            </div>
          </div>
        </section>

        {/* Action Center */}
        <div className="section-title-wrap">
          <h3>⚡ Quick Actions & Tools</h3>
        </div>
        <div className="action-cards-grid">
          <div className="user-action-card highlight" onClick={() => navigate("/scanner")}>
            <span className="action-card-badge">AI Powered</span>
            <div>
              <div className="action-card-header">
                <span className="action-card-icon">📷</span>
                <h4>Scan Medicine</h4>
              </div>
              <p className="action-card-desc">
                Use camera OCR to instantly check label batch numbers, expiry dates, and shelf-life eligibility.
              </p>
            </div>
            <button className="action-card-btn secondary">
              Open AI Scanner →
            </button>
          </div>

          <div className="user-action-card" onClick={() => navigate("/donation-centers")}>
            <div>
              <div className="action-card-header">
                <span className="action-card-icon">📍</span>
                <h4>Find Centers & Drop Off</h4>
              </div>
              <p className="action-card-desc">
                Browse verified NGO pharmacies, check operating hours, cold-chain capacity, and book a drop-off slot.
              </p>
            </div>
            <button className="action-card-btn">
              Explore Centers →
            </button>
          </div>

          <div className="user-action-card" onClick={() => navigate("/certificate")}>
            <span className="action-card-badge">Tax Benefit</span>
            <div>
              <div className="action-card-header">
                <span className="action-card-icon">📜</span>
                <h4>80G Certificate</h4>
              </div>
              <p className="action-card-desc">
                Generate and print instant digital tax exemption certificates with verification QR codes.
              </p>
            </div>
            <button className="action-card-btn">
              Generate Certificate →
            </button>
          </div>
        </div>

        {/* Two Column Layout: Profile & History */}
        <div className="user-split-layout">
          {/* Profile Card */}
          <section className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {(user.username || "D")[0].toUpperCase()}
              </div>
              <h3>{user.username}</h3>
              <span className="profile-status-pill">Active Donor Account</span>
            </div>

            <div className="profile-details-list">
              <div className="profile-detail-item">
                <span className="profile-detail-label">Email Address</span>
                <span className="profile-detail-value">{user.email || "Not specified"}</span>
              </div>

              <div className="profile-detail-item">
                <span className="profile-detail-label">Mobile Number</span>
                <span className="profile-detail-value">{user.mobile || "+91 98480 12345"}</span>
              </div>

              <div className="profile-detail-item">
                <span className="profile-detail-label">Address</span>
                <span className="profile-detail-value">{user.address || "Hyderabad, Telangana"}</span>
              </div>

              <div className="profile-detail-item">
                <span className="profile-detail-label">Donor Since</span>
                <span className="profile-detail-value">{user.donorSince || "2025"}</span>
              </div>
            </div>
          </section>

          {/* Donations History */}
          <section className="donations-history-card">
            <div className="section-title-wrap">
              <h3>📦 Recent Donation Batches</h3>
            </div>

            <div className="history-table-container">
              <table className="user-donations-table">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Date</th>
                    <th>Medicines & Quantity</th>
                    <th>Center</th>
                    <th>Status</th>
                    <th>Tax Value</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: "monospace", fontWeight: "bold" }}>{item.id}</td>
                      <td>{item.date}</td>
                      <td style={{ fontWeight: 600 }}>{item.medicine}</td>
                      <td>{item.center}</td>
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: "bold", color: "#0d9488" }}>{item.taxVal}</td>
                      <td>
                        <NavLink to="/certificate" className="action-table-link">
                          View 80G ↗
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <footer className="user-footer">
        <p>© 2026 Medicine Donation Center Locator • Connecting Donors with Healthcare Centers Across India</p>
      </footer>
    </div>
  );
};

export default User;
