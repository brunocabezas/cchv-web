import { APP_URL, META_IMG_FALLBACK } from "./constants";

type MetaType = "website";

type Meta = {
  description: string;
  title: string;
  mainImage?: string;
};

export function extractContent(html: string): string {
  return html;
}

export default (meta: Meta) => [
  {
    hid: "description",
    name: "description",
    content: extractContent(meta.description)
  },
  { property: "og:site_name", content: "CChvV site name" },
  {
    hid: "og:type",
    property: "og:type",
    content: "website"
  },
  {
    hid: "og:url",
    property: "og:url",
    content: APP_URL
  },
  {
    hid: "og:title",
    property: "og:title",
    content: extractContent(meta.title)
  },
  {
    hid: "og:description",
    property: "og:description",
    content: extractContent(meta.description)
  },
  {
    hid: "og:image",
    property: "og:image",
    content: meta.mainImage || META_IMG_FALLBACK
  },
  { property: "og:image:width", content: "740" },
  { property: "og:image:height", content: "300" },
  { name: "twitter:site", content: "@cchv" },
  { name: "twitter:card", content: "summary_large_image" },
  {
    hid: "twitter:url",
    name: "twitter:url",
    content: APP_URL
  },
  {
    hid: "twitter:title",
    name: "twitter:title",
    content: extractContent(meta.title)
  },
  {
    hid: "twitter:description",
    name: "twitter:description",
    content: extractContent(meta.description)
  },
  {
    hid: "twitter:image",
    name: "twitter:image",
    content: meta.mainImage || META_IMG_FALLBACK
  }
];
