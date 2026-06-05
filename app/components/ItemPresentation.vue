<script setup lang="ts">
import type { PresentationItem } from '~/types';

const mounted = ref(false);

const props = defineProps<{
  item: PresentationItem
}>()

onMounted(() => {
  mounted.value = true;
})
</script>

<template>
  <div class="md:hidden h-full md:overflow-y-auto pb-6">
    <div v-if="item && mounted" class="flex flex-col gap-4 font-serif animate-fade-in delay-5000">
      <div>
        <h1 class="text-base italic font-bold">{{ item.titre }}</h1>
        <div v-if="item.location && item.date" class="mb-2 text-base text-bold"><span v-if="item.location">{{ item.location }}</span>, <span v-if="item.date">{{ item.date }}</span></div>
        <div class="text-sm leading-[1.4em] whitespace-pre-line">{{ item.description }}</div>
      </div>

      <div
        v-if="item.photos && item.photos.length > 0"
        class="flex flex-col gap-4"
      >
        <img
          v-for="photo in item.photos"
          :key="photo.id"
          :src="useStrapiBaseUrl() + photo.url"
          alt="photo"
          class="w-full h-auto object-cover"
        >
      </div>
    </div>
  </div>

  <div class="hidden md:block h-full">
    <MainContentSkeleton>
    <template #main-content>
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4 justify-between">
          <Transition name="item">
            <!-- Description du projet -->
            <div v-if="item && mounted" class="flex flex-1 flex-col min-w-full min-h-0 justify-start pb-[2rem]  animate-fade-in delay-5000">
              <h1 class="font-serif text-base font-bold">{{ item.titre }}</h1>
              <div v-if="item.location" class="text-xs text-base text-bold"><span v-if="item.location">{{ item.location }}</span></div>
              <div class="text-xs mb-4 text-base text-bold ml-12"><span v-if="item.date">{{ item.date }}</span></div>
             <div class="justify-left min-h-0 overflow-x-auto pr-6 scrollbar-thin text-sm leading-[1.4em] whitespace-pre-line">{{ item.description }}</div>
            </div>
          </Transition>
          <Transition name="item-photographer">
            <!-- Nom du photographe -->
            <div v-if="item.photograph && mounted" class="hidden flex-col min-w-full items-end md:flex">
              <p class="text-sm mr-2"> Photo by {{ item.photograph }}</p>
            </div>
          </Transition>
          <!-- <div class="h-1">
          </div> -->
        </div>
    </template> 

    <template #img-content="{ mainColumnWidth }">
    <Transition name="carousel">
        <CustomCarousel
          v-if="item.photos && item.photos.length > 0"
          class="hidden md:block"
          :photos="item.photos"
          :pagination-padding-right="mainColumnWidth"
        />       
    </Transition>  
    </template>
  </MainContentSkeleton>
  </div>
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
