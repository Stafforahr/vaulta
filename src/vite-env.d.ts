/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_BIOMETRICS: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENCRYPTION_KEY_PREFIX: string;
  readonly VITE_SESSION_TIMEOUT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

