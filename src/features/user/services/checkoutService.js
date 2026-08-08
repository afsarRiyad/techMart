import { apiCustomer } from "../../../api/apiCustomer"

export const createOrder = async(formData)=>{
    const {data} = await apiCustomer.post('/api/orders', formData)
    return data
}
export const clearCart = async () =>{
    const {data} = await apiCustomer.delete('/api/cart')
    return data
}