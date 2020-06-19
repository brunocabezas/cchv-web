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
import { WpImage, WPSelectCustomFieldValue } from "./wordpressTypes"
import { RelatedNewsPost } from "./viewTypes"

//
// Uses customFieldsKeysTypes to build types represnting
// Wordpress custom fields
// Every type declared must be exported

// TODO use enum
export type ProgramExtraContent = "none" | "videos" | "schools" | "activities"

// declare module CustomFields {
export enum ActivityType {
  Movie = "movie",
  Conversation = "conversation",
  Concert = "concert",
  Performance = "performance",
}
// SOCIAL NETWORK
export enum SocialNetworkType {
  Facebook = "facebook",
  Youtube = "youtube",
  Instagram = "instagram",
}

export type SocialNetwork = {
  [SocialNetworksKeys.url]: string
  [SocialNetworksKeys.type]: WPSelectCustomFieldValue<SocialNetworkType>
}

// ACTIVITIES
export interface Activity {
  [ActivityKeys.abstract]: string
  [ActivityKeys.gallery]: WpImage[]
  [ActivityKeys.text]: string
  [ActivityKeys.type]: ActivityType
  [ActivityKeys.video_url]: string
}

//
// PROGRAMS
//
export type Program = {
  [ProgramKeys.is_external]: boolean
  [ProgramKeys.url]: string
  [ProgramKeys.video_url]: string
  [ProgramKeys.gallery]: any
  [ProgramKeys.text]: string
  [ProgramKeys.extra_content]: ProgramExtraContent
  [ProgramKeys.order]: number
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
  [SchoolProgramKeys.is_workshop]: boolean
}

export type ProgramVideo = {
  [ProgramVideoKeys.url]?: string
  [ProgramVideoKeys.text]: string
  [ProgramVideoKeys.year]: string
  [ProgramVideoKeys.author]: string
  [ProgramVideoKeys.country]: string
  [ProgramVideoKeys.thumbnail]: string
  [ProgramVideoKeys.event]: string
  [ProgramVideoKeys.duration]: string
}

// DOCUMENT
export type Document = {
  [DocumentKeys.link]: CustomFieldDocument
}

export type CustomFieldDocument = {
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
}

// PAGE
export type Page = {
  [PageKeys.text]: string
  [PageKeys.gallery]: any
  [PageKeys.extra_content]: PageExtraContent
}

// TODO use enum
type PageExtraContent = "none" | "documents"

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

// NEWS
export interface NewsPost {
  [NewsKeys.abstract]: string
  [NewsKeys.text]: string
  // TODO related must be related news post in viewTypes
  [NewsKeys.related]: number[] | RelatedNewsPost[]
  [NewsKeys.video_url]: string
  [NewsKeys.is_highlighted]: boolean
  [NewsKeys.gallery]: any
}

export interface CarouselImage {
  [CarouselImageKeys.image]: string
  [CarouselImageKeys.url]: string
  [CarouselImageKeys.video_url]: string
}
