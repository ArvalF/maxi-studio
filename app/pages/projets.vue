<script setup lang="ts">
const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/projets?populate=photos')
const { data: types } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/types')

// récupère directement le tableau
const projets = computed(() => {
  console.log('projets', data.value)
  return data.value?.data || []
})

// récupère directement le tableau
const categories = computed(() => {
  console.log('categories', types.value)
  return types.value?.data || []
})
const selectedProjetKey = ref('')

const getProjetKey = (projet: any, index: number) => {
  return String(projet?.id ?? projet?.documentId ?? index)
}

const selectedProjet = computed(() => {
  return projets.value.find((projet, index) => getProjetKey(projet, index) === selectedProjetKey.value)
})

watch(
  projets,
  (nextProjets) => {
    if (!nextProjets.length) {
      selectedProjetKey.value = ''
      return
    }

    const hasSelected = nextProjets.some((projet, index) => getProjetKey(projet, index) === selectedProjetKey.value)
    if (!hasSelected) {
      selectedProjetKey.value = getProjetKey(nextProjets[0], 0)
    }
  },
  { immediate: true }
)
</script>

<template>
  <MainContentSkeleton>
    <template #main-content>
        <div class="w-full h-full min-h-0 flex flex-col gap-4">
    <div class="w-full overflow-x-auto">
      <div class="flex flex-row"> 
          <button
          v-for="(category, index) in categories"
          :key="category?.id ?? index"
          type="button"
          class="text-left"
        >
          {{ category.name }}
        </button>
      </div>
      <div class="flex flex-col w-max min-w-full gap- pb-2">
        <button
          v-for="(projet, index) in projets"
          :key="getProjetKey(projet, index)"
          type="button"
          class="text-left"
          :class="selectedProjetKey === getProjetKey(projet, index) ? 'underline' : ''"
          @click="selectedProjetKey = getProjetKey(projet, index)"
        >
          {{ projet.titre }}
        </button>
      </div>
    </div>
  </div>
    </template> 

    <template #img-content>
      <Project
      v-if="selectedProjet"
      :projet="selectedProjet"
    />
    </template>
  </MainContentSkeleton>
</template>
<style>
</style>
