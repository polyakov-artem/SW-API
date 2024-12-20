import axios from 'axios';

export const BASE_URL = 'https://swapi-api.hbtn.io/api/';

const http = axios.create({
  baseURL: BASE_URL,
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
