<script setup lang="ts">
import { toKebabCase } from '~/composables/utils';

const route = useRoute()

const { data } = await useStrapi<{ data: any[] }>('projets', 'projets', 'populate=photos&populate=types')

const mounted = ref(false);
// récupère directement le tableau
const projets = computed(() => {
  console.log('projets', data.value)
  return data.value?.data || []
})

const getProjetId = (projet: Projet) => {
  return toKebabCase(projet.titre);
}

const selectedProjet = computed(() => {
    return projets.value.find((projet, index) => getProjetId(projet) === route.params.id)
})


onMounted(() => {
  mounted.value = true;
})
</script>

<template>
  <ItemPresentation v-if="selectedProjet" :item="selectedProjet" />
</template>
