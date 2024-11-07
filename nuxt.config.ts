// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      bodyAttrs: { class: 'bg-gray-900 text-gray-100' },
    },
  },
  runtimeConfig: {
    apiEndpoint:
      process.env.VITE_API_ENDPOINT ||
      'https://api.impandskizzpodcast.com/api/v1',
  },
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@vesp/nuxt-fontawesome', '@nuxtjs/tailwindcss'],
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
})
