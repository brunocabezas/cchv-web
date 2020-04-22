import axios from "axios"
import  MockAdapter from  "axios-mock-adapter";

const BASE_URL: string = process.env.VUE_APP_BASE_URL || "http://localhost"

if (!process.env.VUE_APP_BASE_URL) {
  console.warn(`API base url is not defined, it will default to ${BASE_URL}`)
}

const client = axios.create({
  baseURL: BASE_URL,
})

const setupMocks = process.env.NODE_ENV === 'development' && !process.env.VUE_APP_NO_MOCKS;
if (setupMocks) {
  // if (process.env.VUE_APP_BASE_URL === )
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(client);
  
  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet("/users").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
  });
  
}

export default client
