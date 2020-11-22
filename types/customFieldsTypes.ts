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

export type CustomFieldsValue =
  | string
  | number
  | boolean
  | WpImage[]
  | WPDocument
  | number[]
  | ActivityType
  | WPSelectCustomFieldValue<SocialNetworkType>
  | WPSelectCustomFieldValue<ProgramExtraContent>
  | TeamMemberType

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
  [ProgramKeys.extra_content]: WPSelectCustomFieldValue<ProgramExtraContent>
  [ProgramKeys.order]: number
  [ProgramKeys.short_name]: string
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

// PAGE
// Static pages as team or transparency
export type Page = {
  [PageKeys.text]: string
  [PageKeys.gallery]: WpImage[]
  [PageKeys.extra_content]: PageExtraContent
}

export enum PageExtraContent {
  None = "none",
  Documents = "documents",
}

// DOCUMENT
export type Document = {
  [DocumentKeys.link]: WPDocument
  [DocumentKeys.order]: number
}

// SPONSOR / SPONSOR CATEGORY
// N sponsors can belong to 1 sponsor category
// categories and sponsors inside them are sorted by it's order attribute
export type SponsorsCategory = {
  [SponsorCategoryKeys.order]: number
  [SponsorCategoryKeys.sponsors]: number[]
}

export type Sponsor = {
  [SponsorKeys.order]: number
  [SponsorKeys.url]: string
  [SponsorKeys.logo]: string
}

// NEWS
// A news post can also be an activity
export interface NewsPost {
  [NewsKeys.abstract]: string
  [NewsKeys.text]: string
  // Disabled
  // [NewsKeys.related]: number[] | RelatedNewsPost[]
  // Whether is on
  [NewsKeys.is_highlighted]: boolean
  // Media
  [NewsKeys.gallery]: WpImage[]
  [NewsKeys.video_url]: string
  // Activity date fields
  [NewsKeys.is_activity]: ActivityType
  [NewsKeys.activity_date]: string
  [NewsKeys.activity_calendar_url]: string
}

// ACTIVITIES
// A type of NewsPost, each activty has a date, a calendar link
export enum ActivityType {
  Movie = "movie",
  Conversation = "conversation",
  Concert = "concert",
  Performance = "performance",
  None = "none",
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
  [EditionKeys.video_url]: string
  [EditionKeys.text]: string
  [EditionKeys.date]: string
  [EditionKeys.brochure_url]: string
  [EditionKeys.url]: string
}

export interface Residency {
  [ResidencyKeys.gallery]: WpImage[]
  [ResidencyKeys.date]: string
  [ResidencyKeys.video_url]: string
  [ResidencyKeys.text]: string
  [ResidencyKeys.end_date]: string
}
