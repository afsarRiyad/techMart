import { apiCustomer } from "../../../api/apiCustomer"

export const updateProfile = async(profileData)=>{
  const {data} = await apiCustomer.put("/api/user/profile", profileData)
  return data
}

export const changePassword = async(passwordData) =>{
    const {data} = await apiCustomer.put("/api/auth/change-password", passwordData)
}