import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

function handleAxiosRequest(config: InternalAxiosRequestConfig) {
  return config;
}

function handleAxiosRequestError(error: unknown) {
  throw error;
}

function handleAxiosResponse(response: AxiosResponse<unknown, unknown>) {
  return response;
}

function handleAxiosResponseError(error: AxiosError) {
  throw error;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(handleAxiosRequest, handleAxiosRequestError);

api.interceptors.response.use(handleAxiosResponse, handleAxiosResponseError);
