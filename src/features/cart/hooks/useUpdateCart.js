import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCart } from "@/features/cart/services/cartService"
import toast from "react-hot-toast"

export const useUpdateCart = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ itemId, quantity }) => updateCart(itemId, quantity),
        onMutate: () =>{
            toast.loading("Updating cart...", {id:"update-cart"})
            },
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['cart']});
            toast.success("Cart updated successfully!", {id: 'update-cart'}) 
        },onError: () =>{
            toast.error("Failed to update cart.", {id: 'update-cart'})
        }
    })
}