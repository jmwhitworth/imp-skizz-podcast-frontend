<template>
  <a :href="href" :target="target">
    <button class="text-red-500">{{ label }}</button>
  </a>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: '_self',
    },
  },
}
</script>
