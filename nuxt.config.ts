// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ['~/assets/main.css'],
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'og:type',
          content: 'website',
        },
      ],
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      bodyAttrs: { class: 'bg-gray-900 text-gray-100' },
    },
  },
  runtimeConfig: {
    apiEndpoint:
      process.env.VITE_API_ENDPOINT ||
      'https://api.impandskizzpodcast.com/api/v2',
  },
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@vesp/nuxt-fontawesome'],
  fontawesome: {
    icons: {
      solid: [
        'arrow-up-right-from-square',
        'arrow-up',
        'arrow-down',
        'mug-saucer',
      ],
      brands: ['youtube', 'spotify', 'apple', 'patreon'],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
