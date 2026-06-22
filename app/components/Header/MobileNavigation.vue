<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  items: NavigationMenuItem[]
}>()

const route = useRoute()

const isMobileMenuOpen = ref(false)
const disableMobileMenuTransition = ref(false)
const openedItem = ref<string | null>(null)

const getItemKey = (item: NavigationMenuItem) => String(item.to ?? item.label)
const hasChildren = (item: NavigationMenuItem) => Array.isArray(item.children) && item.children.length > 0
const getChildren = (item: NavigationMenuItem) => (Array.isArray(item.children) ? item.children : []) as NavigationMenuItem[]

const toggleItem = (item: NavigationMenuItem) => {
  const key = getItemKey(item)
  openedItem.value = openedItem.value === key ? null : key
}

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

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  openedItem.value = null
})
</script>

<template>
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
      <ul class="relative pt-30 flex flex-col gap-4 p-6 items-center">
        <li
          v-for="item in props.items"
          :key="getItemKey(item)"
          class="min-w-12 decoration-0 text-center"
        >
          <!-- Item with children: toggle button -->
          <template v-if="hasChildren(item)">
            <button
              type="button"
              :class="{ active: item.active || openedItem === getItemKey(item) }"
              class="hover:text-black text-gray-500 flex items-center justify-center gap-1 transition duration-300 w-full"
              @click="toggleItem(item)"
            >
              {{ item.label?.toUpperCase() }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3 h-3 transition-transform duration-300"
                :class="openedItem === getItemKey(item) ? 'rotate-180' : ''"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <Transition name="submenu">
              <ul v-if="openedItem === getItemKey(item)" class="flex flex-col gap-2 mt-2 items-center mb-4">
                <li
                  v-for="child in getChildren(item)"
                  :key="getItemKey(child)"
                  class="decoration-0"
                >
                  <NuxtLink
                    :to="child.to"
                    :class="{ active: child.active }"
                    class="hover:text-black text-gray-400 text-sm flex items-center justify-center transition duration-300"
                    @click="closeMobileMenuImmediately"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </Transition>
          </template>

          <!-- Regular item: direct link -->
          <NuxtLink
            v-else
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
</template>

<style scoped>
.active {
  color: black;
}

button.active {
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

.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>