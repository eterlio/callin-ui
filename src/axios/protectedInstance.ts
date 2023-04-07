import axios from "axios";
import { useAuthStore } from "../store/auth/index";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.accessToken) {
    (config as any).headers.Authorization = `Bearer ${authStore.accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      authStore.refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.post("/refresh-token", {
          refresh_token: authStore.refreshToken,
        });

        authStore.setTokens(data.accessToken, data.refreshToken);

        return axiosInstance(originalRequest);
      } catch (error) {
        authStore.clearTokens();

        throw error;
      }
    }

    throw error;
  }
);

export default axiosInstance;