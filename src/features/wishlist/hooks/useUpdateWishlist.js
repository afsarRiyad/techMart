import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateWishlist } from './../services/wishlistServices';
import toast from 'react-hot-toast';

export const useUpdateWishlist = ()=>{
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn:updateWishlist,
        onMutate:()=>{
            toast.loading("Adding item to wishlist...", {id: 'wishlists'})
        },
        onSuccess:()=>{
            toast.success("Item added to wishlist!", {id: 'wishlists'})
            queryClient.invalidateQueries({queryKey: ["wishlist"]})
        },
        onError:(error)=>{
            toast.error(error.message, {id: 'wishlists'})
        }
     })
}