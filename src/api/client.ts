import axios from "axios"
import setupMocks from './mocks';

const BASE_URL: string = process.env.VUE_APP_BASE_URL || "http://localhost"

if (!process.env.VUE_APP_BASE_URL) {
  console.warn(`API base url is not defined, it will default to ${BASE_URL}`)
}

const client = axios.create({
  baseURL: BASE_URL,
})

const enableMocks = process.env.VUE_APP_ENABLE_MOCKS;
if (enableMocks) {
  setupMocks(client);  
}

export default client
