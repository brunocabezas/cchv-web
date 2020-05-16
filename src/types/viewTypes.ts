import { NewsKeys } from "./customFieldsKeysTypes"
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
  type News = NewsPost[]
  interface NewsPost {
    [NewsKeys.title]: string
    [NewsKeys.abstract]: string
    [NewsKeys.date]: string
    imageUrl: string
    id: number
  }
}

export default View
