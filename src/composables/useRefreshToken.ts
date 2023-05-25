import axiosInstance from "../axios/publicInstance";

export function useRefreshToken() {
  async function refresh() {
    let {
      data: {
        response: { accessToken },
      },
    } = await axiosInstance.get("/api/auth/refresh", {
      withCredentials: true,
    });
    return accessToken;
  }

  return {
    refresh,
  };
}
