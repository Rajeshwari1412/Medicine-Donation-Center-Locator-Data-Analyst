import "./Admin.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const initialMockUsers = [
  { id: 1, username: "dr_sharma_clinic", email: "drsharma@apollohealth.org", mobile: "+91 98480 11223", role: "Clinic Admin", approved: 1 },
  { id: 2, username: "sunita_reddy", email: "sunita.reddy@gmail.com", mobile: "+91 99890 44556", role: "Individual Donor", approved: 1 },
  { id: 3, username: "care_pharmacy_hyd", email: "contact@carepharm.in", mobile: "+91 94401 77889", role: "Partner Pharmacy", approved: 0 },
  { id: 4, username: "vikram_rathore", email: "vikram.r@outlook.com", mobile: "+91 98661 99001", role: "Individual Donor", approved: 0 },
  { id: 5, username: "rainbow_trust_ngo", email: "support@rainbowtrust.org", mobile: "+91 97412 33445", role: "NGO Center Lead", approved: 1 }
];

const Admin = () => {
  const [users, setUsers] = useState(initialMockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load users from backend if available
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/admin/");
      if (res.data?.users && res.data.users.length > 0) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log("Using local mock dataset for demonstration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Approve user
  const approveUser = async (username) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/approve/", { username });
      loadUsers();
    } catch (error) {
      // Fallback local update
      setUsers(prev =>
        prev.map(u => u.username === username ? { ...u, approved: 1 } : u)
      );
    }
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.role && u.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingApprovalsCount = users.filter(u => u.approved === 0).length;

  return (
    <div className="admin-dashboard-wrapper">
      {/* Admin Nav */}
      <header className="admin-nav-header">
        <div className="admin-brand-group">
          <span className="admin-brand-icon">⚙️</span>
          <div>
            <h1>Admin Control Center</h1>
            <span>Medication Donation Network Management</span>
          </div>
        </div>

        <div className="admin-nav-actions">
          <NavLink to="/" className="admin-nav-link">Public Home</NavLink>
          <NavLink to="/analytics" className="admin-nav-link">Analytics</NavLink>
          <NavLink to="/guidelines" className="admin-nav-link">Guidelines</NavLink>
          <NavLink to="/login" className="admin-logout-btn">Logout</NavLink>
        </div>
      </header>

      <main className="admin-container">
        {/* Banner */}
        <section className="admin-welcome-banner">
          <div className="admin-welcome-text">
            <h2>Welcome to Central Administration 🛡️</h2>
            <p>Manage verified donation hubs, verify registered donors & pharmacies, and review distribution status.</p>
          </div>
          <div className="admin-badge-secure">
            <span>🔒</span>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#99f6e4" }}>Access Level</div>
              <div>System SuperAdmin</div>
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="metric-icon-wrap blue">👥</div>
            <div>
              <div className="metric-value">{users.length}</div>
              <div className="metric-label">Registered Accounts</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="metric-icon-wrap emerald">🏥</div>
            <div>
              <div className="metric-value">18</div>
              <div className="metric-label">Active Donation Centers</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="metric-icon-wrap amber">⏳</div>
            <div>
              <div className="metric-value">{pendingApprovalsCount}</div>
              <div className="metric-label">Pending Verifications</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="metric-icon-wrap purple">📊</div>
            <div>
              <div className="metric-value">99.4%</div>
              <div className="metric-label">Network Uptime & Safety</div>
            </div>
          </div>
        </section>

        {/* Center Management Tools */}
        <div className="section-title-wrap">
          <h3>🏥 Center & Timings Operations</h3>
        </div>
        <div className="admin-tools-grid">
          <div className="admin-tool-card" onClick={() => navigate("/addcenters")}>
            <div>
              <div className="admin-tool-header">
                <span className="admin-tool-icon">➕</span>
                <h4>Add New Center</h4>
              </div>
              <p className="admin-tool-desc">
                Register a newly licensed NGO pharmacy, hospital drop-box, or cold-chain storage facility.
              </p>
            </div>
            <button className="admin-tool-btn">Add Center Form →</button>
          </div>

          <div className="admin-tool-card" onClick={() => navigate("/centertimings")}>
            <div>
              <div className="admin-tool-header">
                <span className="admin-tool-icon">🕒</span>
                <h4>Operating Timings</h4>
              </div>
              <p className="admin-tool-desc">
                Update daily open/close schedules, weekend emergency hours, and pharmacist consultation shifts.
              </p>
            </div>
            <button className="admin-tool-btn">Configure Timings →</button>
          </div>

          <div className="admin-tool-card" onClick={() => navigate("/managecenters")}>
            <div>
              <div className="admin-tool-header">
                <span className="admin-tool-icon">📋</span>
                <h4>Manage Center Directory</h4>
              </div>
              <p className="admin-tool-desc">
                View all active hubs, update geo-coordinates, phone lines, and supported medicine categories.
              </p>
            </div>
            <button className="admin-tool-btn">Manage Directory →</button>
          </div>
        </div>

        {/* User Approvals Table */}
        <section className="admin-table-card">
          <div className="admin-table-header-row">
            <div>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>User & Partner Approvals</h3>
              <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.88rem" }}>
                Verify identity credentials for participating NGOs, donor accounts, and hospital partners.
              </p>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role / Designation</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id || u.username}>
                    <td style={{ fontWeight: 700, color: "#0f172a" }}>{u.username}</td>
                    <td>
                      <span style={{ fontSize: "0.85rem", background: "#f1f5f9", padding: "4px 8px", borderRadius: "6px", fontWeight: 600 }}>
                        {u.role || "Member"}
                      </span>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.mobile}</td>
                    <td>
                      {u.approved === 1 ? (
                        <span className="admin-approved-badge">✓ Approved</span>
                      ) : (
                        <span style={{ background: "#fef3c7", color: "#b45309", padding: "4px 10px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700 }}>
                          Pending Verification
                        </span>
                      )}
                    </td>
                    <td>
                      {u.approved === 0 ? (
                        <button
                          className="admin-approve-btn"
                          onClick={() => approveUser(u.username)}
                        >
                          Approve Account
                        </button>
                      ) : (
                        <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>
                          Active
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "2rem 0 1rem", color: "#64748b", fontSize: "0.85rem" }}>
        <p>© 2026 Medicine Donation Center Locator • Admin Operations & Security Control</p>
      </footer>
    </div>
  );
};

export default Admin;