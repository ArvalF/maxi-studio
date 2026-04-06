<script setup lang="ts">
const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/projets?populate=photos&populate=types')
const { data: types } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/types')

// récupère directement le tableau
const projets = computed(() => {
  console.log('projets', data.value)
  return data.value?.data || []
})

const hoveredProjet = ref<Projet | null>(null)
</script>

<template>
        <div class="flex min-h-0 h-full items-center justify-center gap-6 flex-wrap">
          <template v-for="projet in projets" :key="projet.id">
            <div v-if="projet.photos && projet.photos.length > 0">
              <a href="">
                <img  
                class="h-50 w-70 grayscale-100 hover:grayscale-0"
                :src="useStrapiBaseUrl() + projet.photos[0].url" 
                alt=""
                @mouseover="hoveredProjet = projet"
                @mouseleave="hoveredProjet = null">
                <div
                  class="font-serif text-sm mt-2 h-15">
                  <Transition>
                    <div v-if="hoveredProjet && hoveredProjet.titre === projet.titre">
                      <p>{{ projet.titre }}</p>
                      <p>{{  projet.location }}, {{  projet.date }}</p>
                    </div>
                </Transition>
                </div>
              </a>
            </div>
          </template>

        </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
