import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth/index";
import axiosInstance from "./publicInstance";
import { useRefreshToken } from "../composables/useRefreshToken";

const useAxiosPrivate = () => {
  const { refresh } = useRefreshToken();
  let isRefreshing = false;

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authStore = useAuthStore();
      config.withCredentials = true;
      if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
      }

      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const authStore = useAuthStore();
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newAuthToken = await refresh();
            authStore.setAccessToken(newAuthToken);
            isRefreshing = false;
            prevRequest.sent = true;
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${authStore.accessToken}`;
            return axiosInstance(prevRequest);
          } catch (err) {
            console.log("I came here");
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosPrivate;
