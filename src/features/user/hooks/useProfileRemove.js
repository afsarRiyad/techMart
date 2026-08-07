import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProfileImage } from "../services/uploadService"
import toast from "react-hot-toast"

export const useProfileRemove = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteProfileImage,
        onMutate:()=>{
            toast.loading('Removing profile image...', {id: 'img'})
        },
        onSuccess:()=>{
            toast.success('Profile removed!', {id:'img'});
            queryClient.invalidateQueries({queryKey: ["me"]})
        },
        onError:(error)=>{
            toast.error(
        error.response?.data?.message || "Failed to upload image",
        { id: "img" }
      );
        }
    })
}