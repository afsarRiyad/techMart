// Renamed from userServices.js for consistent singular service naming.
import { apiCustomer } from "@/api/apiCustomer"

export const updateProfile = async(profileData)=>{
  const {data} = await apiCustomer.put("/api/user/profile", profileData)
  return data
}

export const changePassword = async(passwordData) =>{
    const {data} = await apiCustomer.put("/api/auth/change-password", passwordData)
}
export const getOrders = async() =>{
  const {data} = await apiCustomer.get('/api/orders')
  return data
}
export const trackOrders = async ({orderId, email})=>{
   if (!orderId || orderId.trim() === '' || orderId === undefined || orderId === null) {
    throw new Error('Order ID is required');
  }
   const params = {};
  if (email) {
    params.email = email;
  }
  const {data} = await apiCustomer.get(`/api/orders/track/${encodeURIComponent(orderId)}`, {params})
  return data
}