import { useQuery } from "@tanstack/react-query"
import { getWishlist } from "../services/wishlistServices"

export const useWishlist = ()=>{
    return useQuery({
        queryKey:["wishlist"],
        queryFn:getWishlist,
        retry: false,
        staleTime: 1000 * 60 * 5
    })
}