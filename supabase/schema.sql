-- =============================================================================
-- Medicine Donation Center Locator – Category-Based Guidelines & Timings
-- Supabase / PostgreSQL Schema with Data Integrity Constraints & Automation
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Medicine Categories Table
CREATE TABLE IF NOT EXISTS medicine_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    storage_condition VARCHAR(100) DEFAULT 'Room Temperature (15°C - 25°C)',
    requires_prescription BOOLEAN DEFAULT FALSE,
    min_shelf_life_days INT DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Category-Based Donation Guidelines
CREATE TABLE IF NOT EXISTS category_guidelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES medicine_categories(id) ON DELETE CASCADE,
    guideline_title VARCHAR(150) NOT NULL,
    acceptance_rules TEXT[] NOT NULL,
    prohibited_items TEXT[] NOT NULL,
    packaging_requirements TEXT NOT NULL,
    temperature_control_needed BOOLEAN DEFAULT FALSE,
    verification_standard VARCHAR(150) DEFAULT 'WHO / FDA Donation Quality Guidelines',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Donation Centers with Detailed Operating Timings
CREATE TABLE IF NOT EXISTS donation_centers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    center_name VARCHAR(150) NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    operating_hours JSONB NOT NULL DEFAULT '{"monday": "09:00-18:00", "tuesday": "09:00-18:00", "wednesday": "09:00-18:00", "thursday": "09:00-18:00", "friday": "09:00-18:00", "saturday": "10:00-16:00", "sunday": "Closed"}'::jsonb,
    emergency_intake_available BOOLEAN DEFAULT FALSE,
    accepted_categories UUID[] DEFAULT '{}',
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'maintenance')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. User Profiles (Donors, Recipients, Center Admins)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    user_type VARCHAR(20) CHECK (user_type IN ('donor', 'recipient', 'center_admin', 'volunteer')) NOT NULL,
    assigned_center_id UUID REFERENCES donation_centers(id) ON DELETE SET NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Donations (Donated Medicines Inventory)
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    center_id UUID REFERENCES donation_centers(id) ON DELETE SET NULL,
    category_id UUID REFERENCES medicine_categories(id) ON DELETE RESTRICT,
    medicine_name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    batch_number VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit VARCHAR(50) DEFAULT 'units',
    manufacturing_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    seal_intact BOOLEAN NOT NULL DEFAULT TRUE,
    verification_status VARCHAR(30) CHECK (verification_status IN ('pending_inspection', 'verified', 'rejected', 'allocated', 'dispensed')) DEFAULT 'pending_inspection',
    storage_temp_verified BOOLEAN DEFAULT TRUE,
    donated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT valid_expiry CHECK (expiry_date > CURRENT_DATE + INTERVAL '30 days')
);

-- 6. Recipient Requests
CREATE TABLE IF NOT EXISTS medicine_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES medicine_categories(id) ON DELETE RESTRICT,
    medicine_name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    quantity_required INT NOT NULL CHECK (quantity_required > 0),
    urgency_level VARCHAR(20) CHECK (urgency_level IN ('critical', 'high', 'moderate', 'routine')) DEFAULT 'moderate',
    prescription_doc_url TEXT,
    fulfillment_status VARCHAR(30) CHECK (fulfillment_status IN ('open', 'matching', 'partially_matched', 'fulfilled', 'cancelled')) DEFAULT 'open',
    preferred_center_id UUID REFERENCES donation_centers(id) ON DELETE SET NULL,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Matching Records (Automated Donor-Recipient Match with Accuracy Scoring)
CREATE TABLE IF NOT EXISTS matching_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES medicine_requests(id) ON DELETE CASCADE,
    donation_id UUID REFERENCES donations(id) ON DELETE CASCADE,
    center_id UUID REFERENCES donation_centers(id) ON DELETE SET NULL,
    matched_quantity INT NOT NULL CHECK (matched_quantity > 0),
    match_accuracy_score DECIMAL(5, 2) CHECK (match_accuracy_score >= 0 AND match_accuracy_score <= 100.00),
    matching_algorithm_version VARCHAR(20) DEFAULT 'v2.4-hybrid',
    status VARCHAR(30) CHECK (status IN ('proposed', 'confirmed_by_pharmacist', 'dispatched', 'received')) DEFAULT 'proposed',
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- Triggers & Data Integrity Automation
-- =============================================================================

-- Auto-reject expired medicines during insert or update
CREATE OR REPLACE FUNCTION check_medicine_integrity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN
        RAISE EXCEPTION 'Medicine rejected: Expiry date must be at least 30 days in the future for safety compliance.';
    END IF;
    IF NEW.seal_intact = FALSE THEN
        NEW.verification_status := 'rejected';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_verify_donation_integrity
BEFORE INSERT OR UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION check_medicine_integrity();
