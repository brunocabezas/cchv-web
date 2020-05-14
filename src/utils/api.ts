import { WPResponseItem } from "@/types/wordpressTypes"
import { CustomFieldsKeys, CustomFieldValues } from "@/types/customFieldsTypes"

// Gets advanced custom fields values from results
export const getCustomField = (
  responseItem: WPResponseItem,
  fieldName: CustomFieldsKeys,
  defaultValue: any = undefined
): CustomFieldValues =>
  (responseItem.acf_fields && responseItem.acf_fields[fieldName]) ||
  defaultValue

// Gets wordpress post title
export const getWPTitle = (responseITem: WPResponseItem): string =>
  (responseITem.title && responseITem.title.rendered) || ""
