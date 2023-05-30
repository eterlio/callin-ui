import axiosInstance from "../axios/publicInstance";

export function useRefreshToken() {
  async function refresh() {
    const response = await axiosInstance.get("/api/auth/refresh", {
      withCredentials: true,
    });
    return response.data.response.accessToken;
  }

  return {
    refresh,
  };
}
