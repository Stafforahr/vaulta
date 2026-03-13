import { createBrowserRouter, redirect } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Dashboard } from "../pages/Dashboard";
import { VaultAccounts } from "../pages/VaultAccounts";
import { VaultCrypto } from "../pages/VaultCrypto";
import { VaultDocuments } from "../pages/VaultDocuments";
import { VaultMessages } from "../pages/VaultMessages";
import { Beneficiaries } from "../pages/Beneficiaries";
import { TriggerSettings } from "../pages/TriggerSettings";
import { Settings } from "../pages/Settings";
import { Pricing } from "../pages/Pricing";
import { NotFound } from "../pages/NotFound";
import { ErrorBoundary } from "../components/shared/ErrorBoundary";
import { supabase } from "../services/supabase";

// Auth loader - checks if user is authenticated
async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw redirect("/login");
  }
  
  return { session };
}

// Guest loader - redirects to app if already logged in
async function requireGuest() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    throw redirect("/app");
  }
  
  return { session: null };
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    Component: Login,
    errorElement: <ErrorBoundary />,
    loader: requireGuest,
  },
  {
    path: "/signup",
    Component: Signup,
    errorElement: <ErrorBoundary />,
    loader: requireGuest,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
    errorElement: <ErrorBoundary />,
    loader: requireGuest,
  },
  {
    path: "/pricing",
    Component: Pricing,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/app",
    Component: AppLayout,
    errorElement: <ErrorBoundary />,
    loader: requireAuth,
    children: [
      { index: true, Component: Dashboard },
      { path: "vault/accounts", Component: VaultAccounts },
      { path: "vault/crypto", Component: VaultCrypto },
      { path: "vault/documents", Component: VaultDocuments },
      { path: "vault/messages", Component: VaultMessages },
      { path: "beneficiaries", Component: Beneficiaries },
      { path: "triggers", Component: TriggerSettings },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "*",
    Component: NotFound,
    errorElement: <ErrorBoundary />,
  },
]);

