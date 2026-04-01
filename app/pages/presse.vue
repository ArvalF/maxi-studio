<script setup lang="ts">
const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/presses?populate=logo_magazine&populate=pdf_article&populate=couverture_magazine')

// récupère directement le tableau
const presses = computed(() => {
  console.log('presses', data.value)
  return data.value?.data || []
})
</script>

<template>
  <MainContentSkeleton>
    <template #img-content>
        <div class="flex">
          <div v-for="press in presses">

            <a v-if="press.printed" :href="useStrapiBaseUrl() + press.pdf_article.url" target="_blank">
            <img :src="useStrapiBaseUrl() + press.logo_magazine.url" height="200rem" width="200rem">
            </a>
            <a v-else :href="press.link" target="_blank">
            <img :src="useStrapiBaseUrl() + press.logo_magazine.url" height="200rem" width="200rem">
            </a>
          </div>
        </div>
    </template>
  </MainContentSkeleton>
</template>
<style>
</style>
