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
  <Button :href="href" text="Listen on Spotify">
    <font-awesome :icon="['fab', 'spotify']" class="text-green-500" />
  </Button>
</template>
