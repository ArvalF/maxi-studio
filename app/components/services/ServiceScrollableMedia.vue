<script setup lang="ts">
import { computed } from 'vue'
import type { ServiceMediaBlock } from '~/types'

const props = defineProps<{
  block: ServiceMediaBlock
  baseUrl?: string
}>()

const mediaUrl = computed(() => {
  const selectedUrl =
    props.block.file.formats?.large?.url
    || props.block.file.formats?.medium?.url
    || props.block.file.url

  if (!selectedUrl) return ''
  if (selectedUrl.startsWith('http')) return selectedUrl
  return `${props.baseUrl || ''}${selectedUrl}`
})
</script>

<template>
  <img
    v-if="mediaUrl"
    :src="mediaUrl"
    :alt="block.file.alternativeText || block.file.name"
    class="w-full h-auto object-cover"
  >
</template>
