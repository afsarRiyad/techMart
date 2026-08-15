import { apiCustomer } from "../../../api/apiCustomer"

export const getCategories = async()=>{
    const {data} = await apiCustomer.get('/api/categories/hierarchical')
    return data
}


export const getProduct = async (productIdOrSlug) => {
  const response = await apiCustomer.get( `/api/products/${productIdOrSlug}`);

  return response.data.data;
};