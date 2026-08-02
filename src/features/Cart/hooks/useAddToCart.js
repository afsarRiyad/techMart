import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, removeCartItem } from "../services/cartService";

export function useAddToCart() {
  const queryClient = useQueryClient();

 return useMutation({
  mutationFn: ({ product, quantity = 1, variant = null }) =>
    addToCart(product, quantity, variant),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  },
});
}

