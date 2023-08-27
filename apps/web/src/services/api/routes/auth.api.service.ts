import { LoginResponse, User } from '#interfaces/user/user.interface';
import axios, { AxiosResponse } from 'axios';

export class AuthApiService {
  url: string;
  constructor(url: string = 'http://localhost') {
    this.url = url;
  }

  login(user: User | null): Promise<LoginResponse> {
    if (!user) {
      return null;
    }
    return axios
      .post<User, AxiosResponse<LoginResponse>>('/api/auth/login', user)
      .then((response) => response.data);
  }
}
