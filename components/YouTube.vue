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
  <Button :href="href" text="Watch this on YouTube">
    <font-awesome :icon="['fab', 'youtube']" class="text-red-500" />
  </Button>
</template>
