//
// customFieldsKeysTypes declares the keys or attributes used by
// the custom fields provided by the API

// All custom fields attributes together
export type CustomFieldsKeys =
  | CarouselKeys.images
  | NewsKeys.abstract
  | NewsKeys.date
  | NewsKeys.img
  | NewsKeys.title
  | SponsorCategoryKeys.order
  | SponsorCategoryKeys.sponsors
  | SponsorKeys.order
  | SponsorKeys.logo
  | SponsorKeys.url

// CAROUSEL
export enum CarouselKeys {
  images = "images",
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
