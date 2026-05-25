export type StrapiPhoto = {
  id: number
  url: string
  [key: string]: any
}

export type PresentationItem = {
  id: number | string
  titre: string
  description: string
  photograph?: string
  date?: string
  location?: string
  type?: string
  photos?: StrapiPhoto[]
}

export type ProjectSchemaItem = PresentationItem

export type GalleryItem = {
  id: number | string
  titre: string
  subtitle?: string
  imgUrl: string
  link?: string
}

export interface Projet {
  id: number | string
  titre: string
  description: string
  photos: string[]
  location?: string
  date: string
}

export interface StrapiV4Media {
  id: number | string
  attributes?: {
    url?: string
  }
}

export interface StrapiV5Media {
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
