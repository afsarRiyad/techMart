import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, removeCartItem } from "@/features/cart/services/cartService";
import toast from "react-hot-toast";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
     onMutate: () =>{
    toast.loading("Removing item from cart...", {id:"remove-cart"})
     },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart!", {id: 'remove-cart'})
    },
    onError: () =>{
    toast.error("Failed to remove item", {id: 'remove-cart'})
  }
  });

};