import { CustomFieldValues } from "./customFieldsTypes"
import { CustomFieldsKeys } from "./customFieldsKeysTypes"

// Wordpres response
export type WpResponseData = WPResponseItem[]
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
  [key in CustomFieldsKeys]: CustomFieldValues
}

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
