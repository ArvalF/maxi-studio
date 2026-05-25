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
    <div class="relative grid grid-cols-[1fr_1fr] gap-1 items-end font-mono pr-5 pl-5 md:pr-20 md:pl-20 mb-10">
      <div class="">
        <NuxtLink to="/">
          <div class="font-bold text-xl">MAXISTUDIO</div>
          <!-- <img class="max-h-[4rem]" src="assets/img/maxistudio-logo.jpg"/> -->
        </NuxtLink>
      </div>  
      <div class="text-xs">
         <!-- Desktop: menu horizontal (visible uniquement à partir de md) -->
        <nav class="hidden md:flex justify-end">
          <ul class="inline-flex gap-4 flex-wrap  justify-items-stretch">
           <li
             v-for="item in items"
             :key="String(item.to ?? item.label)"
             class="min-w-12 decoration-0"
           >
           <NuxtLink
             :to="item.to"
             :class="{ active: item.active }"
             class="hover:text-black text-gray-300 flex items-center transition duration-300"
           >
             {{ item.label?.toUpperCase() }}
           </NuxtLink>
           </li>
          </ul>
         </nav>

         <!-- Mobile: bouton burger (visible uniquement sous md) -->
         <button
          class="md:hidden block w-fit ml-auto text-default"
          type="button"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Ouvrir le menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path></svg>
        </button>

        <!-- Mobile: menu overlay plein écran sous le header -->
        <nav
          v-if="isMobileMenuOpen"
          class="md:hidden absolute text-lg left-1/2 -translate-x-1/2 z-50 w-screen bg-color h-[calc(100dvh-100%)]"
        >
          <!-- Mobile: liste centrée verticalement avec items centrés -->
          <ul class="pt-30 flex flex-col gap-4 p-6 items-center">
            <li
              v-for="item in items"
              :key="String(item.to ?? item.label)"
              class="min-w-12 decoration-0"
            >
              <!-- Mobile: centrage horizontal du texte des liens -->
              <NuxtLink
                :to="item.to"
                :class="{ active: item.active }"
                class="hover:text-black text-gray-300 flex items-center justify-center text-center transition duration-300"
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
.bg-color {
  background-color: var(--bg-color);
}
</style>