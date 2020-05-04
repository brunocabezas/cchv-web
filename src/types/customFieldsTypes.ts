// Wordpress works with custom fields to provide data
// Here, they are defined
export type CustomFields = Carousel;
// Every custom field has a set of attributes
export type CustomFieldsKeys = CarouselKeys

//
// HOME PAGE
//

// CAROUSEL
export type Carousel = CarouselImage[]
export enum CarouselKeys { images="images" }

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

// Response using WPResponse
// export interface 