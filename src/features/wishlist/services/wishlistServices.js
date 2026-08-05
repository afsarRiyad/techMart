import { apiCustomer } from "../../../api/apiCustomer"

export const updateWishlist = async(proId)=>{
    const {data} = await apiCustomer.post("/api/wishlist", proId)
    return data
}
export const getWishlist = async()=>{
    const {data} = await apiCustomer.get("/api/wishlist")
    return data
}
export const removeWishlist = async(productId)=>{
    const {data} = await apiCustomer.delete(`/api/wishlist/${productId}`)
    return data
}