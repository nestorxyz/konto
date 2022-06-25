import Axios from 'axios';

export const AxiosApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PRODUCTION_URL,
});
