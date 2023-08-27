import { AuthApiService } from '@services/api/routes/authApiService';

class ApiService {
  url: string;
  auth: AuthApiService;
  constructor(url: string = 'http://localhost') {
    this.url = url;
    this.auth = new AuthApiService(url);
  }
}
