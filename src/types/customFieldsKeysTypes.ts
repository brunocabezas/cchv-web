//
// customFieldsKeysTypes declares the keys or attributes used by
// the custom fields provided by the API

// Only custom fields keys are declared here

// All custom fields attributes together
export type CustomFieldsKeys =
  | CarouselImageKeys.image
  | CarouselImageKeys.url
  | NewsKeys.abstract
  | NewsKeys.date
  | NewsKeys.img
  | NewsKeys.title
  | SponsorCategoryKeys.order
  | SponsorCategoryKeys.sponsors
  | SponsorKeys.order
  | SponsorKeys.logo
  | SponsorKeys.url
  | SocialNetworksKeys.url
  | TeamMembersKeys.position
  | DocumentKeys.link

// CAROUSEL
export enum CarouselImageKeys {
  image = "image",
  url = "url",
}

//
// NEWS
//
export enum NewsKeys {
  id = "id",
  title = "title",
  date = "date",
  abstract = "abstract",
  img = "img",
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
  link = "position",
}
