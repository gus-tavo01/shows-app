import axios from 'axios';
import { token } from '../constants/api';

export default class ShowsApi {
  constructor(apiUrl, timeout = 50000) {
    const endpoint = `${apiUrl}/3/tv`;
    this.timeout = timeout;
    const client = axios.create({
      baseURL: endpoint,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    client.interceptors.response.use((res) => res.data);
    this.instance = client;
  }

  getTopRated = async (filters) => this.instance.get('/top_rated', filters);
  getPopular = async (filters) => this.instance.get('/popular', filters);
  getTrending = async (time) => this.instance.get($`/trending/tv/${time}`);
}
