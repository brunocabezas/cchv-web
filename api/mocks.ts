import MockAdapter from "axios-mock-adapter"
import { AxiosInstance } from "axios"
import apiRoutes from "./apiRoutes"
import homeVideosSuccess from "./mocks/home-videos-200-get.json"
import editionsSuccess from "./mocks/editions-200-get.json"
import documentSuccess from "./mocks/documents-200-get.json"
import carouselImages from "./mocks/carousel-images-200-get.json"
import sponsorCategoriesSuccess from "./mocks/sponsors-categories-200-get.json"
import sponsorsSuccess from "./mocks/sponsors-200-get.json"
import teamSuccess from "./mocks/team-200-get.json"
import socialNetworksSuccess from "./mocks/social-networks-200-get.json"
import programsSuccess from "./mocks/programs-200-get.json"
import programVideosSuccess from "./mocks/program-videos-200-get.json"
import customPagesSuccess from "./mocks/custom-pages-200-get.json"
import schoolProgramSuccess from "./mocks/school-programs-200-get.json"
import newsSuccess from "./mocks/news-200-get.json"

// In ms
const DELAY = 5000

export default (client: AxiosInstance) => {
  console.log("Setting up mocks")

  // Set mock adapter on the default axios instance (client)
  var mock = new MockAdapter(client, { delayResponse: DELAY })

  // Home Page
  mock.onGet(apiRoutes.CarouselImages).reply(200, carouselImages)
  mock.onGet(apiRoutes.Videos).reply(200, homeVideosSuccess)

  // Footer
  mock.onGet(apiRoutes.SocialNetworks).reply(200, socialNetworksSuccess)
  mock.onGet(apiRoutes.SponsorsCategories).reply(200, sponsorCategoriesSuccess)
  mock.onGet(apiRoutes.Sponsors).reply(200, sponsorsSuccess)

  // News
  mock.onGet(apiRoutes.News).reply(200, newsSuccess)
  // mock.onGet(apiRoutes.HomeNews).reply(200, newsSuccess)

  // Pages
  mock.onGet(apiRoutes.Pages).reply(200, customPagesSuccess)
  mock.onGet(apiRoutes.Documents).reply(200, documentSuccess)
  mock.onGet(apiRoutes.Team).reply(200, teamSuccess)

  // Programs
  mock.onGet(apiRoutes.Programs).reply(200, programsSuccess)
  mock.onGet(apiRoutes.ProgramVideos).reply(200, programVideosSuccess)
  mock.onGet(apiRoutes.SchoolPrograms).reply(200, schoolProgramSuccess)
  mock.onGet(apiRoutes.Editions).reply(200, editionsSuccess)
}
