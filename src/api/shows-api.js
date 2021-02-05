import axios from 'axios';
import { token } from '../constants/api';

export default class ShowsApi {
  constructor(apiUrl, timeout = 50000) {
    const endpoint = `${apiUrl}/3`;
    this.timeout = timeout;
    const client = axios.create({
      baseURL: endpoint,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    client.interceptors.response.use(successCallback, errorCallback);
    this.instance = client;
  }

  getTopRated = async (filters) => this.instance.get(`/tv/top_rated?language=${filters.language}`);
  getPopular = async (filters) => this.instance.get(`/tv/popular?language=${filters.language}`);
  getTrending = async (time, filters) => this.instance.get(`/trending/tv/${time}?language=${filters.language}`);
  getById = async (id, filters) => this.instance.get(`/tv/${id}?language=${filters.language}`);
}

function successCallback(response) {
  return response.data
}

function errorCallback(error) {
  const payload = {
    isSuccess: false,
    errorMessage: error.message,
    statusCode: 500
  };

  if(error.response) {
    payload.errorMessage = error.response.data.status_message;
    payload.statusCode = error.response.status;
  } else if (error.request) { 
    payload.errorMessage = error.request.data.status_message;
    payload.statusCode = error.request.status;
  }  
  
  throw payload;
}