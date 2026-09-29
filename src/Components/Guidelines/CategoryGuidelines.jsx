import React, { useState, useEffect } from 'react';
import { getCategoryGuidelines } from '../../services/supabaseClient';
import './CategoryGuidelines.css';

export default function CategoryGuidelines() {
  const [guidelines, setGuidelines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function load() {
      const data = await getCategoryGuidelines();
      setGuidelines(data);
    }
    load();
  }, []);

  const categories = ['All', 'Prescription Antibiotics', 'Chronic Care & Cardiac', 'Over-The-Counter (OTC)'];

  const filtered = selectedCategory === 'All' 
    ? guidelines 
    : guidelines.filter(g => (g.category_name || '').toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5)));

  return (
    <div className="guidelines-container">
      <div className="guidelines-header">
        <h2>Category-Based Medication Donation Guidelines</h2>
        <p>Ensure patient safety and compliance with WHO & FDA donation acceptance standards.</p>
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

      <div className="guidelines-grid">
        {filtered.map((g) => (
          <div key={g.id} className="guideline-card">
            <div className="guideline-card-header">
              <span className="category-pill">{g.category_name}</span>
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
              <h4>❌ Prohibited Items</h4>
              <ul>
                {g.prohibited_items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="packaging-note">
              <strong>📦 Packaging & Seal:</strong> {g.packaging_requirements}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
