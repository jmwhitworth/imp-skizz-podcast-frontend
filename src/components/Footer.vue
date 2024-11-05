<template>
  <footer>
    <section
      class="container mt-16 flex flex-col items-start justify-between gap-8 pb-8 md:flex-row md:items-end"
    >
      <div class="max-w-2xl space-y-2 text-sm text-gray-400">
        <p>
          This website is not affiliated with the Imp And Skizz Podcast.<br />
          It is a fan-made project to help listeners find their favourite
          episodes.
        </p>
        <p>
          If anyone from the Imp & Skizz team would like to
          <a
            alt="Contact Jack Whitworth"
            href="https://jackwhitworth.com/contact/"
            target="_blank"
            class="underline"
            >reach out to me</a
          >, I'm happy to provide this website, domain, and all assets to them
          free of charge to use, modify, or destroy as they see fit.
        </p>
      </div>
      <div
        class="flex flex-shrink-0 flex-row-reverse text-left md:flex-col md:text-right lg:flex-row"
      >
        <Button
          text="Buy Jack a coffee"
          href="https://buymeacoffee.com/jackwhitworth"
          target="_blank"
          class="border-none text-sm"
          ><font-awesome-icon :icon="['fas', 'fa-mug-saucer']"
        /></Button>
        <Button
          text="Jack Whitworth's website"
          href="https://jackwhitworth.com"
          target="_blank"
          class="border-none text-sm"
          >Website by Jack</Button
        >
      </div>
    </section>
  </footer>
</template>

<script setup>
import Button from './Button.vue'
</script>
