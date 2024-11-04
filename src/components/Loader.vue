<template>
  <div v-if="condition" :class="classes">
    <div
      class="border-8 border-t-black rounded-full w-12 h-12 animate-spin"
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
