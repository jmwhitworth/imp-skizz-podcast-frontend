<script setup>
const props = defineProps({
  podcast: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="space-y-4 rounded-lg border-2 border-gray-200/20 bg-gray-950 p-4 pb-6 text-gray-100 transition-colors duration-200 hover:border-gray-200/30"
  >
    <figure class="relative w-full overflow-hidden rounded-t-md pb-[56.25%]">
      <img
        :src="`https://img.youtube.com/vi/${podcast.youtube_id}/mqdefault.jpg`"
        :srcset="`https://img.youtube.com/vi/${podcast.youtube_id}/default.jpg 120w,
        https://img.youtube.com/vi/${podcast.youtube_id}/mqdefault.jpg 320w,
        https://img.youtube.com/vi/${podcast.youtube_id}/hqdefault.jpg 480w,`"
        sizes="(max-width: 767px) 90vw, (max-width: 1024px) 41vw, 27vw"
        :alt="`YouTube thumbnail for ${podcast.title}`"
        width="320"
        height="180"
        loading="eager"
        class="absolute bottom-0 left-0 right-0 top-[-16.75%] w-full object-center"
      />
    </figure>

    <slot></slot>
  </div>
</template>
