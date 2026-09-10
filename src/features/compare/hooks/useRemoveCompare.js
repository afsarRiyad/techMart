import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeCompare } from '@/features/compare/services/compareService';
import toast from 'react-hot-toast';

export const useRemoveCompare = ()=>{
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn:removeCompare,
        onMutate:()=>{
            toast.loading("Removing item from compare...", {id: 'compare-remove'})
        },
        onSuccess:()=>{
            toast.success("Item removed from compare!", {id: 'compare-remove'})
            queryClient.invalidateQueries({queryKey: ["compare"]})
        },
        onError:(error)=>{
            toast.error(error.response?.data?.message || error.message, {id: 'compare-remove'})
        }
     })
}