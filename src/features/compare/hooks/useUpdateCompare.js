import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompare } from '@/features/compare/services/compareService';
import { addLocalCompare } from '@/features/compare/localCompare';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

// the card passes { productId }, a plain id is accepted too
const idOf = (vars) => (typeof vars === 'string' ? vars : vars?.productId)

export const useUpdateCompare = ()=>{
    const queryClient = useQueryClient()
    const { data: me } = useAuth()
    const signedIn = Boolean(me?.data?._id)

     return useMutation({
        mutationFn:updateCompare,
        onMutate:async(vars)=>{
            const productId = idOf(vars)
            toast.loading("Adding item to compare...", {id: 'compare'})
            await queryClient.cancelQueries({queryKey: ['compare']})
            const previous = queryClient.getQueryData(['compare'])
            const items = Array.isArray(previous?.data) ? previous.data : []
            const already = items.some((item) => item._id === productId)

            if (!signedIn) {
                // the guest list is localstorage, it records the pick even if the call fails
                addLocalCompare(productId)
                if (!already) {
                    queryClient.setQueryData(['compare'], {...previous, data: [{_id: productId, pending: true}, ...items]})
                }
                return {previous, changed: false}
            }

            // signed in: only guess when the list is known, a guess has to be undoable
            if (!Array.isArray(previous?.data) || already) return {previous, changed: false}
            queryClient.setQueryData(['compare'], {...previous, data: [{_id: productId, pending: true}, ...items]})
            return {previous, changed: true}
        },
        onSuccess:()=>{
            toast.success("Item added to compare!", {id: 'compare'})
        },
        onError:(error, vars, context)=>{
            // already in the list is the state we were after
            if (error.response?.status === 400) return
            if (!signedIn) {
                toast.error("Saved on this device, it will sync when you log in.", {id: 'compare'})
                return
            }
            toast.error(error.response?.data?.message || error.message, {id: 'compare'})
            // the request failed, put the old list back
            if (context?.changed) queryClient.setQueryData(['compare'], context.previous)
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey: ["compare"]})
        }
     })
}
