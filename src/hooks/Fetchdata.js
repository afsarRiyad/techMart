import axios from "axios"
import { useEffect, useState } from "react"

const API = 'https://electrobackend-1.onrender.com';

export const useFetchData = (endpoint) =>{
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [errs, setErrs] = useState('')
     useEffect(()=>{
         if (!endpoint) return;
     const fetchData = async () => {
      try {
        setLoading(true);
        setErrs("");

        const res = await axios.get(`${API}${endpoint}`);
        setData(res.data);
      } catch (error) {
        setErrs(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
      fetchData();
     },[endpoint])
     return { data, loading, errs };
}


 const signup = async ( formData) =>{
  const res = await axios.post(`${API}/api/auth/signup`, formData);
  return res.data
}
export default signup

export const signin = async (formData) =>{
  const res = await axios.post(`${API}/api/auth/login`, formData)
  return res.data
}