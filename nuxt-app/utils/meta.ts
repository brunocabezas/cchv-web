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
  { name: "twitter:site", content: "@bobross" },
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
