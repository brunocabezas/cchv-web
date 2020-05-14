// Routes that provide data from api
export enum apiRoutes {
  CarouselImages = '/carousel_images?per_page=1',
  HomeNews = '/news?per_page=2',
  News = '/news?per_page=100',
  NewsPost = '/news?per_page=100',
  // Media = '/cchv-tv',
  Sponsors = '/sponsors_categories?per_page=100',
  SocialNetworks = '/social_networks?per_page=100',
  Team = '/team?per_page=100',
  Documents = '/documents?per_page=100', 
  Videos = '/videos?per_page=100',
  // TODO Add pages and programs routes
}

export default apiRoutes 