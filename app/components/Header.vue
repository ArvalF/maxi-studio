<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// Mobile: état d'ouverture/fermeture du menu burger
const isMobileMenuOpen = ref(false)

// Mobile: fermeture automatique du menu au changement de page
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Projets',
    to: '/projets',
    active: route.path.startsWith('/projets')
  },
  {
    label: 'About',
    to: '/a-propos',
    active: route.path.startsWith('/a-propos')
  },
    {
    label: 'Services',
    to: '/services',
    active: route.path.startsWith('/services')
  },
    {
    label: 'Presse',
    to: '/presse',
    active: route.path.startsWith('/presse')
  },
  {
    label: 'Contact',
    to: '/contact',
    active: route.path.startsWith('/contact')
  }
])

</script>
<template>
    <div class="relative grid grid-cols-[5fr_2fr] gap-10 items-start">
      <div class="">
        <NuxtLink to="/">
          <div class="font-bold font-mono text-xl">MAXISTUDIO ASSOCIES</div>
          <!-- <img class="max-h-[4rem]" src="assets/img/maxistudio-logo.jpg"/> -->
        </NuxtLink>
      </div>  
      <div class="flex items-center justify-end md:block">
        <nav class="hidden md:flex">
          <ul class="inline-flex gap-4 flex-wrap  justify-items-stretch">
           <li
             v-for="item in items"
             :key="String(item.to ?? item.label)"
             class="min-w-12 decoration-0"
           >
           <NuxtLink
             :to="item.to"
             :class="{ active: item.active }"
             class="hover:text-black text-gray-300 flex items-center text-base transition duration-300"
           >
             {{ item.label?.toUpperCase() }}
           </NuxtLink>
           </li>
          </ul>
         </nav>

         <!-- Mobile: bouton burger (visible uniquement sous md) -->
         <button
          class="md:hidden ml-auto"
          type="button"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Ouvrir le menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          ☰
        </button>

        <!-- Mobile: menu overlay plein écran sous le header -->
        <nav
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-1/2 -translate-x-1/2 z-50 w-screen bg-white h-[calc(100dvh-100%)]"
        >
          <!-- Mobile: liste centrée verticalement avec items centrés -->
          <ul class="flex flex-col gap-4 p-6 items-center">
            <li
              v-for="item in items"
              :key="String(item.to ?? item.label)"
              class="min-w-12 decoration-0"
            >
              <!-- Mobile: centrage horizontal du texte des liens -->
              <NuxtLink
                :to="item.to"
                :class="{ active: item.active }"
                class="hover:text-black text-gray-300 flex items-center justify-center text-center text-base transition duration-300"
              >
                {{ item.label?.toUpperCase() }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
</template>

<style scoped>
.active {
  color: black;
} 
</style>