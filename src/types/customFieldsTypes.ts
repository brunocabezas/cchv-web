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
  VideoKeys,
  TeamMembersKeys,
  EditionKeys,
  ResidencyKeys,
} from "./customFieldsKeysTypes"
import { WpImage, WPSelectCustomFieldValue, WPDocument } from "./wordpressTypes"
import { RelatedNewsPost } from "./"
//
// Uses customFieldsKeysTypes to build types represnting
// Wordpress custom fields
// Every type declared must be exported

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

// TEAM
export enum TeamMemberType {
  Staff = "staff",
  Team = "team",
}
export interface TeamMember {
  [TeamMembersKeys.order]: number
  [TeamMembersKeys.position]: string
  [TeamMembersKeys.type]: TeamMemberType
}

// ACTIVITIES
export enum ActivityType {
  Movie = "movie",
  Conversation = "conversation",
  Concert = "concert",
  Performance = "performance",
  None = "none",
}

//
// PROGRAMS
//
export enum ProgramExtraContent {
  None = "none",
  Videos = "videos",
  Schools = "schools",
  Activities = "activities",
  ArtScienceAndCulture = "editions",
  Residencies = "residencies",
}

export type Program = {
  [ProgramKeys.is_external]: boolean
  [ProgramKeys.url]: string
  [ProgramKeys.video_url]: string
  [ProgramKeys.gallery]?: WpImage[]
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
  [SchoolProgramKeys.gallery]: WpImage[]
  [SchoolProgramKeys.text]: string
  [SchoolProgramKeys.logo]: string
  [SchoolProgramKeys.active_school_logo]: string
  [SchoolProgramKeys.is_workshop]: boolean
  [SchoolProgramKeys.is_active]: boolean
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
  [DocumentKeys.link]: WPDocument
  [DocumentKeys.order]: number
}

// PAGE
export type Page = {
  [PageKeys.text]: string
  [PageKeys.gallery]: WpImage[]
  [PageKeys.extra_content]: PageExtraContent
}

export enum PageExtraContent {
  None = "none",
  Documents = "documents",
}

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
  // TODO related must be related news post in types/index
  [NewsKeys.related]: number[] | RelatedNewsPost[]
  [NewsKeys.video_url]: string
  [NewsKeys.is_highlighted]: boolean
  [NewsKeys.is_activity]: ActivityType
  [NewsKeys.gallery]: WpImage[]
  [NewsKeys.activity_date]: string
  [NewsKeys.activity_calendar_url]: string
}

export interface CarouselImage {
  [CarouselImageKeys.image]: string
  [CarouselImageKeys.url]: string
  [CarouselImageKeys.video_url]: string
  [CarouselImageKeys.order]: number
}

export interface Video {
  [VideoKeys.video_url]: string
  [VideoKeys.order]: number
}

export interface Edition {
  [EditionKeys.order]: number
  [EditionKeys.gallery]: WpImage[]
  [EditionKeys.video_url]: string
  [EditionKeys.text]: string
}

export interface Residency {
  [ResidencyKeys.gallery]: WpImage[]
  [ResidencyKeys.date]: string
  [ResidencyKeys.video_url]: string
  [ResidencyKeys.text]: string
  [ResidencyKeys.end_date]: string
}
