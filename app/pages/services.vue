<script setup lang="ts">
const { data } = await useStrapi<{ data: any[] }>('services', 'services', 'populate=photos&populate=service_types')
const { data: types } = await useStrapi<{ data: any[] }>('services-types', 'service-types')

const mounted = ref(false);
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
  <MainContentSkeleton>
    <template #main-content>
        <div class="w-full min-h-0 overflow-hidden h-full flex flex-col gap-4">
          <div class="w-full">
            <!-- Listes des Catégories -->
             <Transition name="category">
            <div v-if="mounted" class="flex flex-row gap-4 mb-2 justify-items-start flex-wrap animate-fade-in delay-1000"> 
                <button
                v-for="(category, index) in categories"
                :key="category?.id ?? index"
                type="button"
                class="text-sm hover:text-black transition duration-300 cursor-pointer"
                :class="selectedCategory === category.name ? 'text-black' : ' text-gray-300'"
                @click="selectCategory(category.name)"
              >
                {{ category.name.toUpperCase() }}
              </button>
            </div>
            </Transition> 

            <!-- Liste des services -->
            <Transition name="projet-list">
              <div v-if="mounted" class="flex flex-col w-max min-w-full min-h-0 pb-2 space-between overflow-x-auto animate-fade-in delay-3000">
                <button
                  v-if="filteredServices.length > 0"
                  v-for="(service, index) in filteredServices"
                  :key="getServiceKey(service, index)"
                  type="button"
                  class="text-sm text-left  hover:text-black transition duration-300 cursor-pointer"
                  :class="selectedServiceKey === getServiceKey(service, index) ? 'text-black' : ' text-gray-300'"
                  @click="selectedServiceKey = getServiceKey(service, index)"
                >
                  {{ service.titre.toUpperCase() }}
                </button>
              </div>
            </Transition>
          </div>

          <Transition name="projet">
            <!-- Description du projet -->
            <div v-if="selectedService && mounted" class="flex flex-1 flex-col min-w-full min-h-0 justify-start mt-4 pb-[2rem] font-serif animate-fade-in delay-5000">
              <!-- <h1 class="text-base italic font-bold">{{ selectedService.titre }}</h1> -->
              <div v-if="selectedService.location && selectedService.date" class="mb-2"><span class="text-base italic" v-if="selectedService.location">{{ selectedService.location }}</span>, <span v-if="selectedService.date">{{ selectedService.date }}</span></div>
             <div class="text-justify min-h-0 overflow-x-auto pr-6 scrollbar-thin text-base italic">{{ selectedService.description }}</div>
            </div>
          </Transition>
          <Transition name="projet">
            <!-- Nom du photographe -->
            <div v-if="selectedService?.photograph && mounted" class="flex flex-col min-w-full items-start">
              <div class="text-right text-sm italic mr-2"> Photo by {{ selectedService.photograph }}</div>
            </div>
          </Transition>
          <div class="h-1">
          </div>
        </div>
    </template> 

    <template #img-content>
      <CustomCarousel
      v-if="selectedService"
      :projet="selectedService"
    />
    </template>
  </MainContentSkeleton>
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
