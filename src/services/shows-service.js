import ShowsApi from '../api/shows-api';
import { tmDbUrl, defaultLanguage } from '../constants/api';
import ServiceResponse from '../common/ServiceResponse';

export default class ShowsService {
  constructor() {
    this.showsApi = new ShowsApi(tmDbUrl);
  }

  getMostPopular = async (page) => {
    const serviceResponse = new ServiceResponse();
    try {
      const filters = {
        page,
        language: defaultLanguage
      }
      const apiResponse = await this.showsApi.getPopular(filters);
      serviceResponse.Ok(apiResponse);
    } catch(error) {
      serviceResponse.Error(error);
    }
    return serviceResponse;
  }

  getTopRated = async (page) => {
    const serviceResponse = new ServiceResponse();
    try {
      const filters = {
        page,
        language: defaultLanguage
      }
      const apiResponse = await this.showsApi.getTopRated(filters);
      serviceResponse.Ok(apiResponse);
    } catch(error) {
      serviceResponse.Error(error);
    }
    return serviceResponse;
  }

  getTrending = async (page) => {
    const serviceResponse = new ServiceResponse();
    try {
      const showTime = 'week';
      const filters = {
        language: defaultLanguage
      }
      const apiResponse = await this.showsApi.getTrending(showTime, filters);
      serviceResponse.Ok(apiResponse);
    } catch(error) {
      serviceResponse.Error(error);
    }
    return serviceResponse;
  }

  getDetails = async (id) => {
    const serviceResponse = new ServiceResponse();
    try {
      const filters = {
        language: defaultLanguage
      };
      const apiResponse = await this.showsApi.getById(id, filters);
      serviceResponse.Ok(apiResponse);
    } catch(error) {
      serviceResponse.Error(error);
    }
    return serviceResponse;
  }
}