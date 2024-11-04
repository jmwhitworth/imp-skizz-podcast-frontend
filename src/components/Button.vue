<template>
  <a :href="href" :target="target">
    <button
      class="rounded-lg border-2 border-gray-200/20 px-4 py-2 font-semibold shadow-lg transition-colors hover:border-gray-200/30"
    >
      <slot></slot>
      <font-awesome-icon
        v-if="target === '_blank'"
        :icon="['fas', 'fa-arrow-up-right-from-square']"
        class="ml-2"
      />
    </button>
  </a>
</template>

<script>
export default {
  props: {
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
