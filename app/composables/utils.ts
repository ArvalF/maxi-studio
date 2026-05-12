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

export function getUuid(value?: string): string {
  if (!value) {
    return crypto.randomUUID()
  }

  const bytes = new Uint8Array(16)
  let hash = 2166136261

  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }

  for (let i = 0; i < 16; i++) {
    hash ^= hash << 13
    hash ^= hash >>> 17
    hash ^= hash << 5
    bytes[i] = hash & 0xff
  }

  bytes[6] = (bytes[6]! & 0x0f) | 0x40
  bytes[8] = (bytes[8]! & 0x3f) | 0x80

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}