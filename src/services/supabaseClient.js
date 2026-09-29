import { createClient } from '@supabase/supabase-js';

// Supabase Credentials & Environment Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzmedicationdonation.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch categorized donation centers with operating timings and guidelines
 */
export async function getDonationCenters() {
  const { data, error } = await supabase
    .from('donation_centers')
    .select(`
      id,
      center_name,
      license_number,
      location,
      latitude,
      longitude,
      contact_phone,
      contact_email,
      operating_hours,
      emergency_intake_available,
      status
    `)
    .eq('status', 'active');

  if (error) {
    console.warn('Falling back to local center registry:', error.message);
    return getLocalFallbackCenters();
  }
  return data;
}

/**
 * Fetch Category-based Donation Guidelines
 */
export async function getCategoryGuidelines() {
  const { data, error } = await supabase
    .from('category_guidelines')
    .select(`
      id,
      guideline_title,
      acceptance_rules,
      prohibited_items,
      packaging_requirements,
      temperature_control_needed,
      verification_standard,
      medicine_categories (
        category_name,
        description,
        storage_condition,
        requires_prescription
      )
    `);

  if (error) {
    console.warn('Falling back to local guidelines registry:', error.message);
    return getLocalFallbackGuidelines();
  }
  return data;
}

/**
 * Fallback dataset ensuring offline demo functionality
 */
function getLocalFallbackCenters() {
  return [
    {
      id: 'c101-alpha',
      center_name: 'Metro Care Community Pharmacy & Donation Bank',
      license_number: 'MDC-89214-TS',
      location: '12-4/A Jubilee Hills Main Rd, Hyderabad',
      contact_phone: '+91 98480 12345',
      contact_email: 'jubilee@metrocaremed.org',
      operating_hours: {
        monday: '09:00 AM - 08:00 PM',
        tuesday: '09:00 AM - 08:00 PM',
        wednesday: '09:00 AM - 08:00 PM',
        thursday: '09:00 AM - 08:00 PM',
        friday: '09:00 AM - 08:00 PM',
        saturday: '10:00 AM - 05:00 PM',
        sunday: '10:00 AM - 02:00 PM (Emergency Drop-off)'
      },
      emergency_intake_available: true,
      status: 'active'
    },
    {
      id: 'c102-beta',
      center_name: 'Hope NGO Central Medicine Donation Center',
      license_number: 'NGO-44120-HYD',
      location: 'Plot 45, Hitec City Road, Madhapur, Hyderabad',
      contact_phone: '+91 99890 54321',
      contact_email: 'contact@hopemedicinebank.org',
      operating_hours: {
        monday: '08:30 AM - 07:00 PM',
        tuesday: '08:30 AM - 07:00 PM',
        wednesday: '08:30 AM - 07:00 PM',
        thursday: '08:30 AM - 07:00 PM',
        friday: '08:30 AM - 07:00 PM',
        saturday: '09:00 AM - 04:00 PM',
        sunday: 'Closed'
      },
      emergency_intake_available: false,
      status: 'active'
    },
    {
      id: 'c103-gamma',
      center_name: 'Seva Trust Red Cross Medicine Bank',
      license_number: 'RC-10982-SEC',
      location: 'Red Cross Bhavan, MG Road, Secunderabad',
      contact_phone: '+91 94401 67890',
      contact_email: 'info@redcrossmedseva.org',
      operating_hours: {
        monday: '09:00 AM - 06:00 PM',
        tuesday: '09:00 AM - 06:00 PM',
        wednesday: '09:00 AM - 06:00 PM',
        thursday: '09:00 AM - 06:00 PM',
        friday: '09:00 AM - 06:00 PM',
        saturday: '09:00 AM - 02:00 PM',
        sunday: 'Closed'
      },
      emergency_intake_available: true,
      status: 'active'
    }
  ];
}

function getLocalFallbackGuidelines() {
  return [
    {
      id: 'g-01',
      category_name: 'Prescription Antibiotics & Anti-Infectives',
      guideline_title: 'Unopened Blister Pack & Cold Chain Validation',
      acceptance_rules: [
        'Must have at least 90 days validity before expiry date',
        'Original manufacturer blister or strip pack with visible batch and expiry',
        'No cut or loose unsealed foil packets'
      ],
      prohibited_items: ['Opened oral suspensions/syrups', 'Discolored tablets'],
      packaging_requirements: 'Original outer carton with intact tamper-evident seal',
      storage_condition: 'Cool & Dry (Below 25°C)'
    },
    {
      id: 'g-02',
      category_name: 'Chronic Care & Cardiac / Diabetes Meds',
      guideline_title: 'Continuous Supply & Integrity Protocol',
      acceptance_rules: [
        'Minimum 60 days before expiry',
        'Insulin vials/pens must be stored refrigerated (2°C - 8°C) with cold log verification',
        'Sealed strip/foil packaging for tablets'
      ],
      prohibited_items: ['Unrefrigerated insulin', 'Punctured or broken vials'],
      packaging_requirements: 'Insulated packaging with cooling gel packs for refrigerated meds',
      storage_condition: 'Refrigerated (2°C - 8°C) for Biologics'
    },
    {
      id: 'g-03',
      category_name: 'Over-The-Counter (OTC) & Pain Relief',
      guideline_title: 'General Public Safety Acceptance Standard',
      acceptance_rules: [
        'Minimum 30 days before expiry',
        'Intact factory seal and clear dosage instructions'
      ],
      prohibited_items: ['Expired painkillers', 'Compounded syrups without labels'],
      packaging_requirements: 'Original packaging with legible labeling',
      storage_condition: 'Room Temperature (15°C - 25°C)'
    }
  ];
}
