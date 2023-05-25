import axiosInstance from "../axios/publicInstance";
import { useAuthStore } from "../store/auth/index";
import { useRouter } from "vue-router";

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  async function login(username: string, password: string) {
    try {
      const { data } = await axiosInstance.post("/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = data;
      authStore.setTokens(accessToken, refreshToken);

      router.push({ name: "Home" });
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    authStore.clearTokens();
    router.push({ name: "Login" });
  }

  return {
    isAuthenticated: !!authStore.accessToken,
    login,
    logout,
  };
}
