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
  <header class="header">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/">
        <img class="max-h-20" src="assets/img/maxistudio-logo.jpg"/>
      </NuxtLink>
      <nav class="hidden md:flex gap-6">
        <ul class="inline-flex">
         <li
           v-for="item in items"
           class="min-w-20 decoration-0"
         >
         <NuxtLink
           :to="item.to"
           :class="{ active: item.active }"
           class="hover:font-bold flex items-center m-w-5"
         >
           {{ item.label }}
         </NuxtLink>
         </li>
        </ul>
       </nav>
       <button class="md:hidden">
        ☰
      </button>
    </div>
     
  </header>
</template>

<style scoped>
.active {
  color: #f0a500;
  font-weight: bold;
} 
</style>