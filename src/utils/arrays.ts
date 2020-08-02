import {
  CarouselImage,
  Document,
  SponsorsCategory,
  Sponsor,
  Program,
  Edition,
  Residency,
} from "@/types"
import { TeamMember } from "@/types/customFieldsTypes"
import { TeamMemberPosition } from "@/utils/teamMembers"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { CUSTOM_FIELDS_DATE_FORMAT } from "./static"

dayjs.extend(customParseFormat)

export function filterUndef<T>(ts: (T | undefined)[]): T[] {
  return ts.filter((t: T | undefined): t is T => !!t)
}

type SortableByOrder =
  | Program
  | Document
  | CarouselImage
  | Sponsor
  | SponsorsCategory
  | Edition
  | TeamMember
  | TeamMemberPosition

export function sortByOrder(a: SortableByOrder, b: SortableByOrder): number {
  return a.order - b.order
}

type SortableByDate = Residency

export function sortByDate(a: SortableByDate, b: SortableByDate): number {
  return dayjs(b.date, CUSTOM_FIELDS_DATE_FORMAT).diff(
    dayjs(a.date, CUSTOM_FIELDS_DATE_FORMAT)
  )
}
