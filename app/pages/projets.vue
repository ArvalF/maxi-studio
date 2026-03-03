<script setup lang="ts">
const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/projets?populate=photos')

// récupère directement le tableau
const projets = computed(() => {
  return data.value?.data || []
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
  <div class="w-full h-full min-h-0 flex flex-col gap-4">
    <div class="w-full overflow-x-auto">
      <div class="flex w-max min-w-full gap-2 pb-2">
        <button
          v-for="(projet, index) in projets"
          :key="getProjetKey(projet, index)"
          type="button"
          class="shrink-0 border border-black px-3 py-2 whitespace-nowrap"
          :class="selectedProjetKey === getProjetKey(projet, index) ? 'bg-black text-white' : 'bg-white text-black'"
          @click="selectedProjetKey = getProjetKey(projet, index)"
        >
          {{ projet.titre }}
        </button>
      </div>
    </div>

    <Project
      v-if="selectedProjet"
      :projet="selectedProjet"
    />
  </div>
</template>
