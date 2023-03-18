import { defineStore } from "pinia";
interface AuthState {
  accessToken: string;
  refreshToken: string;
}

interface AuthGetters {
  isAuthenticated: boolean;
}

interface AuthActions {
  setTokens(accessToken: string, refreshToken: string): void;
  clearTokens(): void;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    accessToken: "",
    refreshToken: "",
  }),
  getters: {
    isAuthenticated(): AuthGetters["isAuthenticated"] {
      return !!this.accessToken;
    },
  },
  actions: {
    setTokens(accessToken: string, refreshToken: string): void {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    clearTokens(): void {
      this.accessToken = "";
      this.refreshToken = "";
    },
  },
});
