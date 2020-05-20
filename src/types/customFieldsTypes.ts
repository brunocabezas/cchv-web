// Wordpress works with custom fields to provide data
import {
  CarouselImageKeys,
  NewsKeys,
  SponsorCategoryKeys,
  SponsorKeys,
  SocialNetworksKeys,
  DocumentKeys,
} from "./customFieldsKeysTypes"

export type CustomFields =
  | Carousel
  | News
  | SponsorsCategory
  | Sponsor
  | SocialNetwork

// TODO improve this type, should gather custom fields values types
export type CustomFieldValues =
  | CarouselImage[CarouselImageKeys.image]
  | CarouselImage[CarouselImageKeys.url]
  | NewsPost[NewsKeys.abstract]
  | NewsPost[NewsKeys.related]
  | NewsPost[NewsKeys.video_url]
  | NewsPost[NewsKeys.abstract]
  | NewsPost[NewsKeys.text]
  | SponsorsCategory[SponsorCategoryKeys.order]
  | SponsorsCategory[SponsorCategoryKeys.sponsors]
  | SocialNetwork[SocialNetworksKeys.url]
  | SocialNetwork[SocialNetworksKeys.url]
  | Document[DocumentKeys.link]
  | any

// SPONSORS
export type SponsorsCategory = {
  [SponsorCategoryKeys.order]: number
  [SponsorCategoryKeys.sponsors]: Sponsor[]
}

export type Sponsor = {
  [SponsorKeys.order]: number
  [SponsorKeys.url]: string
  [SponsorKeys.logo]: string
}

// SOCIAL NETWORK
export type SocialNetwork = {
  [SocialNetworksKeys.url]: string
}

// DOCUMENTS
export type Document = {
  [DocumentKeys.link]: string
}

// CAROUSEL
export type Carousel = CarouselImage[]
export type CarouselImage = {
  [CarouselImageKeys.image]: string
  [CarouselImageKeys.url]: string
}

export interface ImageSizes {
  thumbnail: string
  "thumbnail-width": number
  "thumbnail-height": number
  medium: string
  "medium-width": number
  "medium-height": number
  medium_large: string
  "medium_large-width": number
  "medium_large-height": number
  large: string
  "large-width": number
  "large-height": number
}

//
// NEWS
//
export type News = NewsPost[]
export interface NewsPost {
  [NewsKeys.abstract]: string
  [NewsKeys.text]: string
  [NewsKeys.related]: number[]
  [NewsKeys.video_url]: string
  [NewsKeys.gallery]: any
}
