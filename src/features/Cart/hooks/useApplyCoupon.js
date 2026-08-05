import { useMutation, useQueryClient } from "@tanstack/react-query"
import { applyCoupon } from "../services/cartService"
import toast from "react-hot-toast";
import { useRef } from "react";
const COUPON_STORAGE_KEY = "cartCouponCode";
export const useApplyCoupon =()=>{
     const latestRequest = useRef(0);
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({code , orderTotal})=> applyCoupon({code, orderTotal}),
        onMutate:()=>{
         toast.loading('Verifying coupon, please wait...', {id : 'coupons'})
        },
        onSuccess: (res)=> {
            const coupon = res.data
            localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(res.data))   
            toast.success('Coupon applied successfully!', {id : 'coupons'}) 
        },
        onError:(error)=>{
            toast.error(error.response?.data, {id : 'coupons'})
        }
    })
   const apply = async({code, orderTotal})=>{
        const requestId = ++latestRequest.current
        try {
            const res =await mutation.mutateAsync({code, orderTotal})
             if (requestId !== latestRequest.current) return;

            localStorage.setItem(
                COUPON_STORAGE_KEY,
                JSON.stringify(res.data)
            );
            return res.data
        } catch (error) {
            if (requestId !== latestRequest.current) return;

      localStorage.removeItem(COUPON_STORAGE_KEY);
       throw error;
        }
   }
   return { ...mutation, apply };
}