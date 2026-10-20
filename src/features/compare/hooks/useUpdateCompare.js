import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompare } from '@/features/compare/services/compareService';
import { addLocalCompare, removeLocalCompare } from '@/features/compare/localCompare';
import { useAuth } from '@/hooks/useAuth';
import showActionToast from '@/components/ui/showActionToast';
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

            // the pick is recorded on this device first, signed in or not, so the
            // badge counts it before the request answers — useCompare() unions this
            // with the api's list until the api confirms it
            addLocalCompare(productId)

            if (!Array.isArray(previous?.data) || already) return {previous, changed: false}
            queryClient.setQueryData(['compare'], {...previous, data: [{_id: productId, pending: true}, ...items]})
            return {previous, changed: true}
        },
        onSuccess:(response)=>{
            // the POST returns the product it added, so the list (and the header
            // badge with it) is right straight away instead of waiting on the refetch
            const added = response?.data
            if (added?._id) {
                queryClient.setQueryData(['compare'], (old) => {
                    const items = Array.isArray(old?.data) ? old.data : []
                    const rest = items.filter((item) => item._id !== added._id)
                    return {...old, data: [added, ...rest]}
                })
            }
            showActionToast({
                id: 'compare',
                title: 'Item added to compare',
                cta: 'Compare now',
                to: '/compare',
            })
        },
        onError:(error, vars, context)=>{
            // already in the list is the state we were after
            if (error.response?.status === 400) return
            if (!signedIn) {
                toast.error("Saved on this device, it will sync when you log in.", {id: 'compare'})
                return
            }
            removeLocalCompare(idOf(vars))
            toast.error(error.response?.data?.message || error.message, {id: 'compare'})
            if (context?.changed) queryClient.setQueryData(['compare'], context.previous)
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey: ["compare"]})
        }
     })
}
