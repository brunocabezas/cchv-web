// Wordpress works with custom fields to provide data
import {
  CarouselImageKeys,
  NewsKeys,
  SponsorCategoryKeys,
  SponsorKeys,
  SocialNetworksKeys,
} from "./customFieldsKeysTypes"

export type CustomFields =
  | Carousel
  | News
  | SponsorsCategory
  | Sponsor
  | SocialNetwork

// TODO improve this type, should gather of custom fields
export type CustomFieldValues =
  // | Carousel[CarouselImageKeys.image]
  NewsPost[NewsKeys.abstract]

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
  [NewsKeys.related]: any
  [NewsKeys.video_url]: string
  [NewsKeys.gallery]: any
}
