import React, { useState, useEffect } from "react";
import "../../App.css";
import "./DonationCenters.css";

const initialCenters = [
  {
    id: 1,
    name: "Metro Care Community Medicine Bank",
    license: "MDC-89214-TS",
    address: "Jubilee Hills Road 36, Hyderabad",
    timings: "Mon-Sat: 09:00 AM - 08:00 PM",
    sunday: "10:00 AM - 02:00 PM (Emergency Drop-off)",
    phone: "+91 98480 12345",
    categories: ["Prescription Antibiotics", "Chronic Care & Cardiac", "OTC & Pain Relief"],
    lat: 17.4319,
    lng: 78.4073,
    emergency: true,
    distance: "1.8 km away"
  },
  {
    id: 2,
    name: "Hope NGO Central Medicine Donation Center",
    license: "NGO-44120-HYD",
    address: "Plot 45, Hitec City Road, Madhapur, Hyderabad",
    timings: "Mon-Fri: 08:30 AM - 07:00 PM",
    sunday: "Closed",
    phone: "+91 99890 54321",
    categories: ["Biologics & Cold-Chain", "Diabetes & Insulin", "Pediatric Care"],
    lat: 17.4483,
    lng: 78.3808,
    emergency: true,
    distance: "3.2 km away"
  },
  {
    id: 3,
    name: "Seva Trust Red Cross Medicine Bank",
    license: "RC-10982-SEC",
    address: "Red Cross Bhavan, MG Road, Secunderabad",
    timings: "Mon-Sat: 09:00 AM - 06:00 PM",
    sunday: "Closed",
    phone: "+91 94401 67890",
    categories: ["Prescription Antibiotics", "General Surgery & First-Aid", "OTC & Pain Relief"],
    lat: 17.4399,
    lng: 78.4983,
    emergency: false,
    distance: "5.6 km away"
  },
  {
    id: 4,
    name: "LifeLine Charitable Health & Pharmacy Post",
    license: "LL-67123-KPHB",
    address: "Phase 3, KPHB Colony, Kukatpally, Hyderabad",
    timings: "Daily: 08:00 AM - 09:00 PM",
    sunday: "08:00 AM - 05:00 PM",
    phone: "+91 98661 23456",
    categories: ["Chronic Care & Cardiac", "Diabetes & Insulin", "Respiratory & Inhalers"],
    lat: 17.4938,
    lng: 78.3989,
    emergency: true,
    distance: "7.1 km away"
  }
];

function DonationCenters() {
  const [centers] = useState(initialCenters);
  const [selectedCenter, setSelectedCenter] = useState(initialCenters[0]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [bookingModal, setBookingModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    medicineCategory: "Prescription Antibiotics",
    estimatedQuantity: "1-5 packs",
    preferredTime: "10:30 AM"
  });

  const categories = [
    "All",
    "Prescription Antibiotics",
    "Chronic Care & Cardiac",
    "Diabetes & Insulin",
    "Biologics & Cold-Chain",
    "OTC & Pain Relief"
  ];

  const filteredCenters = filterCategory === "All"
    ? centers
    : centers.filter(c => c.categories.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase().slice(0, 5))));

  const handleBook = (center) => {
    setSelectedCenter(center);
    setBookingModal(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone) {
      alert("Please fill in your name and contact phone number.");
      return;
    }

    alert(
      `✅ Drop-off Scheduled Successfully!\n\n` +
      `🏥 Center: ${selectedCenter.name}\n` +
      `👤 Donor: ${userData.name}\n` +
      `📞 Phone: ${userData.phone}\n` +
      `💊 Category: ${userData.medicineCategory}\n` +
      `🕒 Slot: ${userData.preferredTime}\n` +
      `📍 Location: ${selectedCenter.address}\n\n` +
      `A confirmation SMS has been dispatched.`
    );

    setUserData({
      name: "",
      phone: "",
      medicineCategory: "Prescription Antibiotics",
      estimatedQuantity: "1-5 packs",
      preferredTime: "10:30 AM"
    });
    setBookingModal(false);
  };

  return (
    <div className="centers-page-container">
      <div className="centers-header">
        <h2>Donation Centers Locator & Operating Timings</h2>
        <p>Find accredited drop-off points, check real-time operating hours, and schedule safe medicine donations.</p>
      </div>

      {/* Category Filter Bar */}
      <div className="filter-chip-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filterCategory === cat ? "active" : ""}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Layout: Interactive Map + Center Cards */}
      <div className="locator-layout">
        {/* Left Column: Interactive Map View */}
        <div className="map-column">
          <div className="map-frame-wrapper">
            <iframe
              title="Medicine Donation Centers Interactive Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedCenter.lng - 0.05}%2C${selectedCenter.lat - 0.03}%2C${selectedCenter.lng + 0.05}%2C${selectedCenter.lat + 0.03}&layer=mapnik&marker=${selectedCenter.lat}%2C${selectedCenter.lng}`}
            />
          </div>
          <div className="map-info-bar">
            <span>📍 Currently focused on: <strong>{selectedCenter.name}</strong></span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCenter.name + ' ' + selectedCenter.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="directions-link"
            >
              Get Directions ↗
            </a>
          </div>
        </div>

        {/* Right Column: Center Listing Cards */}
        <div className="centers-list-column">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className={`center-card ${selectedCenter.id === center.id ? "active-card" : ""}`}
              onClick={() => setSelectedCenter(center)}
            >
              <div className="center-card-top">
                <div>
                  <h3 className="center-name">{center.name}</h3>
                  <span className="center-license">License: {center.license}</span>
                </div>
                <span className="distance-badge">{center.distance}</span>
              </div>

              <p className="center-address">📍 {center.address}</p>

              <div className="timings-box">
                <div>⏰ <strong>Weekday Timings:</strong> {center.timings}</div>
                <div>📅 <strong>Sunday:</strong> {center.sunday}</div>
              </div>

              <div className="category-tags">
                {center.categories.map((c, i) => (
                  <span key={i} className="cat-tag">{c}</span>
                ))}
              </div>

              <div className="card-actions">
                <span className="phone-text">📞 {center.phone}</span>
                <button
                  className="schedule-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBook(center);
                  }}
                >
                  Schedule Drop-off
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModal && selectedCenter && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Schedule Medicine Drop-off</h3>
              <button className="close-x" onClick={() => setBookingModal(false)}>✕</button>
            </div>
            
            <p className="modal-sub">
              Drop-off Center: <strong>{selectedCenter.name}</strong>
            </p>

            <form onSubmit={handleConfirm} className="modal-form">
              <div className="form-group">
                <label>Donor Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98480 12345"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Medicine Category</label>
                <select
                  value={userData.medicineCategory}
                  onChange={(e) => setUserData({ ...userData, medicineCategory: e.target.value })}
                >
                  <option>Prescription Antibiotics</option>
                  <option>Chronic Care & Cardiac</option>
                  <option>Diabetes Care & Insulin (Cold Chain)</option>
                  <option>Over-The-Counter (OTC) & Pain Relief</option>
                  <option>Pediatric Suspensions</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Quantity</label>
                  <select
                    value={userData.estimatedQuantity}
                    onChange={(e) => setUserData({ ...userData, estimatedQuantity: e.target.value })}
                  >
                    <option>1-5 packs</option>
                    <option>6-15 packs</option>
                    <option>Bulk (15+ packs)</option>
                  </select>
                </div>

                <div className="form-group half">
                  <label>Preferred Time Slot</label>
                  <input
                    type="time"
                    value={userData.preferredTime}
                    onChange={(e) => setUserData({ ...userData, preferredTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setBookingModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm Drop-off Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationCenters;