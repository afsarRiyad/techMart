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

