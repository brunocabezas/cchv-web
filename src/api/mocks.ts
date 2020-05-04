
import  MockAdapter from  "axios-mock-adapter";
import { AxiosInstance } from 'axios';
import apiRoutes from './apiRoutes';

export default (client: AxiosInstance) => {
  console.log('Setting up mocks', process.env);
  // if (process.env.VUE_APP_BASE_URL === )
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(client);

  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet(apiRoutes.HomeSlides).reply(200, {
    slides: `./mocks/${apiRoutes.HomeSlides}-200-get.json`,
  });

  mock.onGet()
}
