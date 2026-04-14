<script setup lang="ts">
import type { StrapiPhoto } from '~/types/main';
const mounted = ref(false);



type PresentationItem = {
  id: number;
  titre: string;
  description: string;
  photograph?: string;
  date?: string;
  location?: string;
  type: string;
  photos?: StrapiPhoto[];
}
const props = defineProps<{
  item: PresentationItem
}>()


onMounted(() => {
  mounted.value = true;
})
</script>

<template>
  <MainContentSkeleton>
    {{ item.photos }}
    <template #main-content>
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4 justify-between">
          <Transition name="item">
            <!-- Description du projet -->
            <div v-if="item && mounted" class="flex flex-1 flex-col min-w-full min-h-0 justify-start pb-[2rem] font-serif animate-fade-in delay-5000">
              <h1 class="text-base italic font-bold">{{ item.titre }}</h1>
              <div v-if="item.location && item.date" class="mb-2"><span class="text-base italic" v-if="item.location">{{ item.location }}</span>, <span v-if="item.date">{{ item.date }}</span></div>
             <div class="text-justify min-h-0 overflow-x-auto pr-6 scrollbar-thin text-base italic">{{ item.description }}</div>
            </div>
          </Transition>
          <Transition name="item-photographer">
            <!-- Nom du photographe -->
            <div v-if="item.photograph && mounted" class="flex flex-col min-w-full items-start">
              <div class="text-right text-sm italic mr-2"> Photo by {{ item.photograph }}</div>
            </div>
          </Transition>
          <div class="h-1">
          </div>
        </div>
    </template> 

    <template #img-content>
    <Transition name="carousel">
        <CustomCarousel
          v-if="item.photos && item.photos.length > 0"
          :photos="item.photos"
        />
    </Transition>  
    </template>
 </MainContentSkeleton>
</template>
<style scoped>
.item-enter-active,
.item-leave-active {
  transition: opacity 1s ease 0.1s;
}

.item-enter-from,
.item-leave-to {
  opacity: 0;
}

.item-photographer-list-enter-active,
.item-photographer-list-leave-active {
  transition: opacity 1s ease 0.3s;
}

.item-photographer-list-enter-from,
.item-photographer-list-leave-to {
  opacity: 0;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 1.5s ease 0.5s;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}
</style>
