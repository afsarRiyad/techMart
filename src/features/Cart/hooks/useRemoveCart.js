import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, removeCartItem } from "../services/cartService";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Delete cart response:", error.response?.data);
    },
  });

};