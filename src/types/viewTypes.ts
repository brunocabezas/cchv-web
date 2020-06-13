import * as CustomFields from "@/types/customFieldsTypes"

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
}

export interface Activity extends CustomFields.Activity {
  id: number
  name: string
  // Slug to build urls
  slug: string
}

export interface ProgramVideo extends CustomFields.ProgramVideo {
  id: number
  name: string
}

export interface Program extends CustomFields.Program {
  id: number
  name: string
  // Slug to build urls
  slug: string
}

export interface SchoolProgram extends CustomFields.SchoolProgram {
  id: number
  name: string
  // Slug to build urls
  slug: string
}

export interface Document extends CustomFields.Document {
  id: number
  name: string
}

export interface Page extends CustomFields.Page {
  id: number
  name: string
}

// Sponsors
export interface SponsorsCategory extends CustomFields.SponsorsCategory {
  name: string
  id: number
}

export interface Sponsor extends CustomFields.Sponsor {
  id: number
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
}

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
}
