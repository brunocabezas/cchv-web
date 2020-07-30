//
// Declares keys/attributes used to get
// custom fields values from the API
// The type of each key is defined on ./customFieldTypes.ts

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
  | DocumentKeys
  | TeamMembersKeys
  | VideoKeys
  | EditionKeys
  | ResidencyKeys

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
  activity_date = "activity_date",
  activity_calendar_url = "activity_calendar_url",
}

//
// Sponsors and categories
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

// Social Networks
export enum SocialNetworksKeys {
  url = "url",
  type = "social_network_key",
}

// Team members
export enum TeamMembersKeys {
  position = "position",
  order = "order",
  type = "type",
}

// Documents
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
  active_school_logo = "active_school_logo",
  logo = "logo",
  gallery = "gallery",
  is_workshop = "is_workshop",
  is_active = "is_active",
}

// Videos displayed on home
export enum VideoKeys {
  video_url = "video_url",
  order = "order",
}

export enum EditionKeys {
  text = "text",
  gallery = "gallery",
  video_url = "video_url",
  order = "order",
  date = "date",
}

export enum ResidencyKeys {
  text = "text",
  gallery = "gallery",
  video_url = "video_url",
  date = "date",
  end_date = "end_date",
}
