<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'

const { data } = await useStrapi<{ data: any[] }>('projets-home', 'projets', 'populate=couverture_projet')

const projets = computed(() => {
  console.log('projets', data.value)
  return data.value?.data || []
})
</script>
<template>
      <Gallery :items="projets.map(projet => ({
        id: projet.id,
        titre: projet.titre,
        subtitle: projet.location && projet.date ? `${projet.location}, ${projet.date}` : '',
        imgUrl: projet.couverture_projet?.url || '',
        link: `/projets/${toKebabCase(projet.titre)}`
      }))" /> 
</template>