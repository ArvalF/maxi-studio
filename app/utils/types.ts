export interface Projet {
  id: number | string
  titre: string
  description: string
  photos: string[]
}

interface StrapiV4Media {
  id: number | string
  attributes?: {
    url?: string
  }
}

interface StrapiV5Media {
  id: number | string
  url?: string
}

export interface ProjetApi {
  id: number | string
  titre: string
  description: string
  photos?:
    | string[]
    | Array<string | StrapiV4Media | StrapiV5Media>
    | {
        data?: Array<StrapiV4Media | StrapiV5Media>
      }
}

export interface StrapiCollectionResponse<T> {
  data: T[]
}