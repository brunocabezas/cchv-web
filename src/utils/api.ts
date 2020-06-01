import { WPResponseItem } from "@/types/wordpressTypes"
import { CustomFieldsKeys } from "@/types/customFieldsKeysTypes"
// import { CustomFieldValues } from "@/types/customFieldsTypes"

// Gets advanced custom fields values from results
export function getCustomField<T = string>(
  responseItem: WPResponseItem,
  fieldName: CustomFieldsKeys,
  defaultValue?: T
): T {
  return (
    (responseItem.acf_fields && responseItem.acf_fields[fieldName]) ||
    defaultValue
  )
}

// Gets wordpress post title
export const getWPTitle = (responseItem: WPResponseItem): string =>
  (responseItem.title && responseItem.title.rendered) || ""
