<template>
  <div class="space-y-2 rounded-lg bg-gray-800 p-6 text-gray-100">
    <figure class="relative w-full overflow-hidden rounded-t-md pb-[56.25%]">
      <img
        :src="image_url"
        :alt="image_alt"
        class="absolute bottom-0 left-0 right-0 top-[-16.75%] w-full object-center"
      />
    </figure>
    <h2>{{ title }}</h2>
    <p class="text-sm">{{ meta }}</p>
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
    meta: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
}
</script>
