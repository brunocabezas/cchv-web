import MockAdapter from "axios-mock-adapter"
import { AxiosInstance } from "axios"
import apiRoutes from "./apiRoutes"
import homeCarouselSuccess from './mocks/home-carousel-200-get.json'
import newsSuccess from './mocks/news-200-get.json'

export default (client: AxiosInstance) => {
  console.log("Setting up mocks", process.env)
  // if (process.env.VUE_APP_BASE_URL === )
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(client, { delayResponse: 5000 })

  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet(apiRoutes.CarouselImages).reply(
    200,
    homeCarouselSuccess,
  );

  mock.onGet(apiRoutes.News).reply(
    200,
    newsSuccess,
  );

  mock.onGet(apiRoutes.HomeNews).reply(
    200,
    newsSuccess,
  );

  mock.onGet()
}
