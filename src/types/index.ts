import Urls from "@/utils/urls"
import * as CustomFields from "@/types/customFieldsTypes"
import { WpImage } from "./wordpressTypes"
import { SponsorCategoryKeys, ProgramKeys } from "./customFieldsKeysTypes"

// LAYOUT
export enum AboutPages {
  TeamPage,
  TransparencyPage,
}

export interface SubPage {
  label: string
  url: Urls
  id: Urls
}

export enum NavMenu {
  About,
  Programs,
  News,
}

export interface NavigationMenu {
  label: string
  url?: Urls
  id: NavMenu
  pages?: SubPage[]
  is_external?: boolean
}

//
// Types of entities rendered by components
// In most cases, these rely on definitions of CustomFields

// When a new attribute is required or type definition must change,
// the entity will have a type declared here, under the View module.
// This to provide components with the right data.

// Every attribute must be explained with comments, except id and name

export interface SocialNetwork extends CustomFields.SocialNetwork {
  id: number
  name: string
  iconName: string
  scale: number
}

// Sponsors
export interface TeamMember extends CustomFields.TeamMember {
  name: string
  id: number
}

export interface Activity {
  id: number
  name: string
  // Slug to build urls
  slug: String
  abstract: string
  gallery: WpImage[]
  text: string
  video_url: string
  activity_date: String
  activity_calendar_url: string
  type: CustomFields.ActivityType
  // If an activity is disabled, so does the link to the calendar
  activity_date_has_passed: boolean
}

export interface ProgramVideo extends CustomFields.ProgramVideo {
  id: number
  name: string
}

export interface Program
  extends Omit<CustomFields.Program, ProgramKeys.extra_content> {
  id: number
  name: string
  // Slug to build urls
  slug: string
  extra_content: string
}

export interface SchoolProgram extends CustomFields.SchoolProgram {
  id: number
  name: string
  // Slug to build urls
  slug: string
}

export interface Document {
  id: number
  name: string
  documentUrl: string
  order: number
}

export interface Page extends CustomFields.Page {
  id: number
  name: string
}

export interface Sponsor extends CustomFields.Sponsor {
  id: number
}

// Sponsors
export interface SponsorsCategory
  extends Omit<CustomFields.SponsorsCategory, SponsorCategoryKeys.sponsors> {
  name: string
  id: number
  sponsors: Sponsor[]
}

// News
export interface NewsPost extends CustomFields.NewsPost {
  id: number
  title: string
  // The first image url from gallery
  thumbnail: string
  // Date formatted with DATE_FORMAT
  date: string
  // Slug to build urls
  slug: string
  // If an activity is disabled, so does the link to the calendar
  activity_date_has_passed: boolean
}

// Not used
export interface RelatedNewsPost {
  id: number
  title: string
  // Slug to build urls
  slug: string
  // Date formatted with DATE_FORMAT
  date: string
  // The first image url from gallery
  thumbnail: string
}

export interface CarouselImage extends CustomFields.CarouselImage {
  id: number
  name: string
  isInternal: boolean
}

export interface Video extends CustomFields.Video {
  id: number
  name: string
}

export interface Edition extends CustomFields.Edition {
  id: number
  name: string
}

export interface Residency extends CustomFields.Residency {
  id: number
  name: string
  slug: string
  // Sames as dates, but with SHORT_DATE_FORMAT
  short_date: string
  short_end_date: string
}
