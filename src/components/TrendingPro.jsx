import React from 'react'
import { useFetchData } from '../hooks/Fetchdata'
import ProductShowcase from './ui/ProductShowcase'

const TrendingPro = () => {
    const {data: products, loading, errs} = useFetchData('/api/products')
    const trendingPro = {title: "Trending Products",
                        products: (products?.data || []).sort((a, b) => b.reviews - a.reviews
                           ),
                        };
  return (
    <>
      <ProductShowcase data={trendingPro} loading={loading} errs={errs} trending={true} type={'trending'}/>
    </>
  )
}

export default TrendingPro
