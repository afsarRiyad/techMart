import React from 'react'
import Container from './layouts/Container'
import { useFetchData } from '../hooks/Fetchdata'
import ProductShowcase from './ProductShowcase'

const LaptopsPc = () => {
     const { data: sec, loading, errs } = useFetchData('/api/home-v3')
    const section = sec?.data?.sections?.find(cat => cat.id === 'laptops-and-computers') || [];
    
  return (
    <Container>
        <ProductShowcase data={section} loading={loading} errs={errs } type={'pcs'}/>
    </Container>
  )
}

export default LaptopsPc
