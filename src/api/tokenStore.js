const TOKEN_KEY = "techmart_customer_access_token";

export function crateTokenStore() {
  let accessToken = sessionStorage.getItem(TOKEN_KEY);
  let refreshInFlight = null;

  const getAccessToken = () => accessToken;

  const setAccessToken = (token) => {
    accessToken = token;
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
  };

  const clearAccessToken = () => {
    accessToken = null;
    sessionStorage.removeItem(TOKEN_KEY);
  };

  const getOrCreateRefresh = (refreshFn) => {
    if (!refreshInFlight) {
      refreshInFlight = refreshFn().finally(() => {
        refreshInFlight = null;
      });
    }
    return refreshInFlight;
  };

  return {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    getOrCreateRefresh,
  };
}