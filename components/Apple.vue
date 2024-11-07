<script setup>
import Button from './Button.vue'

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Button :href="href" text="Listen on Apple Podcasts">
    <font-awesome :icon="['fab', 'apple']" class="text-purple-500" />
  </Button>
</template>
