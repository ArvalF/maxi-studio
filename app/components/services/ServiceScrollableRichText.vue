<script setup lang="ts">
import type { ServiceRichTextBlock } from '~/types'

defineProps<{
  block: ServiceRichTextBlock
}>()
</script>

<template>
  <div class="h-auto min-h-0 text-sm pr-6 whitespace-pre-line" 
    v-html="$md(block.body)">
  </div>
</template>
