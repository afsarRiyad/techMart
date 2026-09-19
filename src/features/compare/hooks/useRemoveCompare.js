import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeCompare } from '@/features/compare/services/compareService';
import { removeLocalCompare } from '@/features/compare/localCompare';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export const useRemoveCompare = ()=>{
    const queryClient = useQueryClient()
    const { data: me } = useAuth()
    const signedIn = Boolean(me?.data?._id)

     return useMutation({
        mutationFn:removeCompare,
        onMutate:async(productId)=>{
            toast.loading("Removing item from compare...", {id: 'compare-remove'})
            await queryClient.cancelQueries({queryKey: ['compare']})
            const previous = queryClient.getQueryData(['compare'])
            const items = Array.isArray(previous?.data) ? previous.data : []
            const listed = items.some((item) => item._id === productId)

            if (!signedIn) {
                // the guest list is localstorage, it records the removal even if the call fails
                removeLocalCompare(productId)
                if (listed) {
                    queryClient.setQueryData(['compare'], {...previous, data: items.filter((item) => item._id !== productId)})
                }
                return {previous, changed: false}
            }

            // signed in: only guess when the list is known, a guess has to be undoable
            if (!Array.isArray(previous?.data) || !listed) return {previous, changed: false}
            queryClient.setQueryData(['compare'], {...previous, data: items.filter((item) => item._id !== productId)})
            return {previous, changed: true}
        },
        onSuccess:()=>{
            toast.success("Item removed from compare!", {id: 'compare-remove'})
        },
        onError:(error, productId, context)=>{
            if (!signedIn) {
                toast.error("Saved on this device, it will sync when you log in.", {id: 'compare-remove'})
                return
            }
            toast.error(error.response?.data?.message || error.message, {id: 'compare-remove'})
            // put the item back if the server kept it
            if (context?.changed) queryClient.setQueryData(['compare'], context.previous)
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey: ["compare"]})
        }
     })
}
