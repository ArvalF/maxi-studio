<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'

const { data } = await useStrapi<{ data: any[] }>(
  'presses-list',
  'presses',
  'populate=logo_magazine&populate=pdf_article&populate=couverture_magazine',
)

// récupère directement le tableau
const presses = computed(() => {
  console.log('presses', data.value)
  return data.value?.data || []
})
</script>
<template>
      <Gallery :items="presses.map(press => ({
        id: press.id,
        titre: press.title,
        subtitle: press.publication,
        imgUrl: press.logo_magazine?.url || '',
        link: press.printed ? press.pdf_article.url : press.link

      }))" /> 
</template>
  <!-- <template>
    <MainContentSkeleton>
      <template #img-content>
          <div class="flex min-h-0 h-full">
          <div class="flex gap-4 items-center">
            <div v-for="press in presses">

              <a v-if="press.printed" :href="useStrapiBaseUrl() + press.pdf_article.url" target="_blank">
              <img :src="useStrapiBaseUrl() + press.logo_magazine.url" height="200rem" width="200rem">
              </a>
              <a v-else :href="press.link" target="_blank">
              <img :src="useStrapiBaseUrl() + press.logo_magazine.url" height="200rem" width="200rem">
              </a>
            </div>
          </div>
          </div>
      </template>
    </MainContentSkeleton>
  </template> -->
<style>
</style>
