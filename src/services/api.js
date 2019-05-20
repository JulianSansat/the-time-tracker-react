import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://api.floridatechsolutions.com"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => {
   return response;
}, error => {
  if (error.response.status === 401) {
  	console.log('401')
  }
  return error;
});

export default api;