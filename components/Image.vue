<script setup>
import { ref, defineProps, nextTick, watch } from 'vue'
import { onMounted } from 'vue'

const imageSrc = ref('')

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
})

onMounted(async () => {
  await nextTick()
  imageSrc.value = props.src
})

watch(
  () => props.src,
  async (newSrc) => {
    await nextTick()
    imageSrc.value = newSrc
  },
)
</script>

<template>
  <img :src="imageSrc" :alt="alt" />
</template>
