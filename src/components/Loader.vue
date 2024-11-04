<template>
  <div v-if="condition" :class="classes">
    <div
      class="h-12 w-12 animate-spin rounded-full border-8 border-t-black"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    condition: {
      type: Boolean,
      required: true,
    },
    classes: {
      type: String,
      default: '',
    },
  },
}
</script>
