import { CustomFieldsKeys } from "./customFieldsKeysTypes"
import { CustomFieldsValue } from "./customFieldsTypes"

// Wordpres response
export type WpResponseData = WPResponseItem[]

// Similar to a wordpress post, but with custom fields defined
export interface WPResponseItem {
  id: number
  date: string
  date_gmt: string
  guid: WPGuid
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: WPTitle
  content: WPContent
  excerpt: WPExcerpt
  author: number
  featured_media: number
  parent: number
  menu_order: number
  comment_status: string
  ping_status: string
  template: string
  meta: any[]
  // Custom fields
  acf_fields: WPCustomFields
  _links: WPLinks
}

export type WPTitle = {
  rendered: string
}

export type WPGuid = {
  rendered: string
}

export interface WPContent {
  rendered: string
  protected: boolean
}

export interface WPExcerpt {
  rendered: string
  protected: boolean
}

export interface WPLinks {
  self: Link[]
  collection: Link[]
  about: Link[]
  author: Author[]
  replies: Reply[]
  "version-history": VersionHistory[]
  "predecessor-version": PredecessorVersion[]
  "wp:attachment": WpAttachment[]
  curies: Cury[]
}

interface Author {
  embeddable: boolean
  href: string
}

interface Reply {
  embeddable: boolean
  href: string
}

interface VersionHistory {
  count: number
  href: string
}

interface PredecessorVersion {
  id: number
  href: string
}

interface WpAttachment {
  href: string
}

interface Cury {
  name: string
  href: string
  templated: boolean
}

interface Link {
  href: string
}

export type WPCustomFields = {
  [key in CustomFieldsKeys]: CustomFieldsValue
}

// Image uploaded in wordpres media
export interface WpImage {
  ID: number
  id: number
  title: string
  filename: string
  url: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  date: string
  modified: string
  mime_type: string
  type: string
  icon: string
  width: number
  height: number
  sizes: WpImageSizes
}

interface WpImageSizes {
  thumbnail: string
  "thumbnail-width": number
  "thumbnail-height": number
  medium: string
  "medium-width": number
  "medium-height": number
  medium_large: string
  "medium_large-width": number
  "medium_large-height": number
  large: string
  "large-width": number
  "large-height": number
}

// Select input
export interface WPSelectCustomFieldValue<T> {
  value: T
  label: string
}

// Not used for now
export type WPRelatedCustomFieldValue = number[]

// Wordpress media uploaded documents
export type WPDocument = {
  ID: number
  id: number
  title: string
  filename: string
  url: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  date: string
  modified: string
  mime_type: string
  type: string
  icon: string
}

export const DEFAULT_WP_DOCUMENT = {
  ID: 0,
  id: 0,
  title: "",
  filename: "",
  url: "",
  alt: "",
  author: "",
  description: "",
  caption: "",
  name: "",
  date: "",
  modified: "",
  mime_type: "",
  type: "",
  icon: "",
}
