import { CarouselImage, Document, SponsorsCategory, Sponsor } from "@/types"

export function filterUndef<T>(ts: (T | undefined)[]): T[] {
  return ts.filter((t: T | undefined): t is T => !!t)
}

type Sortable = Document | CarouselImage | Sponsor | SponsorsCategory

export function sortByOrder(a: Sortable, b: Sortable): number {
  return a.order - b.order
}
