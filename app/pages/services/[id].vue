<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ServiceScrollableBeforeAfter from '~/components/services/ServiceScrollableBeforeAfter.vue'
import ServiceScrollableCarousel from '~/components/services/ServiceScrollableCarousel.vue'
import ServiceScrollableMedia from '~/components/services/ServiceScrollableMedia.vue'
import ServiceScrollableRichText from '~/components/services/ServiceScrollableRichText.vue'
import type {
  Service,
  ServiceScrollableBlock,
  StrapiCollectionResponse,
} from '~/types'

const route = useRoute()
const strapiBaseUrl = useStrapiBaseUrl()

const { data } = await useFetch<StrapiCollectionResponse<Service>>(
  strapiBaseUrl + `/api/services?filters[url][$eq]=${route.params.id}&populate[scrollable][populate]=*`
)

const pageData = computed<Service | null>(() => {
  return data.value?.data?.[0] || null
})

const scrollable = computed<ServiceScrollableBlock[]>(() => {
  return pageData.value?.scrollable || []
})

const scrollableComponentMap = {
  'shared.rich-text': ServiceScrollableRichText,
  'shared.media': ServiceScrollableMedia,
  'my-components.before-after-visualizer': ServiceScrollableBeforeAfter,
  'shared.slider': ServiceScrollableCarousel,
} as const

const getScrollableComponent = (componentType: ServiceScrollableBlock['__component']) => {
  return scrollableComponentMap[componentType]
}
</script>

<template>
    <div class="min-h-0 max-h-[100%] h-auto overflow-visible md:h-full md:overflow-hidden md:pl-71 xl:pr-30 2xl:pr-50">
        <h1 class="mb-6 text-xs">{{ pageData?.titre }}</h1>
        <div class="max-w-[500px]">
            <component
              :is="getScrollableComponent(block.__component)"
              v-for="block in scrollable"
              :key="block.id"
              :block="block"
              :base-url="strapiBaseUrl"
              class="mb-6 last:mb-0"
            />
        </div>
    </div>
</template>