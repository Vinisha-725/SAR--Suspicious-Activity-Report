-- Add missing columns to reports table for full SAR functionality
-- Run this in your Supabase SQL Editor

-- Add customer name column if it doesn't exist
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS customer_name TEXT;

-- Add account number column if it doesn't exist  
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS account_number TEXT;

-- Add risk level column if it doesn't exist
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS risk_level TEXT DEFAULT 'Medium';

-- Add status column if it doesn't exist
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Under Investigation';

-- Add amount column if it doesn't exist
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS amount DECIMAL(15,2) DEFAULT 0;

-- Add updated_at column if it doesn't exist
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_risk_level ON reports(risk_level);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'reports' 
ORDER BY ordinal_position;
