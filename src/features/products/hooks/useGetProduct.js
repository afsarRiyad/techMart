import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProduct } from "../services/services";

export const useGetProduct = (productIdOrSlug) => {
  return useQuery({
    queryKey: ["product", productIdOrSlug],

    queryFn: () => getProduct(productIdOrSlug),

    enabled: !!productIdOrSlug,

    staleTime: 5 * 60 * 1000,

    retry: 1,

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to load product"
      );
    },
  });
};