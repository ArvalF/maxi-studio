<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

const route = useRoute()
const breakpoints = useBreakpoints({ md: '768px' })
const isMobile = computed(() => breakpoints.smaller('md').value)
const showFooter = true

const isServicePage = computed(() => /^\/services(?:\/[^/]+)?$/.test(route.path))

const scrollable = computed(() => {
  if (isServicePage.value) return true

  return !(
    /^\/(?:projets)\/[^/]+$/.test(route.path)
    || route.path === '/about'
    || route.path === '/a-propos'
    || route.path === '/press'
  )
})

</script>

<template>
      <div class="w-full h-full min-h-0 flex flex-col gap-6">
        <div v-if="scrollable || isMobile" class="grid grid-rows-[1fr_9fr] min-h-0 gap-2 h-full">
          <!-- Ligne 1 -->
          <slot name="header-content"></slot>
          <!-- Ligne 2 -->
          <!-- <div class="grid grid-cols-[5fr_2fr] gap-10 min-h-0 h-full overflow-hidden">
            <slot name="main-content"></slot>
          </div> -->
          <div class="min-h-0 h-full overflow-y-auto w-full pl-5 pr-5">
            <div class="min-h-full flex flex-col">
              <div class="flex-1 min-h-0">
                <slot name="main-content"></slot>
              </div>
              <Footer :show-footer="showFooter"></Footer>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-rows-[1fr_9fr_1fr] min-h-0 gap-2 h-full">
          <!-- Ligne 1 -->
          <slot name="header-content"></slot>
          <!-- Ligne 2 -->
          <div class="min-h-0 h-full overflow-y-auto w-full pl-5 pr-5">
              <slot name="main-content"></slot>
          </div>
          <!-- Ligne 3 -->
          <div class="w-full pl-5 pr-5">
            <Footer :show-footer="showFooter"></Footer>
          </div>
        </div>
      </div>
</template>
