<script setup>
import PodcastList from './components/PodcastList.vue'
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo-medium.webp"
      width="125"
      height="125"
    />

    <div class="text-blue-500">
      <h1>Header</h1>
    </div>
  </header>

  <main>
    <PodcastList />
  </main>
</template>
