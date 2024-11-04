<template>
  <Header />

  <main class="container">
    <PodcastList />
  </main>

  <Footer />
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PodcastList from './components/PodcastList.vue'
import Button from './components/Button.vue'
import YouTube from './components/YouTube.vue'
import Spotify from './components/Spotify.vue'
import Apple from './components/Apple.vue'
</script>
