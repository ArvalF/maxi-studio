<script setup lang="ts">
const { data } = await useStrapi<{ data: any[] }>('services', 'services', 'populate=photos&populate=service_types')

// récupère directement le tableau
const services = computed(() => {
  console.log('services', data.value)
  return data.value?.data || []
})

const selectedServiceKey = ref('')

const getServiceKey = (service: any, index: number) => {
  return String(service?.id ?? service?.documentId ?? index)
}

const selectedService = computed(() => {
  return services.value.find((service, index) => getServiceKey(service, index) === selectedServiceKey.value)
})

</script>

<template>
      <Gallery :items="services.map(service => ({
        id: service.id,
        titre: service.titre,
        subtitle: '',
        imgUrl: service.photos?.[0]?.formats?.medium?.url || '',
        link: `/services/${toKebabCase(service.titre)}`
      }))" /> 
</template>
