<script setup lang="ts">
import { useProjectSchema } from '~/composables/seo/useProjectSchema';

const { data } = await useStrapi<{ data: any[] }>('services', 'services', 'populate=photos&populate=service_types')
const { data: types } = await useStrapi<{ data: any[] }>('services-types', 'service-types')

const mounted = ref(false);
// récupère directement le tableau
const services = computed(() => data?.value?.data ?? [])

// récupère directement le tableau
const categories = computed(() => types?.value?.data ?? [])
const selectedServiceKey = ref('')
const selectedCategory = ref('')

const getServiceKey = (service: any, index: number) => {
  return String(service?.id ?? service?.documentId ?? index)
}

const selectedService = computed(() => {
  return services.value.find((service, index) => getServiceKey(service, index) === selectedServiceKey.value)
})

const filteredServices = computed(() => {
  if (!selectedCategory.value) {
    return services.value
  }
  return services.value.filter((service) => {
    if (!service.service_types) return false
    return service.service_types.some((type: any) => type.name === selectedCategory.value)
  })
})

function selectCategory(categoryName: string) {
  selectedCategory.value = categoryName
  if (filteredServices.value.length > 0) {
    selectedServiceKey.value = getServiceKey(filteredServices.value[0], 0)
  }
}

// Initialiser le schéma SEO au niveau de la page
useProjectSchema(() => selectedService.value)

onMounted(() => {
  mounted.value = true;
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0].name
  }
  if (filteredServices.value.length > 0) {
    selectedServiceKey.value = getServiceKey(filteredServices.value[0], 0)
  }
})
</script>

<template>
    <ItemPresentation v-if="selectedService" :item="selectedService" />
</template>
<style scoped>
.category-enter-active,
.category-leave-active {
  transition: opacity 1s ease 0.1s;
}

.category-enter-from,
.category-leave-to {
  opacity: 0;
}

.projet-list-enter-active,
.projet-list-leave-active {
  transition: opacity 1s ease 0.3s;
}

.projet-list-enter-from,
.projet-list-leave-to {
  opacity: 0;
}

.projet-enter-active,
.projet-leave-active {
  transition: opacity 1s ease 0.5s;
}

.projet-enter-from,
.projet-leave-to {
  opacity: 0;
}
</style>
