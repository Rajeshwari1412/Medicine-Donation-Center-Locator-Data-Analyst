import React, { useState } from "react";
import "./EmergencySOS.css";
import { NavLink } from "react-router-dom";

const initialRequests = [
  {
    id: "SOS-7091",
    medicine: "Human Albumin 20% Infusion (50ml)",
    category: "Biologics & Cold-Chain",
    quantity: "6 Vials",
    hospital: "Gandhi Govt Hospital ICU, Secunderabad",
    city: "Hyderabad",
    priority: "Critical",
    hoursLeft: "3 Hours Remaining",
    matchedCenter: "Metro Care Community Medicine Bank (2.1 km)",
    availableStock: "8 Vials Available in 2-8°C Storage",
    status: "Matched"
  },
  {
    id: "SOS-7088",
    medicine: "Meropenem 1g Injection",
    category: "Prescription Antibiotics",
    quantity: "20 Injections",
    hospital: "Rural Child Health Trust, Medak",
    city: "Telangana",
    priority: "High",
    hoursLeft: "8 Hours Remaining",
    matchedCenter: "Hope NGO Central Donation Center (4.3 km)",
    availableStock: "35 Units in Stock",
    status: "Matched"
  },
  {
    id: "SOS-7082",
    medicine: "Enoxaparin Sodium 40mg PFS",
    category: "Chronic Care & Cardiac",
    quantity: "12 Pre-filled Syringes",
    hospital: "Victoria Hospital Trauma Ward, Bangalore",
    city: "Bangalore",
    priority: "Critical",
    hoursLeft: "5 Hours Remaining",
    matchedCenter: "Aarogya Seva Trust Indiranagar (3.8 km)",
    availableStock: "15 Syringes Verified",
    status: "Matched"
  }
];

function EmergencySOS() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("All");
  const [dispatchedList, setDispatchedList] = useState([]);
  const [form, setForm] = useState({
    medicine: "",
    category: "Biologics & Cold-Chain",
    quantity: "",
    hospital: "",
    city: "Hyderabad",
    priority: "Critical",
    contactPerson: "",
    phone: ""
  });
  const [toastMsg, setToastMsg] = useState("");

  const handleDispatch = (item) => {
    setDispatchedList((prev) => [...prev, item.id]);
    setToastMsg(`🚨 Emergency Dispatch Alert Sent! Courier dispatched from "${item.matchedCenter}" to "${item.hospital}".`);
    setTimeout(() => setToastMsg(""), 6000);
  };

  const handleCreateSOS = (e) => {
    e.preventDefault();
    if (!form.medicine || !form.hospital) return;

    const newReq = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      medicine: form.medicine,
      category: form.category,
      quantity: form.quantity || "10 Units",
      hospital: form.hospital,
      city: form.city,
      priority: form.priority,
      hoursLeft: "6 Hours Remaining",
      matchedCenter: "AI Auto-Match: Metro Care Medicine Bank (1.8 km)",
      availableStock: "12 Verified Units Matched in Hub",
      status: "Matched"
    };

    setRequests([newReq, ...requests]);
    setToastMsg(`✅ Emergency SOS Broadcast Published! AI matched available stock at 1 nearby center.`);
    setTimeout(() => setToastMsg(""), 5000);

    setForm({
      medicine: "",
      category: "Biologics & Cold-Chain",
      quantity: "",
      hospital: "",
      city: "Hyderabad",
      priority: "Critical",
      contactPerson: "",
      phone: ""
    });
  };

  const filtered = requests.filter((r) => {
    if (filter === "Critical") return r.priority === "Critical";
    if (filter === "High") return r.priority === "High";
    return true;
  });

  return (
    <div className="emergency-sos-wrapper">
      <div className="sos-container">
        {/* Banner */}
        <section className="sos-header-card">
          <div className="sos-title-row">
            <div className="sos-title-group">
              <div className="sos-pulse-icon">🚨</div>
              <div>
                <h1>Emergency Medicine SOS & Shortage Dispatch</h1>
                <p>Real-time AI matching engine connecting urgent hospital ICU shortages with verified donation stock</p>
              </div>
            </div>

            <div className="sos-stats-pill-row">
              <div className="sos-stat-pill live">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                Live Dispatch Active
              </div>
              <div className="sos-stat-pill matched">
                ✓ 98.2% SOS Fulfillment Rate
              </div>
            </div>
          </div>
        </section>

        {/* Notification Toast */}
        {toastMsg && (
          <div style={{
            background: "rgba(16, 185, 129, 0.95)",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            borderRadius: "14px",
            marginBottom: "1.5rem",
            fontWeight: "700",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>{toastMsg}</span>
            <button onClick={() => setToastMsg("")} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
          </div>
        )}

        {/* SOS Metrics */}
        <section className="sos-metrics-grid">
          <div className="sos-metric-box">
            <div className="icon">⏱️</div>
            <div>
              <div className="num">&lt; 45 Mins</div>
              <div className="lbl">Average Emergency Courier Dispatch Time</div>
            </div>
          </div>

          <div className="sos-metric-box">
            <div className="icon">❄️</div>
            <div>
              <div className="num">100%</div>
              <div className="lbl">Cold-Chain Monitored Transit (2-8°C)</div>
            </div>
          </div>

          <div className="sos-metric-box">
            <div className="icon">🏥</div>
            <div>
              <div className="num">142+</div>
              <div className="lbl">Partner Hospitals & Trauma Centers</div>
            </div>
          </div>

          <div className="sos-metric-box">
            <div className="icon">💊</div>
            <div>
              <div className="num">1,890+</div>
              <div className="lbl">Emergency Doses Salvaged & Delivered</div>
            </div>
          </div>
        </section>

        {/* Main Columns */}
        <div className="sos-layout-grid">
          {/* Feed */}
          <section className="sos-feed-card">
            <div className="card-header-flex">
              <h3>📡 Active Urgent Shortage Broadcasts</h3>
              <div>
                <button
                  className={`filter-badge-btn ${filter === "All" ? "active" : ""}`}
                  onClick={() => setFilter("All")}
                >
                  All ({requests.length})
                </button>
                <button
                  className={`filter-badge-btn ${filter === "Critical" ? "active" : ""}`}
                  onClick={() => setFilter("Critical")}
                >
                  Critical Only
                </button>
              </div>
            </div>

            <div className="sos-requests-list">
              {filtered.map((item) => {
                const isDispatched = dispatchedList.includes(item.id);
                return (
                  <div key={item.id} className={`sos-request-item ${item.priority.toLowerCase()}`}>
                    <div className="sos-item-top">
                      <div>
                        <h4 className="sos-med-title">{item.medicine}</h4>
                        <div className="sos-hospital-sub">
                          <span>🏥 {item.hospital}</span> • <span>📍 {item.city}</span>
                        </div>
                      </div>
                      <span className={`sos-priority-badge ${item.priority.toLowerCase()}`}>
                        {item.priority} • {item.hoursLeft}
                      </span>
                    </div>

                    <div className="sos-details-grid">
                      <div>
                        <div className="sos-detail-label">Quantity Needed</div>
                        <div className="sos-detail-val">{item.quantity}</div>
                      </div>
                      <div>
                        <div className="sos-detail-label">Category</div>
                        <div className="sos-detail-val">{item.category}</div>
                      </div>
                      <div>
                        <div className="sos-detail-label">Tracking ID</div>
                        <div className="sos-detail-val" style={{ fontFamily: "monospace" }}>{item.id}</div>
                      </div>
                    </div>

                    <div className="sos-match-alert-box">
                      <div>
                        <strong>🎯 AI Match Found:</strong> {item.matchedCenter}
                        <div style={{ fontSize: "0.78rem", opacity: 0.9 }}>
                          {item.availableStock}
                        </div>
                      </div>

                      {isDispatched ? (
                        <span style={{ color: "#34d399", fontWeight: "800", fontSize: "0.85rem" }}>
                          ✓ Courier In Transit 🚚
                        </span>
                      ) : (
                        <button
                          className="dispatch-sos-btn"
                          onClick={() => handleDispatch(item)}
                        >
                          ⚡ Dispatch Emergency Courier
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Form */}
          <section className="sos-form-card">
            <h3>📝 Post Emergency Medicine Request</h3>
            <p className="sos-form-desc">
              Hospitals, ICUs, and verified doctors can publish priority requests to instantly tap into regional donation stockpiles.
            </p>

            <form onSubmit={handleCreateSOS}>
              <div className="sos-input-group">
                <label>Medicine Name & Strength *</label>
                <input
                  type="text"
                  placeholder="e.g. Liposomal Amphotericin B 50mg"
                  required
                  value={form.medicine}
                  onChange={(e) => setForm({ ...form, medicine: e.target.value })}
                />
              </div>

              <div className="sos-input-group">
                <label>Medicine Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Biologics & Cold-Chain">Biologics & Cold-Chain (2-8°C)</option>
                  <option value="Prescription Antibiotics">Prescription Antibiotics</option>
                  <option value="Chronic Care & Cardiac">Chronic Care & Cardiac</option>
                  <option value="Diabetes & Insulin">Diabetes & Insulin</option>
                  <option value="Respiratory & Inhalers">Respiratory & Inhalers</option>
                  <option value="General Surgery & First-Aid">General Surgery & First-Aid</option>
                </select>
              </div>

              <div className="sos-input-group">
                <label>Quantity Required *</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Vials / 10 Boxes"
                  required
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>

              <div className="sos-input-group">
                <label>Hospital / ICU Facility *</label>
                <input
                  type="text"
                  placeholder="e.g. NIMS Emergency Trauma Ward"
                  required
                  value={form.hospital}
                  onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="sos-input-group">
                  <label>City</label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Secunderabad">Secunderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div className="sos-input-group">
                  <label>Urgency Level</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    <option value="Critical">🚨 Critical (&lt; 4 hrs)</option>
                    <option value="High">⚠️ High (&lt; 12 hrs)</option>
                    <option value="Standard">Standard (&lt; 24 hrs)</option>
                  </select>
                </div>
              </div>

              <div className="sos-input-group">
                <label>Duty Doctor / Pharmacist Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98480 12345"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <button type="submit" className="submit-sos-btn">
                <span>⚡</span> Broadcast Emergency SOS
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EmergencySOS;
