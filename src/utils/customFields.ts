import { getWPTitle, getCustomField } from "./api";
import { NewsKeys } from '@/types/customFieldsTypes';
import { WpResponseData } from '@/types/wordpressTypes';
import View from '@/types/viewTypes';

const mapNewsToView = (state: WpResponseData) : View.News=>
 state.map(item => ({
  [NewsKeys.title]: getWPTitle(item),
  [NewsKeys.abstract]: getCustomField(item, NewsKeys.abstract),
  [NewsKeys.date]: getCustomField(item, NewsKeys.date),
  thumbnail: '',
  id: item.id,
}));

export default {
  mapNewsToView
}