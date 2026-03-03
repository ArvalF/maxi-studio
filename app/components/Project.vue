<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'
defineProps<{
  projet: any
}>()

</script>

<template>
  <div class="w-full h-full min-h-0 flex flex-col gap-4 justify-between">
    <h1 class="font-bold text-xl">{{ projet.titre }}</h1>
    <div>{{ projet.description }}</div>
    <div class="mt-auto overflow-hidden">
      <Carousel
          :items-to-show="1"
          :gap="10"
          snap-align="center"
          height="500px"
      >
      <Slide v-for="photo in projet.photos" :key="photo.id">
        <img :src="useStrapiBaseUrl() + photo.url" alt="photo" class="w-full h-full object-cover block" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <div class="text-right italic">{{ projet.photograph }}</div>
    </div>
  </div>
</template>

<style>
.carousel__pagination {
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  /* left: 15px; */
}
.carousel__pagination-button {
  height: 10px;
  width: 10px;
  border-radius: 0px;
  border: solid 1px black;
  background-color: white;
}
.carousel__pagination-button--active {
  background-color: rgb(0, 0, 0);
}

</style>