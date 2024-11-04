<template>
  <a :href="href" :target="target">
    <button
      class="rounded-md bg-blue-900 px-4 py-2 font-semibold shadow-lg transition-colors hover:bg-blue-950"
    >
      {{ label }}
    </button>
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
