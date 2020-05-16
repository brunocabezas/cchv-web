// Wordpress works with custom fields to provide data

import {
  CarouselKeys,
  NewsKeys,
  SponsorCategoryKeys,
  SponsorKeys,
  SocialNetworksKeys,
} from "./customFieldsKeysTypes"

// Here, they are defined
export type CustomFields =
  | Carousel
  | News
  | SponsorsCategory
  | Sponsor
  | SocialNetwork

//
// HOME PAGE
//

// SPONSORS
export type SponsorsCategory = {
  id: number
  [SponsorCategoryKeys.order]: number
  [SponsorCategoryKeys.sponsors]: Sponsor[]
}

export type Sponsor = {
  id: number
  [SponsorKeys.order]: number
  [SponsorKeys.url]: string
  // TODO Improve type def
  [SponsorKeys.logo]: string
}

// SOCIAL NETWORK
export type SocialNetwork = {
  id: number
  [SocialNetworksKeys.url]: string
}

// CAROUSEL
export type Carousel = {
  [CarouselKeys.images]: CarouselImage[]
}
export type CustomFieldValues =
  | Carousel[CarouselKeys.images]
  | NewsPost[NewsKeys.abstract]
  | NewsPost[NewsKeys.img]
  | NewsPost[NewsKeys.title]

export interface CarouselImage {
  ID: number
  id: number
  title: string
  filename: string
  url: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  date: string
  modified: string
  mime_type: string
  type: string
  icon: string
  width: number
  height: number
  sizes: ImageSizes
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
  [NewsKeys.title]: string
  [NewsKeys.date]: string
  [NewsKeys.abstract]: string
  // TODO improve type def
  [NewsKeys.img]: any
  [NewsKeys.id]: number
}
