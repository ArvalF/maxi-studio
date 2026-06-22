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
    <div class="min-h-0 max-h-[100%] h-auto overflow-visible md:h-full md:overflow-hidden md:pl-71  xl:pr-30 2xl:pr-50">
      <!-- <Gallery :items="presses.map(press => ({
        id: press.id,
        titre: press.title,
        subtitle: press.publication,
        imgUrl: press.logo_magazine?.url || '',
        link: press.printed ? press.pdf_article.url : press.link

      }))" />  -->
    <div class="flex flex-col items-start justify-start ">
      <PressElement
        v-for="press in presses"
        :key="press.id"
        :titre="press.title"
        :description="press.description"
        :lien="press.printed ? useStrapiBaseUrl() + press.pdf_article.url : press.link"
        :imageUrl="useStrapiBaseUrl() + press.logo_magazine.url"
      />
    </div>
    </div>
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
