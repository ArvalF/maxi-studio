<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

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
    <div class="grid grid-cols-[5fr_2fr] gap-10 items-center">
      <div class="">
        <NuxtLink to="/">
          <img class="max-h-40" src="assets/img/maxistudio-logo.jpg"/>
        </NuxtLink>
      </div>  
      <div>
        <nav class="hidden md:flex">
          <ul class="inline-flex gap-6 flex-wrap  justify-items-stretch">
           <li
             v-for="item in items"
             class="min-w-20 decoration-0"
           >
           <NuxtLink
             :to="item.to"
             :class="{ active: item.active }"
             class="hover:underline flex items-center text-lg"
           >
             {{ item.label?.toUpperCase() }}
           </NuxtLink>
           </li>
          </ul>
         </nav>
         <button class="md:hidden">
          ☰
        </button>
      </div>
    </div>
</template>

<style scoped>
.active {
  text-decoration: underline;
} 
</style>