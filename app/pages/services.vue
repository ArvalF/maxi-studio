<script setup lang="ts">
const { data } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/services?populate=photos&populate=service-types')
const { data: types } = await useFetch<{ data: any[] }>(useStrapiBaseUrl() + '/api/service-types')

// récupère directement le tableau
const services = computed(() => {
  console.log('services', data.value)
  return data.value?.data || []
})

// récupère directement le tableau
const categories = computed(() => {
  console.log('categories', types.value)
  return types.value?.data || []
})
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
    if (!service.types) return false
    return service.types.some((type: any) => type.name === selectedCategory.value)
  })
})

function selectCategory(categoryName: string) {
  selectedCategory.value = categoryName
  if (filteredServices.value.length > 0) {
    selectedServiceKey.value = getServiceKey(filteredServices.value[0], 0)
  }
}

onMounted(() => {
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0].name
  }
  if (filteredServices.value.length > 0) {
    selectedServiceKey.value = getServiceKey(filteredServices.value[0], 0)
  }
})
</script>

<template>
  <MainContentSkeleton>
    <template #main-content>
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4">
          <div class="w-full">
            <!-- Listes des Catégories -->
            <div class="flex flex-row gap-4 mb-8 justify-items-start flex-wrap"> 
                <button
                v-for="(category, index) in categories"
                :key="category?.id ?? index"
                type="button"
                class="text-base hover:underline"
                :class="selectedCategory === category.name ? 'underline' : ''"
                @click="selectCategory(category.name)"
              >
                {{ category.name.toUpperCase() }}
              </button>
            </div>

            <!-- Liste des services -->
            <div class="flex flex-col w-max min-w-full min-h-0 pb-2 space-between overflow-x-auto">
              <button
                v-if="filteredServices.length > 0"
                v-for="(service, index) in filteredServices"
                :key="getServiceKey(service, index)"
                type="button"
                class="text-base text-left hover:underline"
                :class="selectedServiceKey === getServiceKey(service, index) ? 'underline' : ''"
                @click="selectedServiceKey = getServiceKey(service, index)"
              >
                {{ service.titre }}
              </button>
            </div>
          </div>

          <!-- Description du service -->
          <div v-if="selectedService" class="flex flex-1 flex-col min-w-full min-h-0 justify-end pb-[2rem]">
            <h1 class="font-bold text-xl mb-1">{{ selectedService.titre }}</h1>
            <div v-if="selectedService.location && selectedService.date" class="mb-6"><span class="italic font-2" v-if="selectedService.location">{{ selectedService.location }}</span>, <span v-if="selectedService.date">{{ selectedService.date }}</span></div>
           <div class="text-justify min-h-0 overflow-x-auto scrollbar-thin">{{ selectedService.description }}</div>
          </div>

          <!-- Nom du photographe -->
          <div v-if="selectedService?.photograph" class="flex flex-col min-w-full pb-2 items-start">
            <div class="text-right italic mr-2"> Photo by {{ selectedService.photograph }}</div>
          </div>
          <div class="h-1">
          </div>
        </div>
    </template> 

    <template #img-content>
      <CustomCarousel
      v-if="selectedService"
      :service="selectedService"
    />
    </template>
  </MainContentSkeleton>
</template>
<style>
</style>
