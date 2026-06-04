<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// Mobile: état d'ouverture/fermeture du menu burger
const isMobileMenuOpen = ref(false)
const disableMobileMenuTransition = ref(false)

const mobileMenuTransitionName = computed(() => {
  return disableMobileMenuTransition.value ? 'mobile-menu-no-transition' : 'mobile-menu'
})

const closeMobileMenuImmediately = () => {
  disableMobileMenuTransition.value = true
  isMobileMenuOpen.value = false

  setTimeout(() => {
    disableMobileMenuTransition.value = false
  }, 0)
}

const toggleMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    closeMobileMenuImmediately()
    return
  }

  isMobileMenuOpen.value = true
}

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
    label: 'Agence',
    to: '/agence',
    active: route.path.startsWith('/agence')
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
    <div class="relative flex gap-15 items-end font-mono pr-5 pl-5 md:pr-25 md:pl-25 mb-10">
    <!-- <div class="relative grid grid-cols-[1fr_1fr] gap-1 items-end font-mono pr-5 pl-5 md:pr-25 md:pl-25 mb-10"> -->
      <div class="">
        <NuxtLink 
          to="/"
          @click="closeMobileMenuImmediately"
        >
          <!-- <div class="font-bold text-xl">MAXISTUDIO</div> -->
          <img class="max-h-3" src="~/assets/img/logo-maxistudio-horizontal.png"/>
        </NuxtLink>
      </div>  
      <div class="text-xs ml-auto md:ml-0">
         <!-- Desktop: menu horizontal (visible uniquement à partir de md) -->
        <nav class="hidden md:flex justify-end">
          <ul class="inline-flex gap-4">
           <li
             v-for="item in items"
             :key="String(item.to ?? item.label)"
             class="min-w-12 decoration-0"
           >
           <NuxtLink
             :to="item.to"
             :class="{ active: item.active }"
             class="hover:text-black text-gray-300 flex items-end leading-none transition duration-300"
           >
             <span style="transform: translateY(3px);">{{ item.label?.toUpperCase() }}</span>
           </NuxtLink>
           </li>
          </ul>
         </nav>

         <!-- Mobile: bouton burger (visible uniquement sous md) -->
         <button
          class="md:hidden block w-fit ml-auto text-default transition-transform duration-300"
          :class="{ 'rotate-90': isMobileMenuOpen }"
          type="button"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Ouvrir le menu"
          @click="toggleMobileMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="w-4 h-4"><line x1="12" y1="3" x2="12" y2="21"></line><line x1="3" y1="12" x2="21" y2="12"></line></svg>
        </button>

        <!-- Mobile: menu overlay plein écran sous le header -->
        <Transition :name="mobileMenuTransitionName">
          <nav
            v-if="isMobileMenuOpen"
            class="md:hidden absolute text-lg left-0 z-50 w-full bg-color h-[calc(100dvh-100%)]"
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              class="absolute inset-0 w-full h-full"
              @click="closeMobileMenuImmediately"
            />
            <!-- Mobile: liste centrée verticalement avec items centrés -->
            <ul class="relative pt-30 flex flex-col gap-4 p-6 items-center">
              <li
                v-for="item in items"
                :key="String(item.to ?? item.label)"
                class="min-w-12 decoration-0"
              >
                <!-- Mobile: centrage horizontal du texte des liens -->
                <NuxtLink
                  :to="item.to"
                  :class="{ active: item.active }"
                  class="hover:text-black text-gray-500 flex items-center justify-center text-center transition duration-300"
                  @click="closeMobileMenuImmediately"
                >
                  {{ item.label?.toUpperCase() }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </Transition>
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

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0.5;
  transform: translateY(20px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu-no-transition-enter-active,
.mobile-menu-no-transition-leave-active {
  transition: none;
}
</style>