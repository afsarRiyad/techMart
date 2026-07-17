import React from 'react'
import Container from './layouts/Container'
import { useFetchData } from '../hooks/Fetchdata'
import ProductShowcase from './ProductShowcase'

const TrendingPro = () => {
    const {data: products, loading, errs} = useFetchData('/api/products')
    const trendingPro = {title: "Trending Products",
                        products: (products?.data || []).sort((a, b) => b.reviews - a.reviews
                           ),
                        };
  return (
    <Container>
      <ProductShowcase data={trendingPro} loading={loading} errs={errs} trending={true} type={'trending'}/>
    </Container>
  )
}

export default TrendingPro
