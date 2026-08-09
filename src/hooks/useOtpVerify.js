import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { verifyOtp } from "./Fetchdata"

export const useOtpVerify = ()=>{
    const queryClinet = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: verifyOtp,
        onMutate:()=>{
            toast.loading('checking otp...', {id: 'otp'})
        
        },
        onSuccess:()=>{
            toast.success('verification successful!', {id: 'otp'})
            queryClinet.invalidateQueries({queryKey:['me']})
            navigate('/account', {replace:true})
    },
    onError:(error)=>{
        toast.error(error.message, {id: 'otp'})
    }
    })
}