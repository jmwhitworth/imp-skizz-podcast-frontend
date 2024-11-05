<template>
  <Button :href="href" text="Listen on Spotify">
    <font-awesome-icon :icon="['fab', 'fa-spotify']" class="text-green-500" />
  </Button>
</template>

<script>
import Button from './Button.vue'

export default {
  components: {
    Button,
  },
  props: {
    href: {
      type: String,
      required: true,
    },
  },
}
</script>
