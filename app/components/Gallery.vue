<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'

type Item = {
    id: string,
    titre: string,
    subtitle?: string,
    imgUrl: string,
    link: string,
}

const props = defineProps<{
  items: Item[]
}>()

const hoveredItem = ref<Item | null>(null)
</script>

<template>
        <div class="flex h-full min-h-0 mt-6 items-center justify-start gap-x-18 gap-y-6 flex-wrap overflow-y-auto pr-6">
          <template v-for="item in props.items" :key="item.id">
            <div v-if="item.imgUrl" class="relative">
              <div class="h-[200px] w-[300px] overflow-hidden block">
                <a :href="`${item.link}`" class="w-full h-full block">
                  <img  
                  class="object-cover w-full h-full grayscale-100 hover:grayscale-0"
                  :src="useStrapiBaseUrl() + item.imgUrl" 
                  alt=""
                  @mouseover="hoveredItem = item"
                  @mouseleave="hoveredItem = null">
                </a>
              </div>
              <div
                class="font-serif text-sm mt-2 h-15">
                <Transition>
                  <div v-if="hoveredItem && hoveredItem.id === item.id">
                    <p>{{ item.titre }}</p>
                    <p v-if="item.subtitle">{{  item.subtitle}}</p>
                  </div>
              </Transition>
              </div>
            </div>
          </template>

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
