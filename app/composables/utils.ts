export const useStrapiBaseUrl = (): string => {
	const config = useRuntimeConfig()
	return config.public.cmsUrl || 'http://localhost:1337'
}

export function toKebabCase(str: string): string {
  return str
    // Normalise les accents (é → e, à → a, etc.)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    
    // Remplace tout ce qui n'est pas lettre ou chiffre par un espace
    .replace(/[^a-zA-Z0-9]+/g, " ")
    
    // Trim + lowercase
    .trim()
    .toLowerCase()
    
    // Remplace les espaces par des tirets
    .replace(/\s+/g, "-");
}