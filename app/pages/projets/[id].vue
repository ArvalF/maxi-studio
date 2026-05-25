<script setup lang="ts">
import { toKebabCase } from '~/composables/utils';
import type { PresentationItem } from '~/types';

const route = useRoute()

const { data } = await useStrapi('projets', 'projets', 'populate=photos&populate=types')

const mounted = ref(false);
// récupère directement le tableau
const projets = computed<PresentationItem[]>(() => ((data.value as any)?.data ?? []))

const getProjetId = (projet: PresentationItem) => {
  return toKebabCase(projet.titre);
}

const selectedProjet = computed(() => {
  return projets.value.find((projet) => getProjetId(projet) === route.params.id)
})


onMounted(() => {
  mounted.value = true;
})
</script>

<template>
  <ItemPresentation v-if="selectedProjet" :item="selectedProjet" />
</template>
