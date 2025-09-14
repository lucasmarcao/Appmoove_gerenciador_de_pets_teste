/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_BREEDS_API_URL: string;
    // outras variáveis…
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
