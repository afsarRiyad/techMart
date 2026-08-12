import { useQuery } from "@tanstack/react-query"
import { apiCustomer } from "../../../api/apiCustomer"

export const useGetCatProducts = ({
                 category,
                    brands,
                    colors,
                    priceRange,
                    limit = 12
}) =>{
   return useQuery({
        queryKey:([
            'products', category, brands, colors, priceRange, limit
        ]),
        queryFn: async()=>{
             const params = {};
             
             if (category && category !== 'View All Products') {
                 params.category = category;
             }
             
             if (brands.length) {
                 params.brand = brands.join(',');
             }
             
             if (colors.length) {
                 params.color = colors.join(',');
             }
             
             params.minPrice = priceRange[0];
             params.maxPrice = priceRange[1];
             params.limit = limit;
             
             const {data} = await apiCustomer.get('/api/products', { params });
             return data;
        },
        enabled: true 
    })
}