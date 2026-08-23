// Renamed from useCart.js.js (removed the duplicated .js extension).
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/features/cart/services/cartService";

export function useCart() {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    })
}