-- Run this in your Supabase SQL Editor

-- 1. Create the items table
CREATE TABLE items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    color TEXT,
    location TEXT,
    type TEXT NOT NULL, -- 'Lost' or 'Found'
    user_id UUID REFERENCES auth.users(id)
);

-- 2. Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow anyone to read items
CREATE POLICY "Allow public read access" ON items
FOR SELECT USING (true);

-- Allow authenticated users to insert items
CREATE POLICY "Allow authenticated insert" ON items
FOR INSERT WITH CHECK (auth.uid() = user_id);
