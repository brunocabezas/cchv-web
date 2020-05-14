import { getWPTitle, getCustomField } from "./api";
import { NewsKeys } from '@/types/customFieldsTypes';
import { WpResponseData } from '@/types/wordpressTypes';
import dayjs from 'dayjs'
import View from '@/types/viewTypes';
import { DATE_FORMAT } from './static';

const mapNewsToView = (state: WpResponseData) : View.News=>
 state.map(item => ({
  [NewsKeys.title]: getWPTitle(item),
  [NewsKeys.abstract]: getCustomField(item, NewsKeys.abstract),
  [NewsKeys.date]: dayjs(getCustomField(item, NewsKeys.date)).format(DATE_FORMAT),
  imageUrl: getCustomField(item, NewsKeys.img)[0].url,
  id: item.id,
}));

export default {
  mapNewsToView
}