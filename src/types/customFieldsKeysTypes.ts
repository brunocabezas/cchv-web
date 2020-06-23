//
// customFieldsKeysTypes declares the keys/attributes used by
// the custom fields provided by the API

import { Document } from "./viewTypes"

// Each custom field has it's keys define as enum
// the type of each key is defined on ./customFieldTypes.ts

// All custom fields attributes together
export type CustomFieldsKeys =
  | CarouselImageKeys
  | NewsKeys
  | SponsorCategoryKeys
  | SponsorKeys
  | PageKeys
  | SocialNetworksKeys
  | ProgramKeys
  | ProgramVideoKeys
  | SchoolProgramKeys
  | ActivityKeys
  | DocumentKeys
  | TeamMembersKeys

// CAROUSEL
export enum CarouselImageKeys {
  image = "image",
  url = "url",
  video_url = "video_url",
  order = "order",
}

//
// NEWS
//
export enum NewsKeys {
  video_url = "video_url",
  text = "text",
  gallery = "gallery",
  abstract = "abstract",
  related = "related",
  is_highlighted = "is_highlighted",
  is_activity = "is_activity",
}

//
// SPONSORS
//
export enum SponsorCategoryKeys {
  sponsors = "sponsors",
  order = "order",
}

export enum SponsorKeys {
  order = "order",
  logo = "logo",
  url = "url",
}

// SOCIAL NETWORKS
export enum SocialNetworksKeys {
  url = "url",
  type = "social_network_key",
}

// TEAM MEMBERS
export enum TeamMembersKeys {
  position = "position",
}

// DOCUMENT
export enum DocumentKeys {
  link = "url",
  order = "order",
}

// Page
export enum PageKeys {
  text = "text",
  extra_content = "extra_content",
  gallery = "gallery",
}

// Programs
export enum ProgramKeys {
  is_external = "is_external",
  url = "nav_menu_url",
  text = "text",
  video_url = "video_url",
  gallery = "gallery",
  extra_content = "extra_content",
  order = "order",
}

// Concurso juan downey videos
export enum ProgramVideoKeys {
  url = "url",
  text = "text",
  author = "author",
  duration = "duration",
  year = "year",
  country = "country",
  thumbnail = "thumbnail",
  event = "event",
}

// School Programs
export enum SchoolProgramKeys {
  text = "text",
  abstract = "abstract",
  schedule = "schedule",
  teachers = "teachers",
  pdf = "pdf",
  video_url = "video_url",
  logo = "logo",
  gallery = "gallery",
  is_workshop = "is_workshop",
}

// Activities
export enum ActivityKeys {
  type = "type",
  abstract = "abstract",
  text = "text",
  video_url = "video_url",
  gallery = "gallery",
}
