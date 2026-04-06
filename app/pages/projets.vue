<script setup lang="ts">
const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/projets?populate=photos&populate=types')
const { data: types } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/types')

const mounted = ref(false);
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
  mounted.value = true;
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
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4 justify-between">
          <div class="w-full">
            <!-- Listes des Catégories -->
             <Transition name="category">
            <div v-if="mounted" class="flex flex-row gap-4 mb-2 justify-items-start flex-wrap animate-fade-in delay-1000"> 
                <button
                v-for="(category, index) in categories"
                :key="category?.id ?? index"
                type="button"
                class="text-sm hover:text-black transition duration-300"
                :class="selectedCategory === category.name ? 'text-black' : ' text-gray-300'"
                @click="selectCategory(category.name)"
              >
                {{ category.name.toUpperCase() }}
              </button>
            </div>
            </Transition> 


            <!-- Liste des projets -->
            <Transition name="projet-list">
              <div v-if="mounted" class="flex flex-col w-max min-w-full min-h-0 pb-2 space-between overflow-x-auto animate-fade-in delay-3000">
                <button
                  v-if="filteredProjets.length > 0"
                  v-for="(projet, index) in filteredProjets"
                  :key="getProjetKey(projet, index)"
                  type="button"
                  class="text-sm text-left  hover:text-black transition duration-300"
                  :class="selectedProjetKey === getProjetKey(projet, index) ? 'text-black' : ' text-gray-300'"
                  @click="selectedProjetKey = getProjetKey(projet, index)"
                >
                  {{ projet.titre.toUpperCase() }}
                </button>
              </div>
            </Transition>
          </div>

          <Transition name="projet">
            <!-- Description du projet -->
            <div v-if="selectedProjet && mounted" class="flex flex-1 flex-col min-w-full min-h-0 justify-start mt-4 pb-[2rem] font-serif animate-fade-in delay-5000">
              <!-- <h1 class="text-base italic font-bold">{{ selectedProjet.titre }}</h1> -->
              <div v-if="selectedProjet.location && selectedProjet.date" class="mb-2"><span class="text-base italic" v-if="selectedProjet.location">{{ selectedProjet.location }}</span>, <span v-if="selectedProjet.date">{{ selectedProjet.date }}</span></div>
             <div class="text-justify min-h-0 overflow-x-auto scrollbar-thin text-base italic">{{ selectedProjet.description }}</div>
            </div>
          </Transition>
          <Transition name="projet">
            <!-- Nom du photographe -->
            <div v-if="selectedProjet?.photograph && mounted" class="flex flex-col min-w-full items-start">
              <div class="text-right text-sm italic mr-2"> Photo by {{ selectedProjet.photograph }}</div>
            </div>
          </Transition>
          <div class="h-1">
          </div>
        </div>
    </template> 

    <template #img-content>
      <CustomCarousel
      v-if="selectedProjet"
      :projet="selectedProjet"
    />
    </template>
  </MainContentSkeleton>
</template>
<style scoped>
.category-enter-active,
.category-leave-active {
  transition: opacity 1s ease 0.1s;
}

.category-enter-from,
.category-leave-to {
  opacity: 0;
}

.projet-list-enter-active,
.projet-list-leave-active {
  transition: opacity 1s ease 0.3s;
}

.projet-list-enter-from,
.projet-list-leave-to {
  opacity: 0;
}

.projet-enter-active,
.projet-leave-active {
  transition: opacity 1s ease 0.5s;
}

.projet-enter-from,
.projet-leave-to {
  opacity: 0;
}
</style>
