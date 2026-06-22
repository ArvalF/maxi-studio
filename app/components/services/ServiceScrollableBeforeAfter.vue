<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { ServiceBeforeAfterBlock } from '~/types'

const props = defineProps<{
  block: ServiceBeforeAfterBlock
  baseUrl?: string
}>()

const sliderPosition = ref(50)
const isDragging = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const beforeUrl = computed(() => {
  const selectedUrl =
    props.block.before.formats?.large?.url
    || props.block.before.formats?.medium?.url
    || props.block.before.url

  if (!selectedUrl) return ''
  if (selectedUrl.startsWith('http')) return selectedUrl
  return `${props.baseUrl || ''}${selectedUrl}`
})

const afterUrl = computed(() => {
  const selectedUrl =
    props.block.after.formats?.large?.url
    || props.block.after.formats?.medium?.url
    || props.block.after.url

  if (!selectedUrl) return ''
  if (selectedUrl.startsWith('http')) return selectedUrl
  return `${props.baseUrl || ''}${selectedUrl}`
})

function updatePosition(clientX: number) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = clientX - rect.left
  sliderPosition.value = Math.min(100, Math.max(0, (x / rect.width) * 100))
}

function onMouseDown(e: MouseEvent) {
  isDragging.value = true
  e.preventDefault()
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  updatePosition(e.clientX)
}

function onMouseUp() {
  isDragging.value = false
}

function onTouchStart(e: TouchEvent) {
  isDragging.value = true
  e.preventDefault()
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return
  updatePosition(e.touches[0].clientX)
}

function onTouchEnd() {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', onTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative overflow-hidden select-none cursor-ew-resize max-h-[450px] max-w-[450px]"
  >
    <!-- After image (base, full width) -->
    <img
      v-if="afterUrl"
      :src="afterUrl"
      :alt="block.after.alternativeText || block.after.name"
      class="block w-full h-auto"
      draggable="false"
    >

    <!-- Before image clipped to the left portion -->
    <img
      v-if="beforeUrl"
      :src="beforeUrl"
      :alt="block.before.alternativeText || block.before.name"
      class="absolute inset-0 w-full h-full object-cover"
      :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
      draggable="false"
    >

    <!-- Divider line -->
    <div
      class="absolute top-0 bottom-0 w-0.5 bg-white shadow"
      :style="{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }"
    >
      <!-- Handle -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize"
        @mousedown="onMouseDown"
        @touchstart.prevent="onTouchStart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 7L3 12l5 5V7zm8 10l5-5-5-5v10z" />
        </svg>
      </div>
    </div>
  </div>
</template>
