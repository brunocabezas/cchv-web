// Routes that provide data from api
export enum apiRoutes {
  // Home
  CarouselImages = "/carousel_images?per_page=100",
  HomeNews = "/news?per_page=2",
  News = "/news?per_page=100",
  Programs = "/program?per_page=100",
  ProgramVideos = "/videos?per_page=100",
  SchoolPrograms = "/school_program?per_page=100",
  Pages = "/cchv_page?per_page=100",
  Videos = "/home_videos?per_page=100",
  // TODO remove when removing useTeam()
  Team = "/team",
  Documents = "/documents?per_page=100",
  Sponsors = "/sponsors?per_page=100",
  SponsorsCategories = "/sponsor_categories?per_page=100",
  SocialNetworks = "/social_networks?per_page=100",
  Activities = "/activities?per_page=100",
}

export default apiRoutes
