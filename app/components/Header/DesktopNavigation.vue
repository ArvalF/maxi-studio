<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  items: NavigationMenuItem[]
}>()

const navigationRef = ref<HTMLElement | null>(null)
const navItemPositions = ref<Record<string, number>>({})

const openedItem = ref<string | null>(null)

const getItemKey = (item: NavigationMenuItem) => String(item.to ?? item.label)

const hasChildren = (item: NavigationMenuItem) =>
  Array.isArray(item.children) && item.children.length > 0

const getChildren = (item: NavigationMenuItem) =>
  (Array.isArray(item.children) ? item.children : []) as NavigationMenuItem[]

const updateNavItemPosition = (item: NavigationMenuItem, el: HTMLElement | null) => {
  if (el) {
    const rect = el.getBoundingClientRect()
    navItemPositions.value[getItemKey(item)] = rect.left
  }
}

const isItemActive = (item: NavigationMenuItem) =>
  Boolean(item.active) || openedItem.value === getItemKey(item)

const selectMenuItem = (item: NavigationMenuItem, event?: MouseEvent) => {
  if (hasChildren(item)) {
    event?.preventDefault()

    const itemKey = getItemKey(item)
    openedItem.value = openedItem.value === itemKey ? null : itemKey
  }
  else {
    openedItem.value = null
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (!navigationRef.value?.contains(event.target as Node)) {
    openedItem.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="navigationRef" class="hidden md:block relative">
    <nav class="flex justify-end">
      <ul class="inline-flex gap-4">
        <li
          v-for="item in props.items"
          :key="getItemKey(item)"
          class="decoration-0 relative cursor-pointer"
          @mouseenter="(e) => updateNavItemPosition(item, (e.currentTarget as HTMLElement).querySelector('a'))"
        >
          <NuxtLink
            :to="item.to"
            :class="{ active: isItemActive(item) }"
            class="hover:text-black text-gray-300 flex items-end leading-none transition duration-300"
            @click="selectMenuItem(item, $event)"
          >
            <span style="transform: translateY(3px);">{{ item.label?.toUpperCase() }}</span>
          </NuxtLink>

          <ul
            v-if="hasChildren(item)"
            class="fixed left-0 flex w-screen gap-4 z-20 items-center bg-(--bg-color) pt-2.5 opacity-0"
            :class="openedItem === getItemKey(item) ? 'visible opacity-100 pointer-events-auto transition-opacity duration-300' : 'invisible pointer-events-none transition-opacity duration-300'"
            :style="{ paddingLeft: `${navItemPositions[getItemKey(item)]}px`, transform: 'translateY(3px)' }"
          >
            <li
              v-for="(child, index) in getChildren(item)"
              :key="getItemKey(child)"
              class="decoration-0"
              :class="{ 'ml-0': index === 0 }"
            >
              <NuxtLink
                :to="child.to"
                :class="{ active: child.active }"
                class="hover:text-black text-gray-300 flex items-end leading-none transition duration-300"
              >
                <span style="transform: translateY(3px);">{{ child.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.active {
  color: black;
}
</style>