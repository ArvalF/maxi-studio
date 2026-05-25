<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'

type Item = {
    id: string,
    titre: string,
    subtitle?: string,
    imgUrl: string,
  link?: string,
}

const props = defineProps<{
  items: Item[]
}>()

const hoveredItem = ref<Item | null>(null)
</script>

<template>
  <div class="min-h-full flex flex-col lg:pr-50 lg:pl-50">
        <div class="flex min-h-0 items-start justify-center gap-x-18 gap-y-6 flex-wrap">
          <template v-for="item in props.items" :key="item.id">
            <div v-if="item.imgUrl" class="relative w-full flex-none basis-full md:basis-[clamp(300px,calc((100%-3*4.5rem)/4),400px)]">
              <div class="md:h-125  overflow-hidden block">
                <a v-if="item.link" :href="`${item.link}`" class="w-full h-full block">
                  <img  
                  class="object-cover w-full h-full"
                  :src="useStrapiBaseUrl() + item.imgUrl" 
                  alt=""
                  @mouseover="hoveredItem = item"
                  @mouseleave="hoveredItem = null">
                </a>
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
      
      <div class="mt-auto">
        <Footer :show-footer="true"></Footer>
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
