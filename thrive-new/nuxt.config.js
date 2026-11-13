// https://nuxt.com/docs/api/configuration/nuxt-config

import { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { setupInspiraUI } from "@inspira-ui/plugins";

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/content',
    'nuxt-marquee',
    '@vueuse/nuxt',
    "nuxt-gtag",
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  components: true,

  plugins: [
    '~/plugins/global-components.js'
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  gtag: {
    // Your primary Google tag ID
    id: 'G-3YP0LMNK2Z',
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
  },

  tailwindcss: {
    config: {
      plugins: [
        require('@tailwindcss/typography'),
        animate, setupInspiraUI
      ],
      darkMode: "selector",
      safelist: ["dark"],
      prefix: "",
      content: [],
      theme: {
        extend: {
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
          },
          borderRadius: {
            xl: "calc(var(--radius) + 4px)",
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
        },
      },
    },
    viewer: true,
  },
  css: ['~/assets/css/style.css'],

  // Performance & Edge Request Reduction
  experimental: {
    payloadExtraction: false, // Disables generation of extra _payload.json requests per page link
  },

  // Nitro Engine & Vercel Edge Cache Optimization
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
  },

  // Route rules for SWR caching at Edge and redirects
  routeRules: {
    '/shs': { redirect: '/pre-university' },
    '/shs/**': { redirect: '/pre-university/**' },
    '/diploma/data-science-and-ai': { redirect: '/campus/courses/645282df8319bb0c78d486b6' },
    '/diploma/data-science': { redirect: '/campus/courses/645282df8319bb0c78d486b6' },

    // Static Assets Caching (1 year immutable)
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/brochures/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/manifest.json': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } },

    // Dynamic Sitemaps & Feeds
    '/sitemap.xml': { swr: 86400 },
    '/robots.txt': { swr: 86400 },
    '/llms.txt': { swr: 86400 },
    '/llms-full.txt': { swr: 86400 },

    // POST Mutation Endpoints (Must NOT be ISR/SWR cached)
    '/api/form-proxy': { cache: false, isr: false },
    '/api/forminit': { cache: false, isr: false },
    '/api/upload-badge': { cache: false, isr: false },
    '/api/send-admission-letter': { cache: false, isr: false },
    '/api/send-advanced-admission-letter': { cache: false, isr: false },
    '/api/send-bundle-admission-letter': { cache: false, isr: false },
    '/api/send-preuniversity-admission-letter': { cache: false, isr: false },
    '/api/sms': { cache: false, isr: false },

    // GET API Routes Cache (1 hour SWR)
    '/api/thrive-courses/**': { swr: 3600 },
    '/api/bundles/**': { swr: 3600 },
    '/api/preuniversity-courses/**': { swr: 3600 },
    '/api/ignite-courses/**': { swr: 3600 },
    '/api/speakers/**': { swr: 3600 },
    '/api/thrive-shop/**': { swr: 3600 },
    '/api/webinar_details/**': { swr: 3600 },
    '/api/points/**': { swr: 3600 },
    '/api/student-badge/**': { swr: 3600 },

    // Public Pages SWR Cache (24 hour SWR at Edge)
    '/': { swr: 86400 },
    '/campus/**': { swr: 86400 },
    '/pre-university/**': { swr: 86400 },
    '/graduates/**': { swr: 86400 },
    '/thrive-plus/**': { swr: 86400 },
    '/about-us': { swr: 86400 },
    '/pricing': { swr: 86400 },
    '/contact-us': { swr: 86400 },
    '/blog/**': { swr: 86400 },
    '/career-launchpad': { swr: 86400 },
    '/administrative-fees': { swr: 86400 },
    '/refund-policy': { swr: 86400 }
  },

  app: {
    head: {
      title: "Thrive | Providing Global digital skills to African graduates.",
      meta: [
        { name: "Thrive", content: "Thrive provides tuition-free, in-demand digital skills to African graduates and links them to jobs all over the world." },
        { name: "theme-color", content: "#ec4899" }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/png', href: '/images/thrive-logo.png' }
      ]
    },
  },

  // Build optimization
  build: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      }
    }
  },

  // Runtime config for caching and secrets
  runtimeConfig: {
    webflowToken: "07c7111e3a86e0a7bf9cee656bc07ab76a6f7f593623f5f1ad1a5d599222f3dc",
    webflowTokenThrive: "a3b3eae016180ed1e1f13c6ef710237dbb84962718abc0e10ffcb09fc7b2f711",
    forminitApiKey: process.env.FORMINIT_API_KEY,
    mnotifyApiKey: process.env.MNOTIFY_API_KEY,
    mnotifySender: process.env.MNOTIFY_SENDER || "Thrive",
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY,
    supabaseBucket: process.env.SUPABASE_BUCKET || "badges",
    public: {
      cacheMaxAge: 300, // 5 minutes default cache
      apiCacheMaxAge: 600, // 10 minutes for API calls
      graduatesAdmissionsClosed: process.env.NUXT_PUBLIC_GRADUATES_ADMISSIONS_CLOSED || 'false'
    }
  }
})