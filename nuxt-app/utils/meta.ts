type MetaType = "website";

type Meta = {
  description: string;
  url: string;
  title: string;
  mainImage: string;
};

export default (meta: Meta) => [
  {
    hid: "description",
    name: "description",
    content: meta.description
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
    content: meta.url
  },
  {
    hid: "og:title",
    property: "og:title",
    content: meta.title
  },
  {
    hid: "og:description",
    property: "og:description",
    content: meta.description
  },
  {
    hid: "og:image",
    property: "og:image",
    content: meta.mainImage
  },
  { property: "og:image:width", content: "740" },
  { property: "og:image:height", content: "300" },
  { name: "twitter:site", content: "@cchv" },
  { name: "twitter:card", content: "summary_large_image" },
  {
    hid: "twitter:url",
    name: "twitter:url",
    content: meta.url
  },
  {
    hid: "twitter:title",
    name: "twitter:title",
    content: meta.title
  },
  {
    hid: "twitter:description",
    name: "twitter:description",
    content: meta.description
  },
  {
    hid: "twitter:image",
    name: "twitter:image",
    content: meta.mainImage
  }
];
