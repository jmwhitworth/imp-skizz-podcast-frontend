<script setup>
import YouTube from './YouTube.vue'
import Spotify from './Spotify.vue'
import Apple from './Apple.vue'
import Button from './Button.vue'
</script>

<template>
  <header class="container mb-16 pt-8">
    <section
      class="container flex flex-col items-center justify-between gap-8 md:flex-row"
    >
      <NuxtLink to="/" replace class="flex items-center gap-4">
        <img
          alt="Imp and Skizz Podcast logo"
          src="~/assets/logo-medium.webp"
          width="125"
          height="125"
          class="size-20"
        />
        <h1 class="text-2xl font-bold">Imp and Skizz Podcast Index</h1>
      </NuxtLink>
      <ul
        class="flex flex-row flex-wrap gap-x-2 gap-y-6 sm:flex sm:gap-x-4 md:grid md:grid-cols-2 lg:flex lg:gap-y-4"
      >
        <li>
          <YouTube
            alt="Imp and Skizz Podcast YouTube channel"
            href="https://www.youtube.com/@impandskizzpodcast"
            target="_blank"
          />
        </li>
        <li>
          <Spotify
            alt="Imp and Skizz Podcast on Spotify"
            href="https://open.spotify.com/show/1EPoDsUI8BnhLbdERd5Y4w"
            target="_blank"
          />
        </li>
        <li>
          <Apple
            alt="Imp and Skizz Podcast on Apple Podcasts"
            href="https://podcasts.apple.com/gb/podcast/imp-and-skizz-podcast/id1639033817"
            target="_blank"
          />
        </li>
        <li>
          <Button
            href="https://www.patreon.com/impandskizz"
            target="_blank"
            text="Listen on Apple Podcasts"
          >
            <font-awesome :icon="['fab', 'patreon']" class="text-orange-500" />
          </Button>
        </li>
      </ul>
    </section>
  </header>
</template>
