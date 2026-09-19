import { useQuery } from "@tanstack/react-query"
import { apiCustomer } from "@/api/apiCustomer"

// live suggestions for the header search box, small limit on purpose
export const useSearchProducts = (search, limit = 6) => {
    const term = search?.trim()

    return useQuery({
        queryKey: ['search-products', term, limit],
        queryFn: async () => {
            const { data } = await apiCustomer.get('/api/products', {
                params: { search: term, limit }
            })
            return data
        },
        enabled: Boolean(term),
        staleTime: 60 * 1000,
    })
}
