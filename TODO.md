# Vaulta Restructuring TODO

## Phase 1 - Critical Fixes (Completed)
- [x] Fix React dependencies in package.json (moved from peerDependencies to dependencies)
- [x] Create tsconfig.json for proper TypeScript configuration
- [x] Remove duplicate AppContext from src/app/context/
- [x] Fix import paths in all pages (changed from ../context/AppContext to ../providers/AppProvider)
- [x] Update layout components to use correct providers
- [x] Delete unused figma folder

## Phase 3 - Project Structure Reorganization
- [ ] Create new folder structure (app/router, app/providers, features/, services/, hooks/, utils/, types/)
- [ ] Move pages to src/pages/
- [ ] Move UI components to src/components/ui/
- [ ] Move layout components to src/components/layout/
- [ ] Move shared components to src/components/shared/
- [ ] Update import paths

## Phase 5 - State Management (Split Context) ✅ COMPLETED
- [x] Create AuthContext (src/app/providers/AuthProvider.tsx)
- [x] Create AppContext (src/app/providers/AppProvider.tsx)
- [x] Create ThemeContext (src/app/providers/ThemeProvider.tsx)
- [x] Create ToastContext (src/app/providers/ToastProvider.tsx)
- [x] Create providers index file
- [x] Update App.tsx to use new providers
- [x] Create custom hooks (useAuth, useApp, useTheme, useToast)

## Phase 6 - Error Handling ✅ COMPLETED
- [x] Create ErrorBoundary component (src/components/shared/ErrorBoundary.tsx)
- [x] Create API error handling service (src/services/api/errors.ts)
- [x] Create API client service (src/services/api/client.ts)
- [x] Create utils (cn.ts, formatters.ts)
- [x] Add error handling to routes

## Phase 7 - Project Cleanup
- [x] Delete unused figma folder ✅
- [ ] Consolidate CSS files
- [ ] Remove duplicate/empty files
- [x] Add ESLint + Prettier config (existing)
- [x] Update package.json scripts (build and dev available)

## Phase 8 - Backend Integration Prep (Next Steps)
- [ ] Add protected routes with auth guards
- [ ] Connect real auth API (JWT handling)
- [ ] Add token refresh logic
- [ ] Integrate API client with auth endpoints

## Status: Phase 1 Complete - Ready for Backend Integration

