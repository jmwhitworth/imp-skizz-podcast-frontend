<template>
  <header class="container mb-16 pt-8">
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
          src="@/assets/logo-medium.webp"
          width="125"
          height="125"
          class="size-20"
        />
        <h1 class="text-2xl font-bold">Imp and Skizz Podcast Index</h1>
      </router-link>
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
            <font-awesome-icon
              :icon="['fab', 'fa-patreon']"
              class="text-orange-500"
            />
          </Button>
        </li>
      </ul>
    </section>
  </header>
</template>

<script setup>
import YouTube from '@/components/YouTube.vue'
import Spotify from '@/components/Spotify.vue'
import Apple from '@/components/Apple.vue'
import Button from '@/components/Button.vue'
</script>
