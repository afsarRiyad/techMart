import {  useQuery } from "@tanstack/react-query"
import { getCategories } from "../services/services"
import toast from "react-hot-toast"

export const useGetCategories = ()=>{
    return useQuery({
         queryKey: ["categories", "hierarchical"],
        queryFn: getCategories,
    })
}