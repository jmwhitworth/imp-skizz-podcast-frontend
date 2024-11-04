<script setup>
import PodcastList from './components/PodcastList.vue'
</script>

<template>
  <header class="container mb-16">
    <section class="container">
      <router-link
        :to="{ path: '/', query: {} }"
        replace
        class="flex items-center"
      >
        <img
          alt="Imp and Skizz Podcast logo"
          src="./assets/logo-medium.webp"
          width="125"
          height="125"
        />
        <h1 class="text-2xl font-bold">Imp and Skizz Podcast Index</h1>
      </router-link>
    </section>
  </header>

  <main class="container">
    <PodcastList />
  </main>

  <footer>
    <section class="container mt-16">
      <p>By Jack</p>
    </section>
  </footer>
</template>
