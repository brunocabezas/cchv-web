// Routes that provide data from api
export enum apiRoutes {
  // Home
  CarouselImages = "/carousel_images?per_page=100",
  HomeNews = "/news?per_page=2",
  News = "/news?per_page=100",
  NewsPost = "/news?per_page=100",
  Programs = "/program?per_page=100",
  ProgramVideos = "/videos?per_page=100",
  SchoolPrograms = "/school_program?per_page=100",
  Pages = "/cchv_page?per_page=100",
  Team = "/team?per_page=100",
  Documents = "/documents?per_page=100",
  Sponsors = "/sponsors?per_page=100",
  SponsorsCategories = "/sponsor_categories?per_page=100",
  SocialNetworks = "/social_networks?per_page=100",
  // TODO Add activities route
}

export default apiRoutes
