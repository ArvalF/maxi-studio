<script setup lang="ts">
const route = useRoute()
const showFooter = computed(() => /^\/(?:projets|services)\/[^/]+$/.test(route.path))
</script>

<template>
      <div class="w-full h-full min-h-0 flex flex-col gap-6 pt-5">
        <div class="grid grid-rows-[1fr_9fr] min-h-0 gap-2 h-full">
          <!-- Ligne 1 -->
          <slot name="header-content"></slot>
          <!-- Ligne 2 -->
          <!-- <div class="grid grid-cols-[5fr_2fr] gap-10 min-h-0 h-full overflow-hidden">
            <slot name="main-content"></slot>
          </div> -->
          <div class="min-h-0 h-full overflow-y-auto w-full">
            <slot name="main-content"></slot>
          </div>
        </div>
        <Footer :show-footer="showFooter"></Footer>
      </div>
</template>
