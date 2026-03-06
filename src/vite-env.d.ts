/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CUSTOMER_PUBLIC_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
