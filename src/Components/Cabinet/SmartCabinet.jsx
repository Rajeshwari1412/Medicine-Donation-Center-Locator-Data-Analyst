import React, { useState } from "react";
import "./SmartCabinet.css";
import { useNavigate } from "react-router-dom";

const initialCabinet = [
  {
    id: 1,
    name: "Augmentin 625 Duo (Amoxicillin + Clavulanic)",
    category: "Prescription Antibiotics",
    quantity: "2 Strips (20 tabs)",
    expiryDate: "2026-11-15",
    daysLeft: 44,
    status: "Donate Soon",
    storage: "Room Temp (<25°C)",
    estimatedValue: "₹ 420"
  },
  {
    id: 2,
    name: "Lantus Solostar Insulin Glargine 100IU",
    category: "Diabetes & Insulin",
    quantity: "1 Pen (Unopened)",
    expiryDate: "2027-04-30",
    daysLeft: 210,
    status: "Safe Shelf-Life",
    storage: "Refrigerated (2-8°C)",
    estimatedValue: "₹ 890"
  },
  {
    id: 3,
    name: "Telmisartan 40mg + Amlodipine 5mg",
    category: "Chronic Care & Cardiac",
    quantity: "3 Strips (30 tabs)",
    expiryDate: "2026-10-25",
    daysLeft: 23,
    status: "Critical - Donate Now",
    storage: "Room Temp (<25°C)",
    estimatedValue: "₹ 280"
  },
  {
    id: 4,
    name: "Salbutamol Inhaler 100mcg (Asthalin)",
    category: "Respiratory & Inhalers",
    quantity: "1 Inhaler (Sealed)",
    expiryDate: "2027-08-10",
    daysLeft: 312,
    status: "Safe Shelf-Life",
    storage: "Dry Place (<30°C)",
    estimatedValue: "₹ 165"
  }
];

function SmartCabinet() {
  const [items, setItems] = useState(initialCabinet);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    name: "",
    category: "Prescription Antibiotics",
    quantity: "",
    expiryDate: "",
    storage: "Room Temp (<25°C)",
    estimatedValue: "₹ 250"
  });
  const [alertBanner, setAlertBanner] = useState("");
  const navigate = useNavigate();

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!form.name || !form.expiryDate) return;

    // Calculate days left from today
    const exp = new Date(form.expiryDate);
    const today = new Date();
    const diffTime = exp - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = "Safe Shelf-Life";
    if (daysLeft < 30) status = "Critical - Donate Now";
    else if (daysLeft < 90) status = "Donate Soon";

    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      quantity: form.quantity || "1 Pack",
      expiryDate: form.expiryDate,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      status: daysLeft <= 0 ? "Expired (Disposal Only)" : status,
      storage: form.storage,
      estimatedValue: form.estimatedValue
    };

    setItems([newItem, ...items]);
    setAlertBanner(`✅ Added "${form.name}" to your medicine cabinet.`);
    setTimeout(() => setAlertBanner(""), 4000);

    setForm({
      name: "",
      category: "Prescription Antibiotics",
      quantity: "",
      expiryDate: "",
      storage: "Room Temp (<25°C)",
      estimatedValue: "₹ 250"
    });
  };

  const handleConvertToDonation = (item) => {
    setAlertBanner(`📦 Medicine batch "${item.name}" pre-filled for donation! Navigating to Centers.`);
    setTimeout(() => {
      navigate("/donation-centers");
    }, 1200);
  };

  const filteredItems = items.filter((i) => {
    if (filter === "DonateSoon") return i.daysLeft <= 90 && i.daysLeft > 0;
    if (filter === "Safe") return i.daysLeft > 90;
    return true;
  });

  const criticalCount = items.filter((i) => i.daysLeft <= 30 && i.daysLeft > 0).length;
  const donateSoonCount = items.filter((i) => i.daysLeft <= 90 && i.daysLeft > 30).length;

  return (
    <div className="cabinet-wrapper">
      <div className="cabinet-container">
        {/* Banner */}
        <section className="cabinet-banner">
          <div className="cabinet-banner-title">
            <h1>🏠 Smart Medicine Cabinet & Expiry Alerts</h1>
            <p>Track your home medicine stock, prevent shelf-life expiration, and donate timely to save lives.</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", backdropFilter: "blur(8px)" }}>
            <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>Total Estimated Stock Value</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800" }}>₹ 1,755</div>
          </div>
        </section>

        {alertBanner && (
          <div style={{
            background: "#0d9488",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            borderRadius: "14px",
            marginBottom: "1.5rem",
            fontWeight: "700",
            boxShadow: "0 8px 20px rgba(13,148,136,0.3)"
          }}>
            {alertBanner}
          </div>
        )}

        {/* Stats Row */}
        <section className="cabinet-stats-row">
          <div className="cabinet-stat-card">
            <div className="icon blue">📦</div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800" }}>{items.length}</div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "600" }}>Total Medicines Tracked</div>
            </div>
          </div>

          <div className="cabinet-stat-card">
            <div className="icon rose">🚨</div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#e11d48" }}>{criticalCount}</div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "600" }}>Critical (&lt;30 Days Left)</div>
            </div>
          </div>

          <div className="cabinet-stat-card">
            <div className="icon amber">⏳</div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#d97706" }}>{donateSoonCount}</div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "600" }}>Donate Soon (30-90 Days)</div>
            </div>
          </div>

          <div className="cabinet-stat-card">
            <div className="icon emerald">🌿</div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#059669" }}>
                {items.filter(i => i.daysLeft > 90).length}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "600" }}>Safe Shelf-Life (&gt;3 Mos)</div>
            </div>
          </div>
        </section>

        {/* Grid Layout */}
        <div className="cabinet-grid-layout">
          {/* Main List */}
          <section className="cabinet-main-card">
            <div className="cabinet-top-controls">
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>💊 Cabinet Medicine Inventory</h3>
              <div className="cabinet-filter-tabs">
                <button
                  className={`cabinet-tab-btn ${filter === "All" ? "active" : ""}`}
                  onClick={() => setFilter("All")}
                >
                  All Items ({items.length})
                </button>
                <button
                  className={`cabinet-tab-btn ${filter === "DonateSoon" ? "active" : ""}`}
                  onClick={() => setFilter("DonateSoon")}
                >
                  Needs Donation ({criticalCount + donateSoonCount})
                </button>
                <button
                  className={`cabinet-tab-btn ${filter === "Safe" ? "active" : ""}`}
                  onClick={() => setFilter("Safe")}
                >
                  Safe Shelf-Life
                </button>
              </div>
            </div>

            <div className="cabinet-items-list">
              {filteredItems.map((item) => {
                const isCritical = item.daysLeft <= 30;
                const isWarning = item.daysLeft <= 90 && !isCritical;
                const cardClass = isCritical ? "critical" : isWarning ? "warning" : "safe";
                const badgeClass = isCritical ? "critical" : isWarning ? "warning" : "safe";
                const fillPercent = Math.min(100, Math.max(8, (item.daysLeft / 365) * 100));

                return (
                  <div key={item.id} className={`cabinet-item-card ${cardClass}`}>
                    <div className="cabinet-item-head">
                      <div>
                        <h4>{item.name}</h4>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          📁 {item.category} • 📦 {item.quantity} • ❄️ {item.storage}
                        </div>
                      </div>
                      <span className={`cabinet-pill-badge ${badgeClass}`}>
                        {item.daysLeft} Days Left ({item.status})
                      </span>
                    </div>

                    <div className="expiry-countdown-bar-wrap">
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748b", marginBottom: 4 }}>
                        <span>Expiry Date: <strong>{item.expiryDate}</strong></span>
                        <span>Estimated Value: <strong>{item.estimatedValue}</strong></span>
                      </div>
                      <div className="expiry-bar-bg">
                        <div
                          className={`expiry-bar-fill ${badgeClass}`}
                          style={{ width: `${fillPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="cabinet-item-actions">
                      <span style={{ fontSize: "0.82rem", color: "#475569" }}>
                        {isCritical
                          ? "⚠️ High risk of expiration waste. Recommended to donate this week."
                          : "✓ Optimal condition for patient redistribution."}
                      </span>
                      <button
                        className="convert-donate-btn"
                        onClick={() => handleConvertToDonation(item)}
                      >
                        📦 Donate to Center →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Form */}
          <section className="cabinet-side-card">
            <h3>➕ Add Medicine</h3>
            <p style={{ margin: "0 0 1.2rem 0", color: "#64748b", fontSize: "0.85rem" }}>
              Log unopened or spare medicines to receive automated expiry degradation reminders.
            </p>

            <form onSubmit={handleAddItem}>
              <div className="side-form-group">
                <label>Medicine Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Paracetamol 650mg"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="side-form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Prescription Antibiotics">Prescription Antibiotics</option>
                  <option value="Chronic Care & Cardiac">Chronic Care & Cardiac</option>
                  <option value="Diabetes & Insulin">Diabetes & Insulin</option>
                  <option value="Biologics & Cold-Chain">Biologics & Cold-Chain</option>
                  <option value="Respiratory & Inhalers">Respiratory & Inhalers</option>
                  <option value="OTC & Pain Relief">OTC & Pain Relief</option>
                </select>
              </div>

              <div className="side-form-group">
                <label>Quantity & Packaging</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Strips (20 tabs)"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>

              <div className="side-form-group">
                <label>Expiry Date on Strip/Box *</label>
                <input
                  type="date"
                  required
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                />
              </div>

              <div className="side-form-group">
                <label>Storage Requirement</label>
                <select
                  value={form.storage}
                  onChange={(e) => setForm({ ...form, storage: e.target.value })}
                >
                  <option value="Room Temp (<25°C)">Room Temp (&lt;25°C)</option>
                  <option value="Refrigerated (2-8°C)">Refrigerated (2-8°C)</option>
                  <option value="Dry Place (<30°C)">Dry Place (&lt;30°C)</option>
                </select>
              </div>

              <button type="submit" className="add-med-btn">
                Track in Cabinet
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SmartCabinet;
