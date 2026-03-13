-- =====================================================
-- VAULTA DATABASE SCHEMA
-- Supabase SQL for Vaulta Digital Vault Application
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add last_checkin to profiles (referenced in record_checkin function)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_checkin TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_profiles_last_checkin ON public.profiles(last_checkin);

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_plan AS ENUM ('free', 'premium', 'enterprise');
CREATE TYPE account_category AS ENUM ('social', 'email', 'banking', 'streaming', 'work', 'other');
CREATE TYPE document_type AS ENUM ('will', 'deed', 'insurance', 'bank', 'identity', 'other');
CREATE TYPE message_type AS ENUM ('video', 'text', 'audio');
CREATE TYPE delivery_condition AS ENUM ('death', 'inactivity', 'specific_date');
CREATE TYPE beneficiary_role AS ENUM ('heir', 'trusted_contact', 'executor');
CREATE TYPE beneficiary_status AS ENUM ('verified', 'pending', 'invited');

-- =====================================================
-- PROFILES (extends Supabase auth.users)
-- =====================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  plan user_plan DEFAULT 'free',
  avatar_initials TEXT,
  location TEXT,
  vault_health INTEGER DEFAULT 0,
  last_checkin TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_profiles_id ON public.profiles(id);
CREATE INDEX idx_profiles_plan ON public.profiles(plan);

-- =====================================================
-- TRIGGER: Auto-create profile on user signup
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    phone,
    plan,
    avatar_initials,
    location,
    vault_health
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'phone',
    'free',
    COALESCE(
      (NEW.raw_user_meta_data->>'name')::TEXT,
      SUBSTRING(NEW.email FROM 1 FOR 2)
    )::TEXT,
    NEW.raw_user_meta_data->>'location',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- DIGITAL ACCOUNTS
-- =====================================================

CREATE TABLE public.digital_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  username TEXT,
  email TEXT,
  category account_category DEFAULT 'other',
  notes TEXT,
  encrypted BOOLEAN DEFAULT true,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_digital_accounts_user ON public.digital_accounts(user_id);
CREATE INDEX idx_digital_accounts_category ON public.digital_accounts(category);

-- =====================================================
-- CRYPTO WALLETS
-- =====================================================

CREATE TABLE public.crypto_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  seed_phrase_encrypted TEXT,
  estimated_value TEXT,
  network TEXT,
  encrypted BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crypto_wallets_user ON public.crypto_wallets(user_id);

-- =====================================================
-- DOCUMENTS
-- =====================================================

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type document_type DEFAULT 'other',
  description TEXT,
  file_size TEXT,
  file_type TEXT,
  file_url TEXT,
  encrypted BOOLEAN DEFAULT true,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_user ON public.documents(user_id);
CREATE INDEX idx_documents_type ON public.documents(type);

-- =====================================================
-- PERSONAL MESSAGES
-- =====================================================

CREATE TABLE public.personal_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  recipient TEXT NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  type message_type DEFAULT 'text',
  delivery_condition delivery_condition DEFAULT 'death',
  delivery_date TIMESTAMPTZ,
  encrypted BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_personal_messages_user ON public.personal_messages(user_id);

-- =====================================================
-- BENEFICIARIES
-- =====================================================

CREATE TABLE public.beneficiaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role beneficiary_role DEFAULT 'heir',
  status beneficiary_status DEFAULT 'invited',
  assets JSONB DEFAULT '[]',
  added_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_beneficiaries_user ON public.beneficiaries(user_id);
CREATE INDEX idx_beneficiaries_status ON public.beneficiaries(status);

-- =====================================================
-- TRIGGER CONFIGURATION
-- =====================================================

CREATE TABLE public.trigger_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  inactivity_period INTEGER DEFAULT 90,
  check_in_frequency INTEGER DEFAULT 30,
  verification_rule TEXT DEFAULT '2of3',
  require_death_certificate BOOLEAN DEFAULT true,
  grace_period INTEGER DEFAULT 14,
  notify_beneficiaries BOOLEAN DEFAULT true,
  auto_release BOOLEAN DEFAULT false,
  trusted_contact_alerts BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trigger_configs_user ON public.trigger_configs(user_id);

-- =====================================================
-- CHECK-IN LOG
-- =====================================================

CREATE TABLE public.checkin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_checkin_logs_user ON public.checkin_logs(user_id);

-- =====================================================
-- ACTIVITY LOG
-- =====================================================

CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON public.activity_logs(created_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crypto_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trigger_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only view/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Digital Accounts: Users can only access their own accounts
CREATE POLICY "Users can manage own digital accounts" ON public.digital_accounts
  FOR ALL USING (auth.uid() = user_id);

-- Crypto Wallets: Users can only access their own wallets
CREATE POLICY "Users can manage own crypto wallets" ON public.crypto_wallets
  FOR ALL USING (auth.uid() = user_id);

-- Documents: Users can only access their own documents
CREATE POLICY "Users can manage own documents" ON public.documents
  FOR ALL USING (auth.uid() = user_id);

-- Messages: Users can only access their own messages
CREATE POLICY "Users can manage own messages" ON public.personal_messages
  FOR ALL USING (auth.uid() = user_id);

-- Beneficiaries: Users can only access their own beneficiaries
CREATE POLICY "Users can manage own beneficiaries" ON public.beneficiaries
  FOR ALL USING (auth.uid() = user_id);

-- Trigger Config: Users can only access their own config
CREATE POLICY "Users can manage own trigger config" ON public.trigger_configs
  FOR ALL USING (auth.uid() = user_id);

-- Check-in Logs: Users can only access their own logs
CREATE POLICY "Users can manage own checkin logs" ON public.checkin_logs
  FOR ALL USING (auth.uid() = user_id);

-- Activity Logs: Users can only access their own activity
CREATE POLICY "Users can view own activity logs" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get or create trigger config for user
CREATE OR REPLACE FUNCTION public.get_or_create_trigger_config(user_uuid UUID)
RETURNS UUID AS $$
DECLARE
  config_id UUID;
BEGIN
  INSERT INTO public.trigger_configs (user_id)
    VALUES (user_uuid)
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id INTO config_id;
  
  RETURN COALESCE(config_id, (SELECT id FROM public.trigger_configs WHERE user_id = user_uuid));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log activity
CREATE OR REPLACE FUNCTION public.log_activity(
  user_uuid UUID,
  action_text TEXT,
  details_json JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (user_uuid, action_text, details_json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record check-in
CREATE OR REPLACE FUNCTION public.record_checkin(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.checkin_logs (user_id) VALUES (user_uuid);
  
  -- Update vault health (simple calculation)
  UPDATE public.profiles 
  SET vault_health = LEAST(100, vault_health + 10),
      last_checkin = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SEED DATA (Optional - for testing)
-- =====================================================

-- NOTE: Seed data should be inserted via the app after authentication
-- This is just for reference of the data structure
