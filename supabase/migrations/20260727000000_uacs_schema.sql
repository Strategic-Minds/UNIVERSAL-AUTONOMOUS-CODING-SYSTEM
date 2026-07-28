-- UACS v1.0 — Universal Autonomous Coding System
-- Database Schema
-- Supabase Project: prhppuuwcnmfdhwsagug
-- Run at: https://supabase.com/dashboard/project/prhppuuwcnmfdhwsagug/editor

CREATE TABLE IF NOT EXISTS uacs_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  business_goal TEXT,
  target_user TEXT,
  reference_url TEXT,
  priority TEXT NOT NULL DEFAULT 'P3',
  status TEXT NOT NULL DEFAULT 'idea',
  template_id TEXT,
  notes TEXT,
  mockup_urls JSONB DEFAULT '[]',
  repo_url TEXT,
  vercel_url TEXT,
  preview_url TEXT,
  drive_folder_url TEXT,
  github_repo_name TEXT,
  vercel_project_id TEXT,
  qa_score INTEGER,
  faang_passed BOOLEAN DEFAULT FALSE,
  visual_parity_pct INTEGER,
  assigned_agent TEXT DEFAULT 'apex',
  submitted_by TEXT DEFAULT 'jeremy',
  deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS uacs_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID,
  project_name TEXT NOT NULL,
  phase TEXT NOT NULL,
  agent TEXT NOT NULL DEFAULT 'apex',
  status TEXT NOT NULL DEFAULT 'queued',
  priority TEXT DEFAULT 'P3',
  queued_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  eta_minutes INTEGER,
  notes TEXT,
  error_message TEXT,
  auto_heal_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS uacs_build_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID,
  phase TEXT NOT NULL,
  agent TEXT NOT NULL,
  action TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'started',
  details JSONB DEFAULT '{}',
  files_changed JSONB DEFAULT '[]',
  github_commit TEXT,
  vercel_deploy_id TEXT,
  score INTEGER,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS uacs_qa_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID,
  preview_url TEXT,
  pass1_code_quality INTEGER DEFAULT 0,
  pass2_visual_parity INTEGER DEFAULT 0,
  pass3_functional INTEGER DEFAULT 0,
  pass4_performance INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  ship_it BOOLEAN DEFAULT FALSE,
  issues JSONB DEFAULT '[]',
  screenshot_urls JSONB DEFAULT '[]',
  iteration INTEGER DEFAULT 1,
  tested_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS uacs_brand_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID,
  option_label TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#f8b800',
  secondary_color TEXT DEFAULT '#000000',
  font_primary TEXT DEFAULT 'Inter',
  brand_voice TEXT,
  mockup_urls JSONB DEFAULT '[]',
  approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS uacs_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  routes JSONB DEFAULT '[]',
  reuse_pct INTEGER DEFAULT 70,
  use_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS uacs_agent_status (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'online',
  current_task TEXT,
  tasks_completed INTEGER DEFAULT 0,
  tasks_failed INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  config JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS uacs_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID,
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  message TEXT NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO uacs_templates (id, name, type, description, reuse_pct) VALUES
  ('city-site', 'City Epoxy Site', 'city-site', 'Local service landing page for epoxy/flooring.', 80),
  ('saas-dashboard', 'SaaS Dashboard', 'saas-dashboard', 'Enterprise SaaS. Black sidebar, gold CTAs.', 70),
  ('crm-dashboard', 'CRM Dashboard', 'crm-dashboard', 'Lead pipeline, activity log, outreach queue.', 65),
  ('landing-page', 'Marketing Landing', 'landing-page', 'Hero, features, testimonials, pricing, FAQ.', 75),
  ('ai-tool', 'AI Tool Interface', 'ai-tool', 'Chat interface, history, settings.', 60)
ON CONFLICT (id) DO NOTHING;

INSERT INTO uacs_agent_status (id, status, tasks_completed) VALUES
  ('apex', 'online', 47), ('chatgpt', 'online', 12), ('browserworker', 'online', 31)
ON CONFLICT (id) DO UPDATE SET status='online', last_active=NOW();

INSERT INTO uacs_projects (name, description, business_goal, priority, status, github_repo_name, preview_url, notes)
VALUES ('Xtreme Takeoff', 'AI Estimator for epoxy/polished concrete. 10 routes.', 'revenue', 'P1', 'build',
  'XTREME-TAKEOFFS', 'https://xtreme-takeoffs-bkeg7bdd0-strategic-minds-advisory.vercel.app',
  'First UACS project. Phase 3 BUILD in progress.');
