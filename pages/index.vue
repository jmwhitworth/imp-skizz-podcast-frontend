<template>
  <Header />

  <main class="container">
    <PodcastList />
  </main>

  <Footer />
</template>

<script setup>
useSeoMeta({
  // Standard
  title: 'Imp and Skizz Podcast Index',
  description: 'Browse all episodes of the Imp and Skizz Podcast.',
  image: '/imp-skizz-podcast-og.jpg',

  // OG
  ogTitle: 'Imp and Skizz Podcast Index',
  ogDescription: 'Browse all episodes of the Imp and Skizz Podcast.',
  ogImage: '/imp-skizz-podcast-og.jpg',
  ogUrl: 'https://impandskizz.com',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Imp and Skizz Podcast Index',
  twitterDescription: 'Browse all episodes of the Imp and Skizz Podcast.',
  twitterImage: '/imp-skizz-podcast-og.jpg',
  twitterUrl: 'https://impandskizz.com',
})
</script>
