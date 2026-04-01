<script setup lang="ts">
import { select } from '#build/ui'

const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/projets?populate=photos&populate=types')
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
const selectedCategory = ref('')

const getProjetKey = (projet: any, index: number) => {
  return String(projet?.id ?? projet?.documentId ?? index)
}

const selectedProjet = computed(() => {
  return projets.value.find((projet, index) => getProjetKey(projet, index) === selectedProjetKey.value)
})

const filteredProjets = computed(() => {
  if (!selectedCategory.value) {
    return projets.value
  }
  return projets.value.filter((projet) => {
    if (!projet.types) return false
    return projet.types.some((type: any) => type.name === selectedCategory.value)
  })
})

function selectCategory(categoryName: string) {
  selectedCategory.value = categoryName
  if (filteredProjets.value.length > 0) {
    selectedProjetKey.value = getProjetKey(filteredProjets.value[0], 0)
  }
}

onMounted(() => {
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0].name
  }
  if (filteredProjets.value.length > 0) {
    selectedProjetKey.value = getProjetKey(filteredProjets.value[0], 0)
  }
})
</script>

<template>
  <MainContentSkeleton>
    <template #main-content>
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4">
          <div class="w-full">
            <!-- Listes des Catégories -->
            <div class="flex flex-row gap-4 mb-8 justify-items-start flex-wrap"> 
                <button
                v-for="(category, index) in categories"
                :key="category?.id ?? index"
                type="button"
                class="text-lg hover:underline"
                :class="selectedCategory === category.name ? 'underline' : ''"
                @click="selectCategory(category.name)"
              >
                {{ category.name.toUpperCase() }}
              </button>
            </div>

            <!-- Liste des projets -->
            <div class="flex flex-col w-max min-w-full min-h-0 pb-2 space-between overflow-x-auto">
              <button
                v-if="filteredProjets.length > 0"
                v-for="(projet, index) in filteredProjets"
                :key="getProjetKey(projet, index)"
                type="button"
                class="text-lg text-left hover:underline"
                :class="selectedProjetKey === getProjetKey(projet, index) ? 'underline' : ''"
                @click="selectedProjetKey = getProjetKey(projet, index)"
              >
                {{ projet.titre }}
              </button>
            </div>
          </div>

          <!-- Description du projet -->
          <div v-if="selectedProjet" class="flex flex-1 flex-col min-w-full min-h-0 justify-end pb-20">
            <h1 class="font-bold text-2xl mb-1">{{ selectedProjet.titre }}</h1>
            <div v-if="selectedProjet.location && selectedProjet.date" class="mb-6"><span class="italic font-2" v-if="selectedProjet.location">{{ selectedProjet.location }}</span>, <span v-if="selectedProjet.date">{{ selectedProjet.date }}</span></div>
           <div class="text-justify min-h-0 overflow-x-auto scrollbar-thin">{{ selectedProjet.description }}</div>
          </div>

          <!-- Nom du photographe -->
          <div v-if="selectedProjet?.photograph" class="flex flex-col min-w-full pb-2 items-start">
            <div class="text-right italic mr-2"> Photo by {{ selectedProjet.photograph }}</div>
          </div>
          <div class="h-1">
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
