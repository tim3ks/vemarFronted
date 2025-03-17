/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                // white: "#ffffff",
                antracyt: "#222222",
                // "zloty-dab": "#856d4d",
                // orzech: "#664228",
                // mahon: "#4c1200",
                // winchester: "#704214",
                // "ciemny-braz": "#2b1e12",
                // "old-czarny": "#000000",
                // braz: "#502f28",
            },
        },
    },
    plugins: [
        // ...
        require("tailwind-scrollbar"),
    ],
};
