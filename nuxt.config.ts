// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'Imp And Skizz Podcast Index',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'og:title',
          content: 'Imp And Skizz Podcast Index',
        },
        {
          name: 'og:description',
          content: 'Browse all episodes of the Imp and Skizz Podcast.',
        },
        {
          name: 'description',
          content: 'Browse all episodes of the Imp and Skizz Podcast.',
        },
        {
          name: 'og:image',
          content: 'https://impandskizzpodcast.com/imp-skizz-podcast-og.jpg',
        },
        {
          name: 'twitter:image',
          content: 'https://impandskizzpodcast.com/imp-skizz-podcast-og.jpg',
        },
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
