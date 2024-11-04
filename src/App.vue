<template>
  <header class="container mb-16 py-4">
    <section
      class="container flex flex-col items-center justify-between gap-8 md:flex-row"
    >
      <router-link
        :to="{ path: '/', query: {} }"
        replace
        class="flex items-center gap-4"
      >
        <img
          alt="Imp and Skizz Podcast logo"
          src="./assets/logo-medium.webp"
          width="125"
          height="125"
          class="size-20"
        />
        <h1 class="text-2xl font-bold">Imp and Skizz Podcast Index</h1>
      </router-link>
      <ul class="flex gap-4">
        <li>
          <YouTube
            href="https://www.youtube.com/@impandskizzpodcast"
            target="_blank"
          />
        </li>
        <li>
          <Spotify
            href="https://open.spotify.com/show/1EPoDsUI8BnhLbdERd5Y4w"
            target="_blank"
          />
        </li>
        <li>
          <Apple
            href="https://podcasts.apple.com/gb/podcast/imp-and-skizz-podcast/id1639033817"
            target="_blank"
          />
        </li>
      </ul>
    </section>
  </header>

  <main class="container">
    <PodcastList />
  </main>

  <footer>
    <section class="container mt-16">
      <Button href="https://jackwhitworth.com" target="_blank"
        >Website by Jack</Button
      >
    </section>
  </footer>
</template>

<script setup>
import PodcastList from './components/PodcastList.vue'
import Button from './components/Button.vue'
import YouTube from './components/YouTube.vue'
import Spotify from './components/Spotify.vue'
import Apple from './components/Apple.vue'
</script>
