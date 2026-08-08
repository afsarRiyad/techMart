import { apiCustomer } from "../../../api/apiCustomer"

export const billingAddress = async(formData)=>{
    const {data} = await apiCustomer.put('/api/user/billing-address', formData);
    return data
}
export const shippingAddress = async(formData)=>{
    const {data} = await apiCustomer.put('/api/user/shipping-address', formData)
    return data
}
export const getAddress = async()=>{
    const {data} = await apiCustomer.get('/api/user/addresses')
    return data
}