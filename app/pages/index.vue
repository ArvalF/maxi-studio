<script setup lang="ts">
const visible = ref(true)
onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 1000)
})
</script>

<template>
  <!-- <Transition name="fade">
    <LandingAnimation v-if="visible" />
  </Transition> -->
 <UContainer class="mt-8">
    <h1 class="text-2xl font-bold mb-8">Bienvenue sur le portfolio de Maxi Studio</h1>
  </UContainer>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
