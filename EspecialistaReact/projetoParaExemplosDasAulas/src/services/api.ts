import axios, { AxiosInstance } from 'axios';

interface AxiosStaticConfig {
  baseURL: string;

}

declare module 'axios' {
  interface AxiosStatic {
    create(config?: AxiosRequestConfig): AxiosInstance;
  }
}

const config: AxiosStaticConfig = {
  baseURL: 'https://api.jikan.moe/v4/',
};

const axiosInstance: AxiosInstance = axios.create(config);

export default axiosInstance;