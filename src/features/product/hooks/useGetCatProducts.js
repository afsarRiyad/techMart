import { useQuery } from "@tanstack/react-query"
import { apiCustomer } from "@/api/apiCustomer"

export const useGetCatProducts = ({
                 category,
                    brands,
                    colors,
                    page,
                    sort = 'default',
                    priceRange,
                    search,
                    limit = 12,
                    enabled = true
}) => {
   return useQuery({
        queryKey:([
            'products', category, brands, colors, priceRange, limit, sort,  priceRange, page, search
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

             if (search) {
                 params.search = search;
             }
             
            
            params.minPrice = priceRange[0];
            params.maxPrice = priceRange[1];
            params.limit = limit;
            params.sort = sort
            params.page = page
             
             const {data} = await apiCustomer.get('/api/products', { params });
             return data;
        },
        enabled
    })
}