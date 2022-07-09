import axios from 'axios';

export default () => axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
  headers: {
    clientAuth: process.env.VUE_APP_CLIENT_AUTH as string
  }
});
