import axios from "axios";
import { createTokenStore } from "@/api/tokenStore";
import { getGuestId } from "@/api/guestSession";

export function createApiInstance({ baseURL,  refreshPath, authPath,  loginPath,  onSessionExpired,}) {
  const {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    getOrCreateRefresh,
  } = createTokenStore();
  
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Identify the guest session so cart/wishlist/compare work without an
    // account. Logged-in users are resolved by token first on the backend, so
    // sending this header alongside a token is harmless.
    config.headers["x-guest-id"] = getGuestId();
    return config;
  });
  const refreshToken = async () => {
    const res = await axios.post(
      `${baseURL}${refreshPath}`,
      {},
      { withCredentials: true },
    );

    if (!res.data?.success) {
      throw new Error("Refresh did not return success");
    }

    const newToken = res.data.data.accessToken;

    setAccessToken(newToken);

    return newToken;
  };
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (!error.response) {
        return Promise.reject(error);
      }
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await getOrCreateRefresh(refreshToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          clearAccessToken();
             
          if (onSessionExpired) {
            onSessionExpired("Your session has expired. Please log in again.");
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
  return {
    instance,
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    refreshToken,
  };
}
