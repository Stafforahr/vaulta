# Vaulta Supabase Setup Guide

This guide walks you through setting up Supabase for your Vaulta application.

## Prerequisites

1. A Supabase account (https://supabase.com)
2. Node.js installed (for npm)

---

## Step 1: Install Supabase CLI

```bash
# Using npm
npm install -g supabase

# Or using Homebrew (macOS)
brew install supabase/tap/supabase
```

Verify installation:
```bash
supabase --version
```

---

## Step 2: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details:
   - **Name**: `vaulta` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

---

## Step 3: Get Your Credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## Step 4: Create Environment File

Create a new file `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_RESEND_API_KEY=re_123456789
VITE_SITE_URL=http://localhost:5173
```

Replace the values with your actual credentials from Step 3.

---

## Step 5: Run the SQL Schema

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query**
3. Open the file: `supabase/schema.sql`
4. Copy all the contents
5. Paste into the SQL Editor
6. Click **Run**

### Option B: Using Supabase CLI

```bash
supabase db push
```

---

## Step 6: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## Step 7: Start Development Server

```bash
npm run dev
```

---

## Database Schema Overview

The schema creates these tables:

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (extends auth.users) |
| `digital_accounts` | User's digital accounts (social, email, banking) |
| `crypto_wallets` | Cryptocurrency wallet information |
| `documents` | Legal documents (wills, deeds, insurance) |
| `personal_messages` | Messages to beneficiaries |
| `beneficiaries` | People who will receive vault contents |
| `trigger_configs` | Inactivity/death trigger settings |
| `checkin_logs` | User check-in history |
| `activity_logs` | Audit trail of user actions |

---

## Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **UUID Primary Keys**: All tables use UUID for security
- **Auto Profile Creation**: New users get a profile automatically
- **Encrypted Fields**: Sensitive data marked for encryption

---

## Next Steps

After setup, you'll need to:

1. **Connect the frontend** to use the new services:
   - Update `AuthProvider.tsx` to use real Supabase auth
   - Update pages to fetch data from database

2. **Test authentication**:
   - Try signing up a new user
   - Check the dashboard shows real data

---

## Troubleshooting

### "relation auth.users does not exist"
Wait 2-3 minutes for the project to finish initializing, then try again.

### Authentication errors
Make sure your `.env.local` file is in the project root and contains valid credentials.

### TypeScript errors
Run `npm install` to ensure all dependencies are installed.

---

## Support

- Supabase Docs: https://supabase.com/docs
- Vaulta Docs: Add your documentation link here
</parameter>
</create_file>
