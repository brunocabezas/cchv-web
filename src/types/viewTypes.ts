import { NewsKeys } from "./customFieldsTypes";

declare module View {
  type News = NewsPost[]
  interface NewsPost {
    [NewsKeys.title]: string,
    [NewsKeys.abstract]: string,
    [NewsKeys.date]: string,
    imageUrl: string,
    id: number,
  }
}

export default View;