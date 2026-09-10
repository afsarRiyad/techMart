import { apiCustomer } from "@/api/apiCustomer"

export const updateCompare = async(proId)=>{
    const {data} = await apiCustomer.post("/api/compare", proId)
    return data
}
export const getCompare = async()=>{
    const {data} = await apiCustomer.get("/api/compare")
    return data
}
export const removeCompare = async(productId)=>{
    const {data} = await apiCustomer.delete(`/api/compare/${productId}`)
    return data
}