// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    BIR1_KEY: process.env.BIR1_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    public: {
      // Add public runtime config if needed
    },
    // supabaseUrl: "https://ipkenjukgvroconcxnnr.supabase.co",
    // supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwa2VuanVrZ3Zyb2NvbmN4bm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MzA4OTgsImV4cCI6MjAxNjUwNjg5OH0.y8qJk3r_6JnUjCgaY6xxzhBhI6LYozel5HzTz4DBVyA"
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: './favicon.png' }]
    },
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  // ssr: false,
  plugins: [
    '~/plugins/vue-konva.js'
  ],
  modules: [
    '@vueuse/nuxt',
    "@nuxt/eslint",
    // "@nuxtjs/dotenv",
    "@nuxtjs/supabase",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore"],
      },
    ],
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Nunito: true,
          download: true,
          inject: true,
        },
      },
    ],
    "@nuxt/eslint",
  ],

  eslint: {
    // options here
  },

  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-07-09",
});