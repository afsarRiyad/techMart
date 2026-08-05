import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, removeCartItem } from "../services/cartService";
import toast from "react-hot-toast";

export function useAddToCart() {
  const queryClient = useQueryClient();

 return useMutation({
  mutationFn: ({ product, quantity = 1, variant = null }) =>
    addToCart(product, quantity, variant),
 onMutate: () =>{
    toast.loading("Adding item to cart...", {id:"add-cart"})
 },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    toast.success("Item added to cart!", {id: 'add-cart'})
  },
  onError: () =>{
    toast.error("Failed to add item", {id: 'add-cart'})
  }
});
}

