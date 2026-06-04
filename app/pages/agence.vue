<script setup lang="js">
import { computed } from 'vue'

const { data } = await useFetch(useStrapiBaseUrl() + '/api/about?populate[blocks][populate]=*')

// récupère directement le tableau
const aboutComponents = computed(() => {
  return data.value?.data || []
})
const textBody = computed(() => {
  return aboutComponents.value.blocks?.find(block => block.__component === 'shared.rich-text')?.body  
})

const imageUrl = computed(() => {
  const imageBlock = aboutComponents.value.blocks?.find(block => block.__component === 'shared.media')
  console.log('imageBlock', imageBlock)
  let url = imageBlock.file.formats.large.url ? useStrapiBaseUrl() + imageBlock.file.formats.large.url : "";
  return url
})

</script>

<template>
  <MainContentSkeleton>
    <template #img-content>
      <div class="h-auto md:h-full min-h-0 pr-10 md:pr-0">
        <img v-if="imageUrl" :src="imageUrl" alt="" class="block h-auto w-auto md:h-[700px] md:w-auto object-cover"/>
      </div>
    </template>
    <template #main-content>
      <div class="h-auto md:h-full min-h-0 overflow-visible md:overflow-auto text-sm font-serif pr-6 whitespace-pre-line" 
      v-html="$md(textBody)">
      </div>
    </template>
  </MainContentSkeleton>
</template>
