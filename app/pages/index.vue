<script setup lang="ts">
import { toKebabCase } from '@/composables/utils'
const { data } = await useStrapi<{ data: any[] }>('projets-home', 'projets', 'populate=couverture_projet')

// récupère directement le tableau
const projets = computed(() => {
  console.log('projets', data.value)
  return data.value?.data || []
})

const hoveredProjet = ref<Projet | null>(null)
</script>

<template>
        <div class="flex h-full min-h-0 mt-6 items-center justify-start gap-x-18 gap-y-6 flex-wrap overflow-y-auto pr-6">
          <template v-for="projet in projets" :key="projet.id">
            <div v-if="projet.couverture_projet" class="w-60">
              <a :href="`/projets/${toKebabCase(projet.titre)}`">
                <img  
                class="h-50 w-70 grayscale-100 hover:grayscale-0"
                :src="useStrapiBaseUrl() + projet.couverture_projet.url" 
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
