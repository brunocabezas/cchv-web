import dayjs from "dayjs"
import { CUSTOM_FIELDS_DATE_FORMAT } from "./constants"

// Returns true if dateString is past
export const dateIsPast = (
  dateString: string,
  format = CUSTOM_FIELDS_DATE_FORMAT
): boolean => dayjs(dateString, format).isBefore(dayjs())
