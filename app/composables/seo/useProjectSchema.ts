import type { ProjectSchemaItem } from '~/types'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export const useProjectSchema = (item: MaybeRefOrGetter<ProjectSchemaItem | undefined>) => {
  const baseUrl = useStrapiBaseUrl()
  const project = computed(() => toValue(item))

  const seoTitle = computed(() => project.value?.titre || '')
  const seoDescription = computed(() => (project.value?.description || '').slice(0, 160))
  const seoImage = computed(() => {
    const firstPhoto = project.value?.photos?.[0]?.url
    return firstPhoto ? `${baseUrl}${firstPhoto}` : undefined
  })
  const seoKeywords = computed(() => {
    return [project.value?.type, project.value?.location, project.value?.photograph]
      .filter(Boolean)
      .join(', ')
  })

  useSeoMeta({
    title: () => seoTitle.value,
    description: () => seoDescription.value,
    ogTitle: () => seoTitle.value,
    ogDescription: () => seoDescription.value,
    ogType: 'article',
    ogImage: () => seoImage.value,
    twitterCard: () => (seoImage.value ? 'summary_large_image' : 'summary'),
    twitterTitle: () => seoTitle.value,
    twitterDescription: () => seoDescription.value,
    twitterImage: () => seoImage.value,
    author: () => project.value?.photograph,
    keywords: () => seoKeywords.value,
  })

  const schemaData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.value?.titre || undefined,
    description: project.value?.description || undefined,
    datePublished: project.value?.date || undefined,
    locationCreated: project.value?.location || undefined,
    creator: {
          '@type': 'Person',
          name: 'Lorenzo Mirante Maxistudio',
        },
    image: seoImage.value,
    genre: project.value?.type || undefined,
  }))

  useHead({
    script: [
      {
        id: 'project-creativework-schema',
        type: 'application/ld+json',
        innerHTML: computed(() => JSON.stringify(schemaData.value)),
      },
    ],
  })
}
