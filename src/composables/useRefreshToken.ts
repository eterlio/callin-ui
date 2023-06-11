import axiosInstance from "../axios/publicInstance";

export function useRefreshToken() {
  async function refresh() {
    try {
      const response = await axiosInstance.get("/api/auth/refresh", {
        withCredentials: true,
      });
      return response.data.response.accessToken;
    } catch (error) {
      throw error;
    }
  }

  return {
    refresh,
  };
}
