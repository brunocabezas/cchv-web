//
// customFieldsKeysTypes declares the keys/attributes used by
// the custom fields provided by the API

// Each custom field has it's keys define as enum
// the type of each key is defined on ./customFieldTypes.ts

// All custom fields attributes together
export type CustomFieldsKeys =
  | CarouselImageKeys.image
  | CarouselImageKeys.url
  | NewsKeys.abstract
  | NewsKeys.related
  | NewsKeys.text
  | NewsKeys.video_url
  | NewsKeys.gallery
  | NewsKeys.is_highlighted
  | SponsorCategoryKeys.order
  | SponsorCategoryKeys.sponsors
  | SponsorKeys.order
  | SponsorKeys.logo
  | SponsorKeys.url
  | SocialNetworksKeys.url
  | TeamMembersKeys.position
  | DocumentKeys.link
  | PageKeys.text
  | PageKeys.extra_content
  | PageKeys.gallery
  | ProgramKeys.is_external
  | ProgramKeys.url
  | ProgramKeys.text
  | ProgramKeys.video_url
  | ProgramKeys.gallery
  | ProgramKeys.extra_content
  | SchoolProgramKeys.text
  | SchoolProgramKeys.schedule
  | SchoolProgramKeys.teachers
  | SchoolProgramKeys.pdf
  | SchoolProgramKeys.video_url
  | SchoolProgramKeys.logo
  | SchoolProgramKeys.gallery
  | SchoolProgramKeys.abstract
  | ProgramVideoKeys.url
  | ProgramVideoKeys.text
  | ProgramVideoKeys.author
  | ProgramVideoKeys.duration
  | ProgramVideoKeys.country
  | ProgramVideoKeys.year
  | ActivityKeys.type
  | ActivityKeys.abstract
  | ActivityKeys.text
  | ActivityKeys.video_url
  | ActivityKeys.gallery
// CAROUSEL
export enum CarouselImageKeys {
  image = "image",
  url = "url",
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
}

// TEAM MEMBERS
export enum TeamMembersKeys {
  position = "position",
}

// TEAM MEMBERS
export enum DocumentKeys {
  link = "url",
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
  url = "external_url",
  text = "text",
  video_url = "video_url",
  gallery = "gallery",
  extra_content = "extra_content",
}

// Concurso juan downey videos
export enum ProgramVideoKeys {
  url = "url",
  text = "text",
  author = "author",
  duration = "duration",
  year = "year",
  country = "country",
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
}

// Activities
export enum ActivityKeys {
  type = "type",
  abstract = "abstract",
  text = "text",
  video_url = "video_url",
  gallery = "gallery",
}
