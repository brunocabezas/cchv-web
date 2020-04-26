
import  MockAdapter from  "axios-mock-adapter";
import { AxiosInstance } from 'axios';

export default (client: AxiosInstance) => {
  console.log('Setting up mocks', process.env);
  // if (process.env.VUE_APP_BASE_URL === )
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(client);

  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet("/users").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
  });
}
