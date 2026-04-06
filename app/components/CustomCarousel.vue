<script setup lang="ts">
import { translate } from '@nuxt/ui/runtime/utils/locale.js';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const props = defineProps<{ projet: any }>()

const containerRef = ref<HTMLElement | null>(null)
const carouselHeight = ref(500)
const carouselWidth = ref()
const slideChanged = ref(true)
const countPhotos = computed(() => {
  if (props.projet.photos) 
    return props.projet.photos.length
  return 0
})
const paginationGap = '5px'
const mainContentGap= '40px'
const paginationButtonSize = '10px'
const paginationLength = computed(() => {
  return (countPhotos.value - 2) * parseInt(paginationGap) + countPhotos.value * parseInt(paginationButtonSize)
})
const Xtranslate = computed(() => {
  return paginationLength.value/2 
          // + parseInt(paginationGap) 
          + parseInt(paginationButtonSize)/2 
          + parseInt(mainContentGap) 
          + 'px'
})
function handleSlideStart() {
  slideChanged.value = !slideChanged.value 
}
const objectPosition = computed(() => {
  slideChanged.value;
  return 'left-0'
  // return Math.random() < 2/3 ? 'left-0' : 'right-0'
})
onMounted(() => {
  const update = () => {
    if (containerRef.value)
      carouselHeight.value = containerRef.value.clientHeight
      carouselWidth.value = containerRef.value?.clientWidth
  }
  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
})
</script>

<template>
  <div class="w-full h-full min-h-0 flex flex-col z-10">
    <div class="h-full min-h-0 flex flex-col">
      <div ref="containerRef"  class="flex-1 h-full min-h-0">
        <Carousel
          :items-to-show="1"
          :gap="10"
          :height="carouselHeight"
          :wrap-around="true"
          :autoplay="8000" 
          :pause-autoplay-on-hover="true"
          slide-effect="fade"
          snap-align="center-odd"
          @slide-start="handleSlideStart"
        >
          <Slide v-for="photo in projet.photos" :key="photo.id">
            <div class="relative w-full h-full">
              <img 
                :src="useStrapiBaseUrl() + photo.url" 
                alt="photo" 
                class="absolute h-full"
                :class="objectPosition"
              />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style>
.carousel {
  overflow: visible !important;
}
.carousel__viewport {
  overflow: hidden;
}
.carousel__pagination {
  position: relative;
  gap: v-bind(paginationGap);
  bottom: 1rem; 
  left: calc(100% + v-bind(Xtranslate));
}
.carousel__pagination-button {
  height: v-bind(paginationButtonSize);
  width: v-bind(paginationButtonSize);
  border-radius: 0px;
  border: solid 1px var(--color-gray-300);
  background-color: white;
}
.carousel__pagination-button--active {
  background-color: rgb(0, 0, 0);
}
.carousel__slide {
  height: 100%;
  align-items: stretch;
}

</style>