// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string;
  readonly VITE_SERVER_IP: string;
  readonly VITE_TOSS_CLIENT_KEY: string;
  readonly VITE_TOSS_CUSTOM_KEY: string;
}

declare const __APP_VERSION__: string;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
