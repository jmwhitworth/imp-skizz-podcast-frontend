<template>
  <footer>
    <section
      class="items-bottom container mt-16 flex flex-col justify-between gap-4 md:flex-row"
    >
      <div class="max-w-2xl space-y-2 text-sm text-gray-400">
        <p>
          This website is not affiliated with the Imp And Skizz Podcast.<br />
          It is a fan-made project to help listeners find their favourite
          episodes.
        </p>
        <p>
          If anyone from the Imp & Skizz team would like to reach out to me, I'm
          happy to provide this website, domain, and all assets to them to use
          or modify as they see fit.
        </p>
      </div>
      <Button href="https://jackwhitworth.com" target="_blank" class="text-sm"
        >Website by Jack</Button
      >
    </section>
  </footer>
</template>

<script setup>
import Button from './Button.vue'
</script>
