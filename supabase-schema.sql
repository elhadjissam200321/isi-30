-- Supabase Database Schema for Master ISI Website
-- Run this in the Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site Config Table
CREATE TABLE site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT NOT NULL,
    university_name TEXT NOT NULL,
    faculty_name TEXT NOT NULL,
    university_url TEXT NOT NULL,
    socials JSONB NOT NULL DEFAULT '{}',
    navigation JSONB NOT NULL DEFAULT '[]',
    footer JSONB NOT NULL DEFAULT '{}',
    custom_css TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage Table
CREATE TABLE homepage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero JSONB NOT NULL,
    stats JSONB NOT NULL DEFAULT '[]',
    pillars JSONB NOT NULL DEFAULT '[]',
    why_isi JSONB NOT NULL,
    coordinator JSONB NOT NULL,
    alumni_section JSONB NOT NULL,
    partners_section JSONB NOT NULL,
    pillars_section JSONB NOT NULL,
    news_section JSONB NOT NULL,
    cta_band JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles Table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    author TEXT,
    image TEXT,
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers Table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    role TEXT NOT NULL,
    speciality TEXT,
    color TEXT NOT NULL,
    photo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partners Table
CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programme Table
CREATE TABLE programme (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero JSONB NOT NULL,
    quick_info JSONB NOT NULL DEFAULT '[]',
    objectives JSONB NOT NULL DEFAULT '[]',
    career_outcomes JSONB NOT NULL DEFAULT '[]',
    semester_modules JSONB NOT NULL,
    s4_section JSONB NOT NULL,
    cta JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admission Table
CREATE TABLE admission (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero JSONB NOT NULL,
    requirements JSONB NOT NULL DEFAULT '[]',
    timeline JSONB NOT NULL DEFAULT '[]',
    documents JSONB NOT NULL DEFAULT '[]',
    cta JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alumni Table
CREATE TABLE alumni (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    quote TEXT,
    image TEXT,
    year TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alumni Companies Table
CREATE TABLE alumni_companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promotions Table
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year TEXT NOT NULL,
    name TEXT NOT NULL,
    students JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Table
CREATE TABLE contact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero JSONB NOT NULL,
    info JSONB NOT NULL,
    form JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_featured ON articles(featured);
CREATE INDEX idx_promotions_year ON promotions(year);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homepage_updated_at BEFORE UPDATE ON homepage
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programme_updated_at BEFORE UPDATE ON programme
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admission_updated_at BEFORE UPDATE ON admission
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_updated_at BEFORE UPDATE ON alumni
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_companies_updated_at BEFORE UPDATE ON alumni_companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON promotions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data (will be replaced with migration)
INSERT INTO site_config (site_name, university_name, faculty_name, university_url, socials, navigation, footer)
VALUES (
    'Master ISI',
    'Université Hassan II de Casablanca',
    'Faculté des Sciences Aïn Chock',
    'https://www.univh2c.ma/',
    '{"linkedin": "https://www.linkedin.com/company/master-isi-fsac/", "twitter": ""}',
    '[{"label": "Accueil", "href": "/"}, {"label": "Programme", "href": "/programme"}, {"label": "Promotions", "href": "/promotions"}, {"label": "Actualités", "href": "/actualites"}, {"label": "Enseignants", "href": "/enseignants"}, {"label": "Contact", "href": "/contact"}]',
    '{"usefulLinks": [], "masterLinks": [{"label": "Le programme ISI", "href": "/programme#modules"}, {"label": "Partenaires industriels", "href": "/#partners"}]}'
);
