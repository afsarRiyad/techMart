import { useQuery } from "@tanstack/react-query";
import { apiCustomer } from "@/api/apiCustomer";

export const useAuth=() =>{
         return useQuery({
            queryKey:['me'],
            queryFn: async () =>{
                const res = await apiCustomer.get(`/api/auth/me`)
                 return res.data;
            },
            retry: false,
            staleTime: 5 * 60 * 1000,
         })
}