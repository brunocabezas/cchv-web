import { WPResponseItem } from "@/types/wordpressTypes"
import { CustomFieldsKeys } from "@/types/customFieldsKeysTypes"
import { CustomFieldsValue } from "@/types/customFieldsTypes"

// Gets advanced custom fields values from results
export function getCustomFieldFromPost<T extends CustomFieldsValue>(
  responseItem: WPResponseItem,
  fieldName: CustomFieldsKeys,
  defaultValue: T
): T {
  return responseItem.acf_fields && responseItem.acf_fields[fieldName]
    ? (responseItem.acf_fields[fieldName] as T)
    : defaultValue
}

// Gets wordpress post title
export const getWPTitle = (responseItem: WPResponseItem): string =>
  (responseItem.title && responseItem.title.rendered) || ""
