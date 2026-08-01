import { apiCustomer } from "../../../api/apiCustomer"

export const getCart = async() =>{
   const res = await apiCustomer.get('/api/cart')
    return res.data
}
export const addToCart = async(product, quantity = 1, variant = null) => {
    const res = await apiCustomer.post('/api/cart', { product, quantity, variant })
    return res.data
}
export const updateCartItem = async(itemId, quantity) => {
    const res = await apiCustomer.put(`/api/cart/${itemId}`, { quantity })
    return res.data
}
export const removeCartItem = async(itemId) => {
    const res = await apiCustomer.delete(`/api/cart/${itemId}`)
    return res.data
}
export const clearCart = async() => {
    const res = await apiCustomer.delete('/api/cart')
    return res.data
}