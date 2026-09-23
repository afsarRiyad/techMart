import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateWishlist } from '@/features/wishlist/services/wishlistService';
import showActionToast from '@/components/ui/showActionToast';
import toast from 'react-hot-toast';

export const useUpdateWishlist = ()=>{
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn:updateWishlist,
        onMutate:()=>{
            toast.loading("Adding item to wishlist...", {id: 'wishlists'})
        },
        onSuccess:()=>{
            showActionToast({
                id: 'wishlists',
                title: 'Item added to wishlist',
                cta: 'View wishlist',
                to: '/wishlist',
            })
            queryClient.invalidateQueries({queryKey: ["wishlist"]})
        },
        onError:(error)=>{
            toast.error(error.message, {id: 'wishlists'})
        }
     })
}