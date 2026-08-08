import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadProfileImage, deleteProfileImage } from "../services/uploadService";

export const useProfileImageUpload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadProfileImage,
    onMutate: () => {
      toast.loading("Uploading image...", { id: "upload" });
    },
    onSuccess: (data) => {
      toast.success("Image uploaded successfully!", { id: "upload" });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      return data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to upload image",
        { id: "upload" }
      );
    },
  });
};

