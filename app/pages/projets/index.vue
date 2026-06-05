<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'

const { data } = await useStrapi<{ data: any[] }>('projets-home', 'projets', 'populate=couverture_projet')

const projets = computed(() => {
  console.log('projets', data.value)
  let items = data.value?.data || []
  // Trier les projets par date décroissante
  let ret =  items.sort(
  (a, b) => new Date(b.date_d_affichage) - new Date(a.date_d_affichage)
  );
  return ret
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