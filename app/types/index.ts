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
  type?: string
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

export type StrapiMediaFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export type StrapiMedia = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
    [key: string]: StrapiMediaFormat | undefined
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type ServiceRichTextBlock = {
  __component: 'shared.rich-text'
  id: number
  body: string
}

export type ServiceMediaBlock = {
  __component: 'shared.media'
  id: number
  file: StrapiMedia
}

export type ServiceBeforeAfterBlock = {
  __component: 'my-components.before-after-visualizer'
  id: number
  before: StrapiMedia
  after: StrapiMedia
}

export type ServiceSliderBlock = {
  __component: 'shared.slider'
  id: number
  files: StrapiMedia[]
}

export type ServiceScrollableBlock =
  | ServiceRichTextBlock
  | ServiceMediaBlock
  | ServiceBeforeAfterBlock
  | ServiceSliderBlock

export type Service = {
  id: number
  documentId: string
  titre: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  url: string
  menuTitle: string
  scrollable: ServiceScrollableBlock[]
}
