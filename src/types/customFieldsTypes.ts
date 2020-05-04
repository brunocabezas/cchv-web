// Wordpress works with custom fields to provide data
// Here, they are defined
export type CustomFields = Carousel | News;
// Every custom field has a set of attributes
export type CustomFieldsKeys = CarouselKeys.images | NewsKeys.abstract | NewsKeys.date | NewsKeys.img | NewsKeys.title 

//
// HOME PAGE
//

// CAROUSEL
export enum CarouselKeys { images="images" }
export type Carousel = {
  [CarouselKeys.images]: CarouselImage[]
}
export type CustomFieldValues = Carousel[CarouselKeys.images] | SingleNew[NewsKeys.abstract] | SingleNew[NewsKeys.img] | SingleNew[NewsKeys.title]

export interface CarouselImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  url: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  date: string;
  modified: string;
  mime_type: string;
  type: string;
  icon: string;
  width: number;
  height: number;
  sizes: ImageSizes;
}

export interface ImageSizes {
  thumbnail: string;
  'thumbnail-width': number;
  'thumbnail-height': number;
  medium: string;
  'medium-width': number;
  'medium-height': number;
  medium_large: string;
  'medium_large-width': number;
  'medium_large-height': number;
  large: string;
  'large-width': number;
  'large-height': number;
}

//
// NEWS
//
export type News = SingleNew[]
export enum NewsKeys { title="title", date="date", abstract="abstract", img="img" }

export interface SingleNew {
  [NewsKeys.title]: string,
  [NewsKeys.date]: string,
  [NewsKeys.abstract]: string,
  [NewsKeys.img]: any
}