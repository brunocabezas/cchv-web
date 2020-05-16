import {
  NewsKeys,
  SponsorCategoryKeys,
  SponsorKeys,
  CarouselImageKeys,
  SocialNetworksKeys,
  DocumentKeys,
} from "./customFieldsKeysTypes"
//
// Types of entities rendered by components
// In most cases, entities used by components should rely
// on type defs from customFieldTypes

// When a new attribute is required or type definition must change,
// the entity will have a type declared here, under the View module.
// This to provide components with the right data.

// customFieldsKeysTypes declares types of the keys/attributes used by each custom field.
// They must be used when building the corresponding custom field here,
// unless none of the custom field keys/attributes makes sense in the view layer
declare module View {
  // Arrays
  type News = NewsPost[]
  type Team = TeamMember[]
  type Carousel = CarouselImage[]

  interface NewsPost {
    id: number
    title: string
    [NewsKeys.abstract]: string
    [NewsKeys.text]: string
    [NewsKeys.gallery]: any
    [NewsKeys.related]: any
    [NewsKeys.video_url]: string
  }

  interface TeamMember {
    position: string
    name: string
    id: number
  }

  interface SponsorsCategory {
    name: string
    id: number
    [SponsorCategoryKeys.order]: number
    [SponsorCategoryKeys.sponsors]: Sponsor[]
  }

  interface Sponsor {
    id: number
    [SponsorKeys.order]: number
    [SponsorKeys.url]: string
    [SponsorKeys.logo]: string
  }

  interface CarouselImage {
    id: number
    name: string
    [CarouselImageKeys.image]: string
    [CarouselImageKeys.url]: string
  }

  interface SocialNetwork {
    id: number
    name: string
    [SocialNetworksKeys.url]: string
  }

  interface Document {
    id: number
    name: string
    [DocumentKeys.link]: string
  }
}

export default View
