import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cartService";

export function useCart() {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    })
}