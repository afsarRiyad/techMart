import { useMutation, useQueryClient } from "@tanstack/react-query"
import { billingAddress } from "../services/addressService"
import toast from "react-hot-toast"

export const useBillingAddress = ()=>{
    const queryClient = useQueryClient()
   return useMutation({
    mutationFn:(formData)=> billingAddress(formData),
    onMutate:()=>{
      toast.loading('updating billing address...', {id:'billing'})
    },
    onSuccess:()=>{
        toast.success('billing address saved,', {id:'billing'})
       queryClient.invalidateQueries({queryKey:['me']})
    },
    onError:(error)=>{
        toast.error(error.message, {id : 'billing'})
    }
   })
}