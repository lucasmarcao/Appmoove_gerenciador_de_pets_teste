import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//     plugins: [react()],
//     test: {
//         globals: true,
//         environment: "jsdom",
//         coverage: {
//             provider: "c8",
//             reporter: ["text", "html"],
//             statements: 60,
//             functions: 60,
//             branches: 60,
//             lines: 60,
//         },
//     },
// });
