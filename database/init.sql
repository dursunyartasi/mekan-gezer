-- Mekan Gezer Database Initialization
-- PostgreSQL 15 + PostGIS

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For text search

-- Create schemas
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS grupo; -- Grupo Pro will use this

-- Set search path
SET search_path TO public, postgis;

-- Grant permissions
GRANT ALL ON SCHEMA public TO mekangezer_user;
GRANT ALL ON SCHEMA grupo TO mekangezer_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO mekangezer_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO mekangezer_user;
GRANT ALL ON ALL TABLES IN SCHEMA grupo TO mekangezer_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA grupo TO mekangezer_user;

-- Create custom types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'creator', 'moderator', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE venue_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_venues_status ON venues(status);
CREATE INDEX IF NOT EXISTS idx_venues_location ON venues USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_venues_search ON venues USING GIN(to_tsvector('turkish', name || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_events_search ON events USING GIN(to_tsvector('turkish', title || ' ' || COALESCE(description, '')));

-- Spatial indexes
CREATE INDEX IF NOT EXISTS idx_venues_geom ON venues USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_events_geom ON events USING GIST(location);

-- Insert success message
DO $$
BEGIN
    RAISE NOTICE 'Database initialized successfully!';
END $$;
