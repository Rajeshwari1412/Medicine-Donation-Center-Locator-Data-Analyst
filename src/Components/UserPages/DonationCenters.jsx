import React, { useState } from "react";
import "./DonationCenters.css";

const initialCenters = [
  {
    id: 1,
    name: "Metro Care Community Medicine Bank",
    license: "MDC-89214-TS",
    address: "Jubilee Hills Road 36, Hyderabad",
    city: "Hyderabad",
    timings: "Mon-Sat: 09:00 AM - 08:00 PM",
    sunday: "10:00 AM - 02:00 PM (Emergency Drop-off)",
    phone: "+91 98480 12345",
    categories: ["Prescription Antibiotics", "Chronic Care & Cardiac", "OTC & Pain Relief"],
    lat: 17.4319,
    lng: 78.4073,
    emergency: true,
    isOpenNow: true,
    distance: "1.8 km away"
  },
  {
    id: 2,
    name: "Hope NGO Central Medicine Donation Center",
    license: "NGO-44120-HYD",
    address: "Plot 45, Hitec City Road, Madhapur, Hyderabad",
    city: "Hyderabad",
    timings: "Mon-Fri: 08:30 AM - 07:00 PM",
    sunday: "Closed",
    phone: "+91 99890 54321",
    categories: ["Biologics & Cold-Chain", "Diabetes & Insulin", "Pediatric Care"],
    lat: 17.4483,
    lng: 78.3808,
    emergency: true,
    isOpenNow: true,
    distance: "3.2 km away"
  },
  {
    id: 3,
    name: "Seva Trust Red Cross Medicine Bank",
    license: "RC-10982-SEC",
    address: "Red Cross Bhavan, MG Road, Secunderabad",
    city: "Secunderabad",
    timings: "Mon-Sat: 09:00 AM - 06:00 PM",
    sunday: "Closed",
    phone: "+91 94401 67890",
    categories: ["Prescription Antibiotics", "General Surgery & First-Aid", "OTC & Pain Relief"],
    lat: 17.4399,
    lng: 78.4983,
    emergency: false,
    isOpenNow: true,
    distance: "5.6 km away"
  },
  {
    id: 4,
    name: "LifeLine Charitable Health & Pharmacy Post",
    license: "LL-67123-KPHB",
    address: "Phase 3, KPHB Colony, Kukatpally, Hyderabad",
    city: "Hyderabad",
    timings: "Daily: 08:00 AM - 09:00 PM",
    sunday: "08:00 AM - 05:00 PM",
    phone: "+91 98661 23456",
    categories: ["Chronic Care & Cardiac", "Diabetes & Insulin", "Respiratory & Inhalers"],
    lat: 17.4938,
    lng: 78.3989,
    emergency: true,
    isOpenNow: true,
    distance: "7.1 km away"
  },
  {
    id: 5,
    name: "Aarogya Seva Trust & Community Dispensary",
    license: "AST-55109-BNG",
    address: "12th Main Road, Indiranagar, Bangalore",
    city: "Bangalore",
    timings: "Mon-Sat: 09:00 AM - 07:30 PM",
    sunday: "09:00 AM - 01:00 PM",
    phone: "+91 97412 88990",
    categories: ["Prescription Antibiotics", "Biologics & Cold-Chain", "Chronic Care & Cardiac"],
    lat: 12.9784,
    lng: 77.6408,
    emergency: true,
    isOpenNow: true,
    distance: "Near Metro Stn"
  }
];

function DonationCenters() {
  const [centers] = useState(initialCenters);
  const [selectedCenter, setSelectedCenter] = useState(initialCenters[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    medicineCategory: "Prescription Antibiotics",
    estimatedQuantity: "1-5 packs",
    preferredTime: "10:30 AM",
    notes: ""
  });

  const categories = [
    "All",
    "Prescription Antibiotics",
    "Chronic Care & Cardiac",
    "Diabetes & Insulin",
    "Biologics & Cold-Chain",
    "OTC & Pain Relief",
    "Respiratory & Inhalers"
  ];

  const filteredCenters = centers.filter((center) => {
    const matchesCategory = filterCategory === "All" || center.categories.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase().slice(0, 5)));
    const matchesSearch = searchQuery === "" || 
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleBook = (center) => {
    setSelectedCenter(center);
    setBookingModal(true);
    setBookingSuccess(null);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone) {
      alert("Please enter donor name and contact number.");
      return;
    }

    const appointment = {
      id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
      centerName: selectedCenter.name,
      donorName: userData.name,
      phone: userData.phone,
      category: userData.medicineCategory,
      slot: userData.preferredTime,
      address: selectedCenter.address
    };

    setBookingSuccess(appointment);
    setBookingModal(false);
  };

  return (
    <div className="centers-page-wrapper">
      <div className="centers-page-container">
        {/* Header section */}
        <div className="centers-header-card">
          <div className="header-left">
            <span className="section-pill">📍 Geo-Verified Centers</span>
            <h2>Donation Centers Locator & Operating Timings</h2>
            <p>Find authorized medical drop-off banks, check live operating schedules, and schedule safe handovers.</p>
          </div>
          <div className="header-badge-stat">
            <span className="stat-num">{centers.length}</span>
            <span className="stat-desc">Accredited Centers Online</span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {bookingSuccess && (
          <div className="success-banner-card">
            <div className="success-icon">✅</div>
            <div className="success-body">
              <h4>Drop-off Appointment Confirmed! (ID: {bookingSuccess.id})</h4>
              <p>
                Scheduled for <strong>{bookingSuccess.donorName}</strong> at <strong>{bookingSuccess.centerName}</strong> ({bookingSuccess.slot}). Confirmation SMS sent to <strong>{bookingSuccess.phone}</strong>.
              </p>
            </div>
            <button className="dismiss-btn" onClick={() => setBookingSuccess(null)}>✕</button>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="search-filter-toolbar">
          <div className="search-input-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by center name, locality, or medicine name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✕</button>
            )}
          </div>

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
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="locator-layout">
          {/* Left Column: Interactive Map View */}
          <div className="map-column">
            <div className="map-card-header">
              <div className="map-title-row">
                <span className="map-pulse-dot"></span>
                <span className="map-focus-label">Live Map View:</span>
                <strong className="map-focus-name">{selectedCenter.name}</strong>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCenter.lat},${selectedCenter.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                🗺️ Directions
              </a>
            </div>

            <div className="map-frame-wrapper">
              <iframe
                title="Medicine Donation Centers Live Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedCenter.lng - 0.04}%2C${selectedCenter.lat - 0.025}%2C${selectedCenter.lng + 0.04}%2C${selectedCenter.lat + 0.025}&layer=mapnik&marker=${selectedCenter.lat}%2C${selectedCenter.lng}`}
              />
            </div>

            <div className="map-info-footer">
              <div className="info-item">
                <span className="info-label">Coordinates:</span>
                <span className="info-val">{selectedCenter.lat.toFixed(4)}° N, {selectedCenter.lng.toFixed(4)}° E</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-val">{selectedCenter.address}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Centers List */}
          <div className="centers-list-column">
            <div className="list-status-header">
              <span>Showing <strong>{filteredCenters.length}</strong> matching center{filteredCenters.length !== 1 ? "s" : ""}</span>
            </div>

            {filteredCenters.length === 0 ? (
              <div className="no-results-card">
                <span className="no-res-icon">🔎</span>
                <h4>No Centers Found</h4>
                <p>Try resetting the search keyword or selecting "All" categories.</p>
                <button
                  className="reset-filter-btn"
                  onClick={() => {
                    setFilterCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCenters.map((center) => (
                <div
                  key={center.id}
                  className={`center-card ${selectedCenter.id === center.id ? "active-card" : ""}`}
                  onClick={() => setSelectedCenter(center)}
                >
                  <div className="center-card-top">
                    <div>
                      <div className="title-row">
                        <h3 className="center-name">{center.name}</h3>
                        {center.emergency && (
                          <span className="emergency-badge">⚡ 24/7 Drop Box</span>
                        )}
                      </div>
                      <span className="center-license">Govt License: {center.license}</span>
                    </div>
                    <span className="distance-badge">{center.distance}</span>
                  </div>

                  <p className="center-address">📍 {center.address}</p>

                  <div className="timings-box">
                    <div className="timing-row">
                      <span>⏰ <strong>Weekday Hours:</strong> {center.timings}</span>
                      <span className="status-indicator open">● Open Now</span>
                    </div>
                    <div className="timing-row">
                      <span>📅 <strong>Sunday Service:</strong> {center.sunday}</span>
                    </div>
                  </div>

                  <div className="category-tags">
                    {center.categories.map((c, i) => (
                      <span key={i} className="cat-tag">💊 {c}</span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <a href={`tel:${center.phone.replace(/\s+/g, '')}`} className="phone-link" onClick={(e) => e.stopPropagation()}>
                      📞 {center.phone}
                    </a>
                    <button
                      className="schedule-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBook(center);
                      }}
                    >
                      Schedule Drop-off ➔
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Appointment Booking Modal */}
        {bookingModal && selectedCenter && (
          <div className="modal-backdrop" onClick={() => setBookingModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3>Schedule Medicine Drop-off</h3>
                  <p className="modal-sub">
                    Destination Center: <strong>{selectedCenter.name}</strong>
                  </p>
                </div>
                <button className="close-x" onClick={() => setBookingModal(false)}>✕</button>
              </div>

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
                  <label>Phone Number (for SMS confirmation) *</label>
                  <input
                    type="tel"
                    placeholder="+91 98480 12345"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Medicine Category Being Donated</label>
                  <select
                    value={userData.medicineCategory}
                    onChange={(e) => setUserData({ ...userData, medicineCategory: e.target.value })}
                  >
                    <option>Prescription Antibiotics</option>
                    <option>Chronic Care & Cardiac</option>
                    <option>Diabetes Care & Insulin (Cold-Chain)</option>
                    <option>Over-The-Counter (OTC) & Pain Relief</option>
                    <option>Respiratory & Inhalers</option>
                    <option>Pediatric Suspensions</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Estimated Quantity</label>
                    <select
                      value={userData.estimatedQuantity}
                      onChange={(e) => setUserData({ ...userData, estimatedQuantity: e.target.value })}
                    >
                      <option>1-5 packs (Small)</option>
                      <option>6-15 packs (Medium)</option>
                      <option>15+ packs (Bulk Box)</option>
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
    </div>
  );
}

export default DonationCenters;