// Wordpress works with custom fields to provide data
import {
  CarouselImageKeys,
  NewsKeys,
  SponsorCategoryKeys,
  SponsorKeys,
  SocialNetworksKeys,
  DocumentKeys,
  ProgramKeys,
  PageKeys,
  SchoolProgramKeys,
  ProgramVideoKeys,
  ActivityKeys,
} from "./customFieldsKeysTypes"
import { WpImage } from "./wordpressTypes"

// TODO Analyze why team member type def is not needed here

export type CustomFields =
  | Carousel
  | News
  | SponsorsCategory
  | Sponsor
  | SocialNetwork
  | Document
  | Page
  | Program
  | ProgramVideo
  | SchoolProgram

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

// SPONSOR / SPONSOR CATEGORY
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

// DOCUMENT
export type Document = {
  [DocumentKeys.link]: string
}

// PAGE
export type Page = {
  [PageKeys.text]: string
  [PageKeys.gallery]: any
  [PageKeys.extra_content]: PageExtraContent
}

export type PageExtraContent = "none" | "documents"

// PROGRAMS
export type Program = {
  [ProgramKeys.is_external]: boolean
  [ProgramKeys.url]: string
  [ProgramKeys.video_url]: string
  [ProgramKeys.gallery]: any
  [ProgramKeys.text]: string
  [ProgramKeys.extra_content]: ProgramExtraContent
}

export type ProgramExtraContent = "none" | "videos" | "schools" | "activities"

export type ProgramVideo = {
  [ProgramVideoKeys.url]: string
  [ProgramVideoKeys.text]: string
  [ProgramVideoKeys.year]: string
  [ProgramVideoKeys.author]: string
  [ProgramVideoKeys.country]: string
  [ProgramVideoKeys.duration]: string
}

export type SchoolProgram = {
  [SchoolProgramKeys.teachers]: string
  [SchoolProgramKeys.schedule]: string
  [SchoolProgramKeys.abstract]: string
  [SchoolProgramKeys.video_url]: string
  [SchoolProgramKeys.pdf]: string
  [SchoolProgramKeys.gallery]: any
  [SchoolProgramKeys.text]: string
  [SchoolProgramKeys.logo]: string
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

//
// Activities
//

export enum ActivityType {
  Movie = "movie_session",
  Conversations = "conversation",
}

export interface Activity {
  [ActivityKeys.abstract]: string
  [ActivityKeys.gallery]: WpImage[]
  [ActivityKeys.text]: string
  [ActivityKeys.type]: ActivityType
  [ActivityKeys.video_url]: string
}
