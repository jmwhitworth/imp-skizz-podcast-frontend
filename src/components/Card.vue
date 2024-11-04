<template>
  <div>
    <figure class="w-full pb-[56.25%] relative overflow-hidden">
      <img
        :src="image_url"
        :alt="image_alt"
        class="absolute w-full object-center top-[-16.75%] right-0 bottom-0 left-0"
      />
    </figure>
    <h2>{{ title }}</h2>
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
    content: {
      type: String,
      required: true,
    },
  },
}
</script>
