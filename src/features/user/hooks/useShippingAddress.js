import { useMutation, useQueryClient } from "@tanstack/react-query"
import { shippingAddress } from "../services/addressService"
import toast from "react-hot-toast"

export const useShippingAddress = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: shippingAddress,
        onMutate:()=>{
            toast.loading('updating shipping address', {id: 'shipping'})
        },
        onSuccess:()=>{
             toast.success('Shipping address updated!', {id: 'shipping'})
             queryClient.invalidateQueries({queryKey:['me']})
             queryClient.invalidateQueries({queryKey:['addresses']})
        },
    onError:(error)=>{
        toast.error(error.response?.data?.message || error.message, {id: 'shipping'})
    }
    })
}