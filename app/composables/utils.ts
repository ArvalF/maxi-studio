export const useStrapiBaseUrl = (): string => {
	return import.meta.env.NUXT_PUBLIC_CMS_URL || 'http://localhost:1337'
}
