import React, { useState } from 'react';
import './DonationCertificate.css';

export default function DonationCertificate() {
  const [donorName, setDonorName] = useState('Rajeshwari Kotoju');
  const [donationId, setDonationId] = useState('MDC-2026-8942');
  const [category, setCategory] = useState('Prescription Antibiotics (Amoxicillin)');
  const [units, setUnits] = useState('10 Strips (100 Tablets)');
  const [centerName, setCenterName] = useState('Metro Care Community Medicine Bank');
  const [issuedDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [generated, setGenerated] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cert-page-wrapper">
      <div className="cert-container">
        {/* Controls Toolbar */}
        <div className="cert-controls-card no-print">
          <div className="cert-controls-left">
            <span className="cert-pill">📜 Verified Public Health Impact</span>
            <h2>Digital Donation & Tax Exemption Certificate</h2>
            <p>Generate an official verified certificate for your medicine contribution with audit QR code verification.</p>
          </div>

          <div className="cert-controls-actions">
            <button className="btn-print-cert" onClick={handlePrint}>
              🖨️ Download / Print Certificate
            </button>
          </div>
        </div>

        {/* Input Customizer Form */}
        <div className="cert-form-card no-print">
          <h3>Customize Certificate Details</h3>
          <div className="cert-form-grid">
            <div>
              <label>Donor Full Name:</label>
              <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} />
            </div>
            <div>
              <label>Donation Reference ID:</label>
              <input type="text" value={donationId} onChange={(e) => setDonationId(e.target.value)} />
            </div>
            <div>
              <label>Medication Category & Count:</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
              <label>Accredited Receiving Center:</label>
              <input type="text" value={centerName} onChange={(e) => setCenterName(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="certificate-frame-outer" id="printable-certificate">
          <div className="certificate-frame-inner">
            {/* Header */}
            <div className="cert-header">
              <div className="cert-seal-badge">💊</div>
              <div className="cert-issuer">
                <h1>CERTIFICATE OF MEDICINE CONTRIBUTION</h1>
                <span className="cert-sub-title">NATIONAL HEALTHCARE ACCREDITED DONATION NETWORK</span>
              </div>
              <div className="cert-official-seal">
                <span className="seal-text">OFFICIAL VERIFIED IMPACT</span>
              </div>
            </div>

            {/* Body */}
            <div className="cert-body">
              <p className="cert-intro">This is officially presented to acknowledge with deep gratitude</p>
              <h2 className="donor-highlight-name">{donorName || 'Honorable Medicine Donor'}</h2>
              <p className="cert-citation">
                for donating unused, clinically validated medications in full compliance with WHO Good Donation Practices & state pharmacy standards. Your contribution directly prevented medical waste and supported essential patient care.
              </p>

              {/* Donation Data Summary */}
              <div className="cert-meta-grid">
                <div className="meta-block">
                  <span className="meta-lbl">Contribution ID</span>
                  <strong className="meta-val font-mono">{donationId}</strong>
                </div>
                <div className="meta-block">
                  <span className="meta-lbl">Medication Category</span>
                  <strong className="meta-val">{category}</strong>
                </div>
                <div className="meta-block">
                  <span className="meta-lbl">Receiving Hub</span>
                  <strong className="meta-val">{centerName}</strong>
                </div>
                <div className="meta-block">
                  <span className="meta-lbl">Date of Verification</span>
                  <strong className="meta-val">{issuedDate}</strong>
                </div>
              </div>
            </div>

            {/* Footer Signatures & QR Code */}
            <div className="cert-footer">
              <div className="sig-block">
                <div className="sig-line">Dr. Ramesh K. (Chief Pharmacist)</div>
                <span className="sig-title">Quality & FEFO Verification Officer</span>
              </div>

              <div className="qr-verification-box">
                {/* SVG QR Code Simulation */}
                <svg width="68" height="68" viewBox="0 0 100 100" fill="#0f172a">
                  <path d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM60 20h10v10h-10zM10 50h10v10h-10zM30 50h10v10h-10zM10 70h30v20h-30zM50 50h20v20h-20zM80 50h10v30h-10zM50 80h10v10h-10zM70 80h20v10h-20z"/>
                </svg>
                <span className="qr-text">Scan to Verify Audit Record</span>
              </div>

              <div className="sig-block">
                <div className="sig-line">Sec. Healthcare Outreach</div>
                <span className="sig-title">State Donation Registry Council</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
