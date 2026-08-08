import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../services/checkoutService"
import toast from "react-hot-toast"

export const useCreateOrder = () =>{
    return useMutation({
        mutationFn: createOrder,
        onSuccess:()=>{
            toast.success('order success', {id:'order'})
        },
        onError:(error)=>{
            toast.error(error.message, {id:'order'})
        }
    })
}