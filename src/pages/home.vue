<template>
  <Header />

  <main class="container">
    <PodcastList />
  </main>

  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import PodcastList from '@/components/PodcastList.vue'

import { useHead } from '@unhead/vue'
const title = 'Imp And Skizz Podcast Index | Home'
const description = 'Browse all episodes of the Imp and Skizz Podcast.'
useHead({
  title: title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:description',
      content: description,
    },
  ],
})
</script>
