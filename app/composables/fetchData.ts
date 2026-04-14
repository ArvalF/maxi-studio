// composables/useStrapi.ts
export function useStrapi<T>(key: string, endpoint: string, params?: string) {
  const url = computed(() => 
    useStrapiBaseUrl() + '/api/' + endpoint + (params ? '?' + params : '')
  )

  return useAsyncData<T>(
    key,
    () => $fetch<T>(url.value),
    // {
    //   getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
    // }
  )
}