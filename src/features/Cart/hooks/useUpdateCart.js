import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCart } from "../services/cartService"

export const useUpdateCart = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ itemId, quantity }) => updateCart(itemId, quantity),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['cart']});
            console.log("Cart updated successfully");
            
        },onError: (error) =>{
            console.error("Update cart response:", error.response?.data);
        }
    })
}