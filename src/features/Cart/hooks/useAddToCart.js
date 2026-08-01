import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/cartService";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}