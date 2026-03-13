# Vaulta - Digital Legacy Vault

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://vitejs.dev/guide/)

## 🚀 Quick Start (Beta Ready)

### 1. Clone & Install
```bash
git clone <repo>
cd Webappvaulta-main
npm install
```

### 2. Supabase Setup
1. Create free Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.example` → `.env.local` & add your keys
3. Run `supabase/schema.sql` in SQL Editor

### 3. Development
```bash
npm run dev
```
Open [localhost:5173](http://localhost:5173)

### 4. Build & Deploy
```bash
npm run build  # ✅ Passes
```
Deploy `dist/` to Vercel/Netlify.

## 🧪 Beta Testing Checklist
- [ ] Signup/Login/Logout (Supabase Auth)
- [ ] CRUD Digital Accounts/Crypto/Documents/Messages/Beneficiaries
- [ ] Trigger Settings configuration
- [ ] Protected routes (loaders)
- [ ] RLS policies (Supabase dashboard)
- [ ] Mobile responsive (shadcn/ui)

## 📊 Status
- ✅ 100% Frontend Complete
- ✅ Supabase Integrated (Auth + Data)
- ✅ Build Passes
- 🔄 Beta Ready - Test End-to-End

See [TODO.md](TODO.md) for details.
