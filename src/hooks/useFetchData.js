// Renamed from hooks/Fetchdata.js to follow the useXxx hook naming convention.
import axios from "axios"
import { useEffect, useState } from "react"
import { apiCustomer } from "@/api/apiCustomer";

const API = import.meta.env.VITE_API_URL;

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


export const verifyOtp = async (formData) => {
  const res = await axios.post(`${API}/api/auth/verify-otp`, formData, { withCredentials: true });
  return res.data;
}


export const validateCoupon = async (code, orderTotal) => {
  const res = await axios.post(`${API}/api/coupons/validate`, { code, orderTotal });
  return res.data;
}

export const applyCoupon = async (code, orderTotal) => {
  const res = await axios.post(`${API}/api/coupons/apply`, { code, orderTotal }, { withCredentials: true });
  return res.data;
}


export const logout = async()=>{
  const res = await apiCustomer.post('/api/auth/logout')
  return res.data
}

export const resendOtp = async(email) =>{
  const res = await apiCustomer.post('/api/auth/resendotp', {email})
}