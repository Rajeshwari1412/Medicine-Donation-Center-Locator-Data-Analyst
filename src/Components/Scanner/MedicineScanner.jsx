import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicineScanner.css';

const sampleMeds = [
  {
    id: 'sample-1',
    name: 'Amoxicillin & Clavulanic Acid 625mg',
    batch: 'BT-882109',
    mfgDate: '10/2025',
    expDate: '11/2027',
    category: 'Prescription Antibiotics',
    condition: 'Factory Sealed Blister Strip',
    status: 'PASSED',
    daysRemaining: 420,
    storage: 'Cool & Dry (<25°C)',
    prescriptionRequired: true,
    thumbnailText: '💊 Amoxicillin 625mg'
  },
  {
    id: 'sample-2',
    name: 'Human Recombinant Insulin 100IU/ml',
    batch: 'INS-44912',
    mfgDate: '01/2026',
    expDate: '06/2027',
    category: 'Diabetes Care & Insulin',
    condition: 'Unopened Vial - Cold Chain Carrier Required',
    status: 'COLD_CHAIN_ALERT',
    daysRemaining: 270,
    storage: 'Refrigerated (2°C - 8°C)',
    prescriptionRequired: true,
    thumbnailText: '❄️ Insulin 100IU'
  },
  {
    id: 'sample-3',
    name: 'Telmisartan 40mg + Amlodipine 5mg',
    batch: 'CRD-19044',
    mfgDate: '05/2025',
    expDate: '08/2027',
    category: 'Chronic Care & Cardiac',
    condition: 'Intact Strip (10 tablets)',
    status: 'PASSED',
    daysRemaining: 330,
    storage: 'Room Temp (15°C - 25°C)',
    prescriptionRequired: true,
    thumbnailText: '❤️ Telmisartan 40mg'
  },
  {
    id: 'sample-4',
    name: 'Expired Ibuprofen 400mg Strips',
    batch: 'IBU-9021',
    mfgDate: '01/2022',
    expDate: '03/2024',
    category: 'Over-The-Counter (OTC)',
    condition: 'Expired Pack',
    status: 'REJECTED',
    daysRemaining: -300,
    storage: 'Room Temperature',
    prescriptionRequired: false,
    thumbnailText: '⚠️ Expired Ibuprofen'
  }
];

export default function MedicineScanner() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        triggerOCRScan(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleSelect = (sample) => {
    setSelectedImage(null);
    setIsScanning(true);
    setScanResult(null);
    setActiveStep(2);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult(sample);
      setActiveStep(3);
    }, 1200);
  };

  const triggerOCRScan = (fileName) => {
    setIsScanning(true);
    setScanResult(null);
    setActiveStep(2);

    setTimeout(() => {
      setIsScanning(false);
      // Determine OCR mock output
      const name = fileName.toLowerCase();
      let matched = sampleMeds[0];
      if (name.includes('insulin') || name.includes('cold')) matched = sampleMeds[1];
      else if (name.includes('card') || name.includes('telmi')) matched = sampleMeds[2];
      else if (name.includes('exp') || name.includes('old')) matched = sampleMeds[3];

      setScanResult(matched);
      setActiveStep(3);
    }, 1500);
  };

  const handleProceedToDonation = () => {
    navigate('/donation-centers', {
      state: {
        scannedMedicine: scanResult.name,
        category: scanResult.category,
        batch: scanResult.batch
      }
    });
  };

  return (
    <div className="scanner-page-wrapper">
      <div className="scanner-container">
        {/* Header */}
        <div className="scanner-header-card">
          <div className="scanner-badge">
            <span>📷 AI Optical Scanner</span>
            <span className="dot">•</span>
            <span>Batch & Expiry Vision Engine</span>
          </div>
          <h2>AI Medicine Label & Expiry Date Scanner</h2>
          <p>
            Upload a photo of your medicine blister pack or bottle. The optical engine will automatically detect the batch number, calculate validity threshold, and check clinical donation eligibility.
          </p>

          <div className="scanner-steps-bar">
            <div className={`step-item ${activeStep >= 1 ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span>Upload / Select Photo</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className={`step-item ${activeStep >= 2 ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span>OCR Text Extraction</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className={`step-item ${activeStep >= 3 ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span>Safety Eligibility Report</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Scanner Area */}
        <div className="scanner-layout">
          {/* Left: Upload / Camera Zone */}
          <div className="scanner-upload-card">
            <h3>1. Provide Medicine Photo</h3>
            <p className="upload-subtitle">Upload a clear photo of the packaging foil showing the printed batch & expiry details.</p>

            <label className="upload-dropzone">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <div className="dropzone-content">
                <span className="upload-icon">📸</span>
                <strong>Click to Upload Image or Take Photo</strong>
                <span className="upload-types">Supports JPG, PNG, WEBP (Max 10MB)</span>
              </div>
            </label>

            {selectedImage && (
              <div className="uploaded-preview-box">
                <span className="preview-tag">Previewing Upload</span>
                <img src={selectedImage} alt="Uploaded medicine" className="uploaded-preview-img" />
              </div>
            )}

            <div className="sample-presets-section">
              <span className="presets-label">Or test with demo package samples:</span>
              <div className="presets-grid">
                {sampleMeds.map((s) => (
                  <button
                    key={s.id}
                    className={`preset-btn ${scanResult?.id === s.id ? 'selected' : ''}`}
                    onClick={() => handleSampleSelect(s)}
                  >
                    {s.thumbnailText}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI OCR Scan Results Card */}
          <div className="scanner-results-card">
            <h3>2. AI Extraction & Safety Report</h3>

            {isScanning && (
              <div className="scanning-loader-state">
                <div className="scanner-radar"></div>
                <h4>Scanning Medicine Packaging...</h4>
                <p>Analyzing barcode, manufacturing date, active formula, and expiration stamp.</p>
              </div>
            )}

            {!isScanning && !scanResult && (
              <div className="scanner-empty-state">
                <span className="empty-icon">🔬</span>
                <h4>Ready to Analyze</h4>
                <p>Upload a photo or select a demo sample on the left to extract package data in real time.</p>
              </div>
            )}

            {!isScanning && scanResult && (
              <div className="scan-report-container">
                {/* Status Verdict Header */}
                <div className={`verdict-banner ${scanResult.status.toLowerCase()}`}>
                  <div className="verdict-icon">
                    {scanResult.status === 'PASSED' && '✅'}
                    {scanResult.status === 'COLD_CHAIN_ALERT' && '❄️'}
                    {scanResult.status === 'REJECTED' && '❌'}
                  </div>
                  <div>
                    <h4 className="verdict-title">
                      {scanResult.status === 'PASSED' && 'APPROVED FOR DONATION'}
                      {scanResult.status === 'COLD_CHAIN_ALERT' && 'COLD-CHAIN VERIFICATION NEEDED'}
                      {scanResult.status === 'REJECTED' && 'REJECTED (EXPIRED / UNSEALED)'}
                    </h4>
                    <span className="verdict-subtitle">
                      {scanResult.status === 'PASSED' && `${scanResult.daysRemaining} days remaining before expiry (Passes ≥60-day rule).`}
                      {scanResult.status === 'COLD_CHAIN_ALERT' && 'Must be transported with insulated cold gel pack (2°C - 8°C).'}
                      {scanResult.status === 'REJECTED' && 'Expired medication cannot be redistributed for safety.'}
                    </span>
                  </div>
                </div>

                {/* Extracted Details Grid */}
                <div className="extracted-fields-grid">
                  <div className="field-card">
                    <span className="field-label">Detected Medicine</span>
                    <strong className="field-value">{scanResult.name}</strong>
                  </div>

                  <div className="field-card">
                    <span className="field-label">Category</span>
                    <strong className="field-value">{scanResult.category}</strong>
                  </div>

                  <div className="field-card">
                    <span className="field-label">Batch Number</span>
                    <strong className="field-value font-mono">{scanResult.batch}</strong>
                  </div>

                  <div className="field-card">
                    <span className="field-label">Expiry Date</span>
                    <strong className="field-value font-mono">{scanResult.expDate}</strong>
                  </div>

                  <div className="field-card">
                    <span className="field-label">Storage Standard</span>
                    <strong className="field-value">{scanResult.storage}</strong>
                  </div>

                  <div className="field-card">
                    <span className="field-label">Packaging Condition</span>
                    <strong className="field-value">{scanResult.condition}</strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="scan-report-actions">
                  {scanResult.status !== 'REJECTED' ? (
                    <button className="btn-proceed-donation" onClick={handleProceedToDonation}>
                      Proceed to Schedule Drop-off ➔
                    </button>
                  ) : (
                    <button className="btn-guidelines-check" onClick={() => navigate('/guidelines')}>
                      View Safe Disposal Guidelines ➔
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
