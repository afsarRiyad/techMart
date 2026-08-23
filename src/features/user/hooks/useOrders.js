import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/features/user/services/userService"

export const useOrders = ()=>{
  return  useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
        retry:false,
        staleTime: 1000 * 5 * 60
    })
}