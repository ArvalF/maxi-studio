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
  <MainContentSkeleton>
    <template #main-content>
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4 justify-between">
          <Transition name="projet">
            <!-- Description du projet -->
            <div v-if="selectedProjet && mounted" class="flex flex-1 flex-col min-w-full min-h-0 justify-start pb-[2rem] font-serif animate-fade-in delay-5000">
              <h1 class="text-base italic font-bold">{{ selectedProjet.titre }}</h1>
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
