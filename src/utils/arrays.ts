import {
  CarouselImage,
  Document,
  SponsorsCategory,
  Sponsor,
  Program,
  Edition,
} from "@/types"
import { TeamMember } from "@/types/customFieldsTypes"
import { TeamMemberPosition } from "@/utils/teamMembers"

export function filterUndef<T>(ts: (T | undefined)[]): T[] {
  return ts.filter((t: T | undefined): t is T => !!t)
}

type Sortable =
  | Program
  | Document
  | CarouselImage
  | Sponsor
  | SponsorsCategory
  | Edition
  | TeamMember
  | TeamMemberPosition

export function sortByOrder(a: Sortable, b: Sortable): number {
  return a.order - b.order
}
