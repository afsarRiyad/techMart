import { apiCustomer } from "../../../api/apiCustomer"

export const getCategories = async()=>{
    const {data} = await apiCustomer.get('/api/categories/hierarchical')
    return data
}