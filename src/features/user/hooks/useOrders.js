import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../services/userServices"

export const useOrders = ()=>{
  return  useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
        retry:false,
        staleTime: 1000 * 5 * 60
    })
}