<template>
  <Button :href="href" text="Watch this on YouTube">
    <font-awesome-icon :icon="['fab', 'fa-youtube']" class="text-red-500" />
  </Button>
</template>

<script>
import Button from '@/components/Button.vue'

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
