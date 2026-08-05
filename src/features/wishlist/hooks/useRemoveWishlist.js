import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeWishlist } from "../services/wishlistServices"
import toast from "react-hot-toast"

export const useRemoveWishlist = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeWishlist,
        onMutate:()=>{
            toast.loading("Removing item....", {id:'wishlists'})
        },
        onSuccess:()=>{
           queryClient.invalidateQueries({queryKey: ["wishlist"]})
           toast.success("Item removed ", {id:'wishlists'})
        },
        onError:(error)=>{
             error.response?.data?.message || error.message,
              { id: "wishlists" }
        }
    })
}