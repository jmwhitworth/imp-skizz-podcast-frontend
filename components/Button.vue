<script setup>
const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  target: {
    type: String,
    default: '_self',
  },
})
</script>

<template>
  <a
    class="rounded-lg border-2 border-gray-200/20 px-4 py-2 font-semibold shadow-lg transition-colors hover:border-gray-200/30"
    :target="target"
  >
    <slot></slot>
    <font-awesome
      v-if="target === '_blank'"
      :icon="['fas', 'arrow-up-right-from-square']"
      class="ml-1 text-xs sm:ml-2 md:ml-1 lg:ml-2"
      aria-hidden="true"
    />
    <span v-if="text" class="sr-only">{{ text }}</span>
  </a>
</template>
