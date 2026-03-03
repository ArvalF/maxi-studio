<script setup lang="ts">
import { computed } from 'vue'

const { data } = await useFetch<{ data: any[] }>('http://localhost:1337/api/about?populate[blocks][populate]=*')

// récupère directement le tableau
const aboutComponents = computed(() => {
  return data.value?.data || []
})

</script>

<template>
  <div class="w-full h-full min-h-0 flex flex-col gap-4">
  <h1 class="font-bold text-xl">{{ aboutComponents.title }}</h1>
    <div
      v-for="block in aboutComponents.blocks"
      :key="block.id + '-' + block.__component"
    >
      <img v-if="block.__component === 'shared.media'" 
      :src="useStrapiBaseUrl() + block.file.url" 
      alt="">
      
      <div  v-if="block.__component === 'shared.rich-text'"
      >{{ block.body }}</div>
    </div>
  </div>
</template>
