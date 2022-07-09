import { AxiosResponse } from 'axios';
import Api from '@/services/api.service';
import NewUserInterface from '@/interfaces/user.register';

export default {
  async register(user: NewUserInterface): Promise<AxiosResponse> {
    return Api().post('/user/register', user);
  },
  async verify(token: string): Promise<AxiosResponse> {
    return Api().post('/user/verify', token);
  },
  async login(creds: Record<string, any>): Promise<AxiosResponse> {
    return Api().post('/user/login', creds);
  },
  async onlineActivate(id: string): Promise<AxiosResponse> {
    return Api().get(`/user/${id}/activate`);
  },
  async onlineDeactivate(id: string): Promise<AxiosResponse> {
    return Api().get(`/user/${id}/deactivate`);
  },
  async connectToRoom(id: string): Promise<AxiosResponse> {
    return Api().get(`/user/${id}/chat/room`)
  }
};
