import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompare } from '@/features/compare/services/compareService';
import toast from 'react-hot-toast';

export const useUpdateCompare = ()=>{
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn:updateCompare,
        onMutate:()=>{
            toast.loading("Adding item to compare...", {id: 'compare'})
        },
        onSuccess:()=>{
            toast.success("Item added to compare!", {id: 'compare'})
            queryClient.invalidateQueries({queryKey: ["compare"]})
        },
        onError:(error)=>{
            toast.error(error.response?.data?.message || error.message, {id: 'compare'})
        }
     })
}