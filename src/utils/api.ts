import { WPResponse } from '@/types/wordpressTypes';

// Gets advanced custom fields values from results
export const getAcfField = (
  results: WPResponse,
  fieldName: string,
  defaultValue: any = undefined
): any => (results.acf_fields && results.acf_fields[fieldName]) || defaultValue

// Gets wordpress post title
export const getWPTitle = (object: WPResponse): string =>
  (object.title && object.title.rendered) || ''