import React from 'react'
import { useFetchData } from '../hooks/Fetchdata'
import ProductShowcase from './ui/ProductShowcase'

const LaptopsPc = () => {
     const { data: sec, loading, errs } = useFetchData('/api/home-v3')
    const section = sec?.data?.sections?.find(cat => cat.id === 'laptops-and-computers') || [];
    
  return (
    <>
        <ProductShowcase data={section} loading={loading} errs={errs } type={'pcs'}/>
    </>
  )
}

export default LaptopsPc
