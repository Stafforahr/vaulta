# Vaulta - Fixes TODO List

## Phase 1: Core Type Fixes
- [ ] 1. Fix AppProvider.tsx - Add user to AppContextType, fix camelCase vs snake_case
- [ ] 2. Fix AuthProvider.tsx - Remove unused imports
- [ ] 3. Fix routes.tsx - Add children prop, remove unused imports

## Phase 2: Import Path Fixes  
- [ ] 4. Fix Beneficiaries.tsx - import path to types
- [ ] 5. Fix VaultAccounts.tsx - import path to types
- [ ] 6. Fix VaultCrypto.tsx - import path to types
- [ ] 7. Fix VaultDocuments.tsx - import path to types
- [ ] 8. Fix VaultMessages.tsx - import path to types
- [ ] 9. Fix Dashboard.tsx - user import from correct provider
- [ ] 10. Fix Sidebar.tsx - user import from correct provider
- [ ] 11. Fix Settings.tsx - remove unused useApp import

## Phase 3: Property Name Fixes (snake_case to camelCase)
- [ ] 12. Fix TriggerSettings.tsx - inactivity_period -> inactivityPeriod etc.
- [ ] 13. Fix Dashboard.tsx - trigger config property names
- [ ] 14. Fix Landing.tsx - remove unused imports

## Phase 4: Additional Fixes
- [ ] 15. Fix ThemeProvider.tsx - remove unused React import
- [ ] 16. Fix ToastProvider.tsx - remove unused React import
- [ ] 17. Fix email.ts - remove unused variable

## Phase 5: Verify Build
- [ ] 18. Run build and verify all errors fixed

## Status: Starting Fixes

