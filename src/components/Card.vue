<template>
  <div
    class="space-y-4 rounded-lg border-2 border-gray-200/20 bg-gray-950 p-4 text-gray-100 transition-colors duration-200 hover:border-gray-200/30"
  >
    <figure class="relative w-full overflow-hidden rounded-t-md pb-[56.25%]">
      <img
        :src="image_url"
        :alt="image_alt"
        class="absolute bottom-0 left-0 right-0 top-[-16.75%] w-full object-center"
      />
    </figure>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    image_url: {
      type: String,
      required: true,
    },
    image_alt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
