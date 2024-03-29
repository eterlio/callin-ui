import { defineStore } from "pinia";
import axiosInstance from "../../axios/publicInstance";
import { useUserStore } from "../users";
interface AuthState {
  accessToken: string;
}

interface AuthGetters {
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    accessToken: "",
  }),
  getters: {
    isAuthenticated(): AuthGetters["isAuthenticated"] {
      return !!this.accessToken;
    },
  },
  actions: {
    setTokens(accessToken: string): void {
      this.accessToken = accessToken;
    },
    setAccessToken(accessToken: string): void {
      this.accessToken = accessToken;
    },
    clearTokens(): void {
      this.accessToken = "";
    },
    async loginUser(email: string, password: string) {
      const userStore = useUserStore();
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      const { response: responseData } = response.data;
      userStore.setUser(responseData.user);
      this.setTokens(
        responseData.accessToken,
      );
      return response.data;
    },
    async registerUser(data: {
      email: string;
      password: string;
      role: string;
    }) {
      const response = await axiosInstance.post("/api/auth/register", data);
      return response.data;
    },
  },
});
