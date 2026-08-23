import React from 'react'
import ProductShowcaseTwo from '@/components/ui/ProductShowcaseTwo'
import { useFetchData } from '@/hooks/useFetchData'

const Recommendation = () => {
    const {data: pro, leading, errs} = useFetchData('/api/products')
    const allPro = {
          title: 'Recommendation for you',
          products: pro.data,
    }
  return (
    <div>
      <ProductShowcaseTwo data={allPro} type='Recommendation' />
    </div>
  )
}

export default Recommendation
