<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import DesktopNavigation from './DesktopNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'

const route = useRoute()

const { data } = await useStrapi<{ data: any[] }>('services', 'services')

// récupère directement le tableau
const services = computed(() => {
  console.log('services', data.value)
  return data.value?.data || []
})

const servicesMenuItems = computed<NavigationMenuItem[]>(() => {
  return services.value.map(service => ({
    label: service.menuTitle,
    to: `/services/${toKebabCase(service.url)}`,
    active: route.path.startsWith(`/services/${toKebabCase(service.url)}`)
  }))
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
    active: route.path.startsWith('/services'),
    children : servicesMenuItems.value
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
        <NuxtLink to="/">
          <!-- <div class="font-bold text-xl">MAXISTUDIO</div> -->
          <img class="max-h-3" src="~/assets/img/logo-maxistudio-horizontal.png"/>
        </NuxtLink>
      </div>  
      <div class="text-xs ml-auto md:ml-0">
        <DesktopNavigation :items="items" />
        <MobileNavigation :items="items" />
      </div>
    </div>
</template>