import { useMutation, useQueryClient } from "@tanstack/react-query"
import { clearCart, createOrder } from "../services/checkoutService"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export const useCreateOrder = () =>{
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOrder,
        onMutate:()=>{
            toast.loading('placing order...', {id:'order'})
        },
        onSuccess:(data)=>{
            toast.success('order success', {id:'order'})
            clearCart()
            queryClient.invalidateQueries({queryKey:["cart"]})
            queryClient.invalidateQueries({queryKey:["me"]})
             localStorage.removeItem("cartCouponCode");
             navigate("/order-received", {
                        state: {
                        order: data,
                        },
  });
        },
        onError:(error)=>{
            toast.error(error.message, {id:'order'})
        }
    })
}