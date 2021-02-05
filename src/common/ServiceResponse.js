// this class serves as service response model
export default class ServiceResponse {
  isSuccess = true;
  errorMessage = null;
  payload = null;
  description = 'Success';

  Ok = (payload) => {
    this.payload = payload;
    this.isSuccess = true;
  }

  Error = (error) => {
    this.isSuccess = false;
    this.errorMessage = error.errorMessage;
    this.description = 'Internal error';
  }
}