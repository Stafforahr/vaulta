# Vaulta Beta Preparation - Step-by-Step Action Plan

**Priority: Fix critical issues first → Test → Deploy**

## 🚀 STEP 1: Create .env.example & Local Setup (5 mins)
```
create .env.example with:
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RESEND_API_KEY= (optional)

cp .env.example .env.local  # Fill with your Supabase keys
npm install
npm run dev
```
**Test**: Visit localhost:5173 → Signup/Login works?

## 🛠 STEP 2: Fix Imports in Vault Pages (15 mins)
**Files to check/fix** (import `useAuth` for user, `useApp` for data):
- `src/pages/Beneficiaries.tsx`
- `src/pages/VaultAccounts.tsx`
- `src/pages/VaultCrypto.tsx`
- `src/pages/VaultDocuments.tsx`
- `src/pages/VaultMessages.tsx`
- `src/pages/Settings.tsx`

**Pattern**:
```tsx
import { useApp } from '../app/providers/AppProvider';
import { useAuth } from '../app/providers/AuthProvider';
// ...
const { user } = useAuth();  // Auth state
const { accounts } = useApp();  // Vault data
```

## 🔧 STEP 3: Fix Property Names (camelCase) (10 mins)
**DB → Frontend mapping**:
```
inactivity_period → inactivityPeriod
file_url → fileUrl
avatar_initials → avatarInitials
vault_health → vaultHealth
```
**Files**: `src/pages/TriggerSettings.tsx`, Dashboard.tsx, vault pages.

## ✅ STEP 4: Verify Build & Test (10 mins)
```
npm run build  # No errors?
npm run lint   # Fix issues
```
**Manual Tests**:
1. Signup new user → Profile auto-created?
2. Add digital account → Shows in Dashboard?
3. Logout/Login → Data persists?
4. Check Supabase dashboard → RLS blocks other users?

## 🚀 STEP 5: Deploy Preview (2 mins)
```
npm i -g vercel  # If needed
vercel  # Preview URL
```
**Add env vars in Vercel dashboard**.

## 📋 Progress Tracker
- [ ] Step 1: Setup
- [ ] Step 2: Imports
- [ ] Step 3: Properties
- [ ] Step 4: Tests/Build
- [ ] Step 5: Deploy

**Start with Step 1** - setup ensures real data flow. Ping me after Step 1 for next guidance or `npm run dev` output.
