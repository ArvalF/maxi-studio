<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'
import type { GalleryItem } from '~/types'

const props = defineProps<{
  items: GalleryItem[]
}>()

const hoveredItem = ref<GalleryItem | null>(null)
</script>

<template>
  <div class="min-h-full flex flex-col lg:pr-50 lg:pl-50">
        <div class="flex min-h-0 items-start justify-center gap-x-18 gap-y-6 flex-wrap">
          <template v-for="item in props.items" :key="item.id">
            <div v-if="item.imgUrl" class="relative w-full flex-none basis-full md:basis-[clamp(250px,calc((100%-3*4.5rem)/4),300px)]">
              <div class="md:h-100  overflow-hidden block">
                <NuxtLink v-if="item.link" :to="item.link" :target="item.type === 'presse' ? '_blank' : undefined" class="w-full h-full block">
                  <img  
                  class="object-cover w-full h-full"
                  :src="useStrapiBaseUrl() + item.imgUrl" 
                  alt=""
                  @mouseover="hoveredItem = item"
                  @mouseleave="hoveredItem = null">
                </NuxtLink>
                <div v-else class="w-full h-full block">
                  <img  
                  class="object-cover w-full h-full"
                  :src="useStrapiBaseUrl() + item.imgUrl" 
                  alt=""
                  @mouseover="hoveredItem = item"
                  @mouseleave="hoveredItem = null">
                </div>
              </div>
              <div
                class="font-serif text-sm mt-2 h-15">
                <!-- Mode Mobile -->
                <div class="md:hidden">
                  <p>{{ item.titre }}</p>
                  <p v-if="item.subtitle">{{ item.subtitle }}</p>
                </div>
                <!-- Mode Desktop -->
                <Transition>
                  <div v-if="hoveredItem && hoveredItem.id === item.id" class="hidden md:block">
                    <p>{{ item.titre }}</p>
                    <p v-if="item.subtitle">{{ item.subtitle }}</p>
                  </div>
              </Transition>
              </div>
            </div>
          </template>
        </div>
  </div>      
  
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
