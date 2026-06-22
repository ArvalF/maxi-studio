<script setup lang="ts">
import type { ServiceSliderBlock } from '~/types'
import CustomCarousel from '~/components/CustomCarousel.vue'

defineProps<{
  block: ServiceSliderBlock
}>()
</script>

<template>
  <CustomCarousel :photos="block.files" />
</template>
