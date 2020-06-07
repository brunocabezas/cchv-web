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
  Movie = "movie_session",
  Conversations = "conversation",
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
  // TODO Program.url is not needed on viewType, which extends Program
  [ProgramKeys.url]?: string
  [ProgramKeys.video_url]: string
  [ProgramKeys.gallery]: any
  [ProgramKeys.text]: string
  [ProgramKeys.extra_content]: ProgramExtraContent
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

export type ProgramVideo = {
  [ProgramVideoKeys.url]?: string
  [ProgramVideoKeys.text]: string
  [ProgramVideoKeys.year]: string
  [ProgramVideoKeys.author]: string
  [ProgramVideoKeys.country]: string
  [ProgramVideoKeys.duration]: string
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
}
