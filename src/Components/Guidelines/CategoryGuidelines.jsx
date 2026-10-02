import React, { useState } from 'react';
import './CategoryGuidelines.css';

const defaultGuidelines = [
  {
    id: 'g-01',
    category_name: 'Prescription Antibiotics & Anti-Infectives',
    category_key: 'Antibiotics',
    icon: '💊',
    guideline_title: 'Unopened Blister Pack & Cold Chain Validation',
    storage_condition: 'Cool & Dry (Below 25°C)',
    expiry_threshold: 'Minimum 90 days validity before expiry',
    requires_prescription: true,
    acceptance_rules: [
      'Must have at least 90 days remaining before the official expiry date',
      'Must be in original manufacturer blister or strip pack with intact foil seal',
      'Batch number and expiry date must be clearly printed and legible on each strip',
      'Original outer manufacturer carton included whenever possible'
    ],
    prohibited_items: [
      'Opened oral liquid suspensions or reconstituted dry syrups',
      'Cut, trimmed, or loose individual unsealed foil tablets',
      'Discolored, damaged, or moisture-exposed tablets/capsules'
    ],
    packaging_requirements: 'Original outer carton with intact tamper-evident seal and batch documentation.'
  },
  {
    id: 'g-02',
    category_name: 'Chronic Care & Cardiac / Blood Pressure',
    category_key: 'Cardiac',
    icon: '❤️',
    guideline_title: 'Continuous Supply & High-Integrity Cardiac Protocol',
    storage_condition: 'Room Temp (15°C - 25°C)',
    expiry_threshold: 'Minimum 60 days validity before expiry',
    requires_prescription: true,
    acceptance_rules: [
      'Must have a minimum of 60 days validity before expiration',
      'Full, untampered blister strips (e.g. Amlodipine, Telmisartan, Atorvastatin)',
      'Sublingual Nitroglycerin tablets must be in their original, sealed, airtight amber glass container',
      'Clear strength and generic formula labeling'
    ],
    prohibited_items: [
      'Loose tablets stored in non-original daily pill organizers or plastic pouches',
      'Medications exposed to excessive heat, sunlight, or humidity',
      'Compounded or custom pharmacy mixtures without laboratory batch test labels'
    ],
    packaging_requirements: 'Original manufacturer packaging with moisture desiccant pack intact.'
  },
  {
    id: 'g-03',
    category_name: 'Diabetes Care & Insulin (Cold-Chain Biologics)',
    category_key: 'Diabetes',
    icon: '❄️',
    guideline_title: 'Strict Temperature-Controlled Cold-Chain Verification',
    storage_condition: 'Refrigerated (2°C - 8°C)',
    expiry_threshold: 'Minimum 45 days validity before expiry',
    requires_prescription: true,
    acceptance_rules: [
      'Unopened insulin vials, cartridges, and pre-filled disposable pens',
      'Must have continuous cold-chain log or temperature indicator strip verified upon intake',
      'Packaged in insulated thermal carrier with frozen gel ice-packs during transit',
      'Clear solution with no crystallization, precipitation, or clumping'
    ],
    prohibited_items: [
      'Previously punctured insulin vials or used injection pen needles',
      'Insulin that has ever been frozen or exposed to direct heat > 30°C',
      'Opened blood glucose test strip canisters (moisture-sensitive)'
    ],
    packaging_requirements: 'Insulated cooler box with minimum 2 refrigerated gel ice packs.'
  },
  {
    id: 'g-04',
    category_name: 'Respiratory Inhalers & Nebulizer Solutions',
    category_key: 'Respiratory',
    icon: '🫁',
    guideline_title: 'Dose Counter & Tamper-Evident Mouthpiece Protocol',
    storage_condition: 'Room Temp (15°C - 25°C)',
    expiry_threshold: 'Minimum 60 days validity before expiry',
    requires_prescription: true,
    acceptance_rules: [
      'Unopened, factory-sealed Metered Dose Inhalers (MDI) with original foil wrap',
      'Built-in mechanical dose counter must show 100% full capacity (zero puffs used)',
      'Unopened sterile Nebulizer Respules / ampoules in sealed foil overwrap',
      'Protective mouthpiece cap firmly seated'
    ],
    prohibited_items: [
      'Used or partially discharged inhalers (severe infection risk)',
      'Opened respule strips or broken plastic ampoules',
      'Dry powder inhalers without intact outer protective seal'
    ],
    packaging_requirements: 'Original foil overwrap with unpunctured seal.'
  },
  {
    id: 'g-05',
    category_name: 'Over-The-Counter (OTC) & Pain Relief / First-Aid',
    category_key: 'OTC',
    icon: '🩹',
    guideline_title: 'General Public Safety Acceptance Standard',
    storage_condition: 'Room Temp (15°C - 25°C)',
    expiry_threshold: 'Minimum 30 days validity before expiry',
    requires_prescription: false,
    acceptance_rules: [
      'Minimum 30 days before expiration date',
      'Intact factory tamper-evident safety seal on bottles or blister packs',
      'Unopened antiseptic ointments and creams with sealed puncture caps',
      'Clear dosage, usage instructions, and ingredient list in English/regional language'
    ],
    prohibited_items: [
      'Opened analgesic syrups, drops, or liquids',
      'Partially squeezed ointment or gel tubes',
      'Unlabeled or generic loose generic tablets'
    ],
    packaging_requirements: 'Original retail packaging with clear manufacturer branding.'
  },
  {
    id: 'g-06',
    category_name: 'Pediatric Care & Oral Electrolytes',
    category_key: 'Pediatric',
    icon: '👶',
    guideline_title: 'Sterility & Child-Proof Container Validation',
    storage_condition: 'Cool & Dry (Below 25°C)',
    expiry_threshold: 'Minimum 90 days validity before expiry',
    requires_prescription: false,
    acceptance_rules: [
      'Unopened dry powder oral rehydration salts (ORS) sachets with no punctures',
      'Unopened, un-reconstituted dry syrup powders with intact child-resistant safety caps',
      'Factory-sealed infant drops with enclosed sterile calibrated dropper pipette',
      'Clear age-appropriate dosage chart visible on outer packaging'
    ],
    prohibited_items: [
      'Any pediatric liquid or syrup that has already had water added to it',
      'Torn ORS or electrolyte electrolyte sachets',
      'Missing measurement droppers or damaged dosing cups'
    ],
    packaging_requirements: 'Unopened factory container with child-resistant safety cap intact.'
  }
];

export default function CategoryGuidelines() {
  const [guidelines] = useState(defaultGuidelines);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Antibiotics',
    'Cardiac',
    'Diabetes',
    'Respiratory',
    'OTC',
    'Pediatric'
  ];

  const filtered = guidelines.filter(g => {
    const matchesCategory = selectedCategory === 'All' || g.category_key === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      g.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.guideline_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.acceptance_rules.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="guidelines-page-wrapper">
      <div className="guidelines-container">
        {/* Header section */}
        <div className="guidelines-hero-card">
          <div className="guidelines-badge">
            <span>🛡️ Clinical Donation Standard</span>
            <span className="dot">•</span>
            <span>WHO & FDA Compliant</span>
          </div>
          <h2>Category-Based Medication Donation Guidelines</h2>
          <p>
            To guarantee absolute patient safety, all donated medicines undergo strict verification before redistribution. Review acceptance criteria, storage protocols, and prohibited items below.
          </p>

          <div className="guidelines-stat-row">
            <div className="g-stat-item">
              <span className="g-stat-icon">🧪</span>
              <div>
                <strong>100% Verified</strong>
                <span>Clinical Intake Standards</span>
              </div>
            </div>
            <div className="g-stat-item">
              <span className="g-stat-icon">❄️</span>
              <div>
                <strong>Cold-Chain Monitored</strong>
                <span>2°C - 8°C Strict Log</span>
              </div>
            </div>
            <div className="g-stat-item">
              <span className="g-stat-icon">🚫</span>
              <div>
                <strong>Zero Contamination</strong>
                <span>Unsealed Meds Rejected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="guidelines-toolbar">
          <div className="guidelines-search">
            <span className="g-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search guidelines by medicine name, storage condition, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="g-clear-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          <div className="category-filter-chips">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="guidelines-grid">
          {filtered.length === 0 ? (
            <div className="no-guidelines-found">
              <span className="no-g-icon">📑</span>
              <h3>No Guidelines Found</h3>
              <p>Try searching for another keyword or selecting "All" categories.</p>
              <button className="reset-g-btn" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            filtered.map((g) => (
              <div key={g.id} className="guideline-card">
                <div className="guideline-card-header">
                  <div className="g-cat-title-group">
                    <span className="g-icon-circle">{g.icon}</span>
                    <div>
                      <span className="category-pill">{g.category_name}</span>
                      <span className="expiry-tag">⏳ {g.expiry_threshold}</span>
                    </div>
                  </div>
                  <span className="storage-condition">🌡️ {g.storage_condition}</span>
                </div>

                <h3 className="guideline-title">{g.guideline_title}</h3>

                <div className="rules-section">
                  <h4>✅ Acceptance Criteria</h4>
                  <ul>
                    {g.acceptance_rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div className="prohibited-section">
                  <h4>❌ Prohibited & Rejected Items</h4>
                  <ul>
                    {g.prohibited_items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="packaging-note">
                  <strong>📦 Packaging Protocol:</strong> {g.packaging_requirements}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
