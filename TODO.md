# Vaulta Restructuring TODO

## Phase 3 - Project Structure Reorganization
- [ ] Create new folder structure (app/router, app/providers, features/, services/, hooks/, utils/, types/)
- [ ] Move pages to src/pages/
- [ ] Move UI components to src/components/ui/
- [ ] Move layout components to src/components/layout/
- [ ] Move shared components to src/components/shared/
- [ ] Update import paths

## Phase 5 - State Management (Split Context)
- [x] Create AuthContext (src/app/providers/AuthProvider.tsx)
- [x] Create AppContext (src/app/providers/AppProvider.tsx)
- [x] Create ThemeContext (src/app/providers/ThemeProvider.tsx)
- [x] Create ToastContext (src/app/providers/ToastProvider.tsx)
- [x] Create providers index file
- [x] Update App.tsx to use new providers
- [x] Create custom hooks (useAuth, useApp, useTheme, useToast)

## Phase 6 - Error Handling
- [x] Create ErrorBoundary component (src/components/shared/ErrorBoundary.tsx)
- [x] Create API error handling service (src/services/api/errors.ts)
- [x] Create API client service (src/services/api/client.ts)
- [x] Create utils (cn.ts, formatters.ts)
- [x] Add error handling to routes

## Phase 7 - Project Cleanup
- [ ] Delete unused figma folder
- [ ] Consolidate CSS files
- [ ] Remove duplicate/empty files
- [ ] Add ESLint + Prettier config
- [ ] Update package.json scripts

## Status: In Progress

