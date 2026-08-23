import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProfileImage } from "@/features/user/services/uploadService"
import toast from "react-hot-toast"

export const useProfileRemove = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProfileImage,
    onMutate: () => {
      toast.loading("Removing image...", { id: "delete" });
    },
    onSuccess: () => {
      toast.success("Image removed successfully!", { id: "delete" });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to remove image",
        { id: "delete" }
      );
    },
  });
};
