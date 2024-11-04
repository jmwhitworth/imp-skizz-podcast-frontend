<template>
  <Button :href="href">
    <font-awesome-icon :icon="['fab', 'fa-apple']" class="text-purple-500" />
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
