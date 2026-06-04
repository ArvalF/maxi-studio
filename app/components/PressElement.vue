<script setup lang="ts">
defineProps<{
  titre: string
  description: string
  lien: string
  imageUrl: string
}>()
</script>

<template>
  <div class="h-auto md:h-48 flex flex-col md:flex-row gap-0 w-full max-w-175 mb-15 font-serif ">
    <!-- Gauche: Image (40%) -->
    <div class="w-auto md:w-2/5 flex items-center justify-start overflow-hidden h-48 ">
      <a
        :href="lien"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-auto md:w-full h-full"
      >
        <img
          :src="imageUrl"
          :alt="titre"
          class="w-auto md:w-full h-full object-contain md:object-cover"
        >
      </a>
    </div>

    <!-- Droite: Texte (60%) -->
    <div class="w-full md:w-3/5 flex flex-col justify-start pl-0 md:pl-15 overflow-hidden">
      <h1 class="text-base italic font-bold mb-2">{{ titre }}</h1>
      <p class="text-sm mb-3">{{ description }}</p>
      <a
        :href="lien"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-auto text-sm underline"
      >
        Lire l’article complet ici
      </a>
    </div>
  </div>
</template>
