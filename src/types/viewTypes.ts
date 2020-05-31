import {
  NewsKeys,
  SponsorCategoryKeys,
  SponsorKeys,
  CarouselImageKeys,
  SocialNetworksKeys,
  DocumentKeys,
  TeamMembersKeys,
  PageKeys,
  ProgramKeys,
  ProgramVideoKeys,
  SchoolProgramKeys,
} from "./customFieldsKeysTypes"
import { WpImage } from "./wordpressTypes"
import { PageExtraContent, ProgramExtraContent } from "./customFieldsTypes"
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
    // The first image url from gallery
    thumbnail: string
    date: string
    [NewsKeys.abstract]: string
    [NewsKeys.text]: string
    [NewsKeys.gallery]: WpImage[]
    [NewsKeys.related]: RelatedNewsPost[]
    [NewsKeys.video_url]: string
  }

  interface RelatedNewsPost {
    id: number
    title: string
    date: string
    thumbnail: string
  }

  interface TeamMember {
    name: string
    id: number
    [TeamMembersKeys.position]: string
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

  interface Page {
    id: number
    name: string
    [PageKeys.text]: string
    [PageKeys.gallery]: any
    [PageKeys.extra_content]: PageExtraContent
  }

  interface Program {
    id: number
    name: string
    url: string
    slug: string
    [ProgramKeys.text]: string
    [ProgramKeys.gallery]: any
    [ProgramKeys.is_external]: boolean
    [ProgramKeys.video_url]: string
    [ProgramKeys.extra_content]: ProgramExtraContent
  }

  interface SchoolProgram {
    id: number
    name: string
    [SchoolProgramKeys.logo]: string
    [SchoolProgramKeys.text]: string
    [SchoolProgramKeys.abstract]: string
    [SchoolProgramKeys.gallery]: any
    [SchoolProgramKeys.video_url]: string
    [SchoolProgramKeys.teachers]: string
    [SchoolProgramKeys.schedule]: string
    [SchoolProgramKeys.pdf]: string
  }

  interface ProgramVideo {
    id: number
    name: string
    [ProgramVideoKeys.text]: string
    [ProgramVideoKeys.url]: any
    [ProgramVideoKeys.duration]: boolean
    [ProgramVideoKeys.author]: string
    [ProgramVideoKeys.year]: string
    [ProgramVideoKeys.country]: ProgramExtraContent
  }
}

export default View
