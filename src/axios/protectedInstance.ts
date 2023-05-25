import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth/index";
import axiosInstance from "./publicInstance";
import { useRefreshToken } from "../composables/useRefreshToken";

const { refresh } = useRefreshToken();
const useAxiosPrivate = () => {
  let isRefreshing = false;
  let refreshPromise: Promise<string> | null = null;

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.withCredentials = true;
      const authStore = useAuthStore();
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
          refreshPromise = refresh()
            .then((newAccessToken) => {
              authStore.setAccessToken(newAccessToken);
              isRefreshing = false;
              refreshPromise = null;
              return newAccessToken;
            })
            .catch((err) => {
              console.log("I came here");
            });
        }

        if (refreshPromise) {
          await refreshPromise;
          prevRequest.sent = true;
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${authStore.accessToken}`;
          return axiosInstance(prevRequest);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosPrivate;
