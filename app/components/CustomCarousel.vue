<script setup lang="ts">
import type { StrapiPhoto } from '~/types';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { main } from '#build/ui';

const props = withDefaults(defineProps<{
  photos: StrapiPhoto[]
  paginationPaddingRight?: number | string
}>(), {
  paginationPaddingRight: 0,
})

const containerRef = ref<HTMLElement | null>(null)
const carouselHeight = ref(500)
const carouselWidth = ref()
const slideChanged = ref(true)
const paginationGap = '5px'
const paginationButtonSize = '10px'
const paginationPaddingRightValue = computed(() => {
  if (typeof props.paginationPaddingRight === 'number')
    return `${props.paginationPaddingRight}px`

  return props.paginationPaddingRight
})
const Xtranslate = computed(() => {
   return   - parseInt(paginationPaddingRightValue.value) 
            + parseInt(paginationButtonSize) 

            + 'px'
})
function handleSlideStart() {
  slideChanged.value = !slideChanged.value 
}
const objectPosition = computed(() => {
  slideChanged.value;
  return 'right-0'
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
          breakpoint-mode="carousel"
          @slide-start="handleSlideStart"
        >
          <Slide v-for="photo in photos" :key="photo.id">
            <div class="relative w-full h-full">
              <img 
                :src="useStrapiBaseUrl() + photo.url" 
                alt="photo" 
                class="absolute object-cover w-auto h-full"
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
  display: none;
  gap: v-bind(paginationGap);
  bottom: 1px;
  position: absolute;
  justify-content: left;
  left: 0;
  /* left: v-bind(Xtranslate); */
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