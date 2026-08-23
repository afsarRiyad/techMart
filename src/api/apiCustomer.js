import { createApiInstance } from '@/api/createApiInstance';
 
const API = import.meta.env.VITE_API_URL;
const notifySessionExpired = (msg) => {
  console.warn(msg);
};
 
export const {
  instance: apiCustomer,
  getAccessToken: getCustomerToken,
  setAccessToken: setCustomerToken,
  clearAccessToken: clearCustomerToken,
  refreshToken: refreshCustomerToken,
} = createApiInstance({
  baseURL: `${API}`,
  refreshPath: '/api/auth/refresh-token',
  loginPath: '/account/login',
  onSessionExpired: notifySessionExpired,
});
 