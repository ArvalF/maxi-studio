<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'

const { data: projetsData } = await useStrapi<{ data: any[] }>('projets-home', 'projets', 'populate=couverture_projet')

const { data: pressesData } = await useStrapi<{ data: any[] }>(
  'presses-list',
  'presses',
  'populate=logo_magazine&populate=pdf_article&populate=couverture_magazine',
)

const { data: servicesData } = await useStrapi<{ data: any[] }>('services', 'services', 'populate=photos&populate=service_types')

const services = computed(() => {
  console.log('services', servicesData.value)
  return servicesData.value?.data || []
})

// récupère directement le tableau
const presses = computed(() => {
  console.log('presses', pressesData.value)
  return pressesData.value?.data || []
})

const projets = computed(() => {
  console.log('projets', projetsData.value)
  return projetsData.value?.data || []
})

const allContent = computed(() => {
  const projetsContent = projets.value.map(projet => ({
    id: projet.id,
    titre: projet.titre,
    subtitle: projet.location && projet.date ? `${projet.location}, ${projet.date}` : '',
    imgUrl: projet.couverture_projet?.formats?.thumbnail?.url || '',
    link: `/projets/${toKebabCase(projet.titre)}`
  }))

  const pressesContent = presses.value.map(press => ({
    id: press.id,
    titre: press.title,
    subtitle: press.publication,
    imgUrl: press.logo_magazine?.formats?.thumbnail?.url || '',
    link: press.printed ? useStrapiBaseUrl() + press.pdf_article.url : press.link
  }))

  const servicesContent = services.value.map(service => ({
    id: service.id,
    titre: service.titre,
    subtitle: "",
    imgUrl: service.photos?.[0]?.formats?.thumbnail?.url || '',
    link: `/services/${toKebabCase(service.titre)}`
  }))

  return [...projetsContent, ...pressesContent, ...servicesContent]
})

</script>
<template>
      <Gallery :items="allContent" /> 
</template>