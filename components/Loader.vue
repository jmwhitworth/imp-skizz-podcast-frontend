<script setup>
const props = defineProps({
  condition: {
    type: Boolean,
    required: true,
  },
  classes: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div v-if="condition" class="z-50">
    <div
      class="h-12 w-12 animate-spin rounded-full border-8 border-t-black"
    ></div>
  </div>
</template>
