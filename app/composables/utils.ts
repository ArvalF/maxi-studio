export const useStrapiBaseUrl = (): string => {
	const config = useRuntimeConfig()
	return config.public.cmsUrl || 'http://localhost:1337'
}
