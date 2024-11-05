<template>
  <Header />

  <main class="container">
    <PodcastList />
  </main>

  <Footer />
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PodcastList from '../components/PodcastList.vue'
</script>
