import React from 'react'
import ProShocaseTwo from './ui/ProShocaseTwo'
import { useFetchData } from '../hooks/Fetchdata'

const Recommendation = () => {
    const {data: pro, leading, errs} = useFetchData('/api/products')
    const allPro = {
          title: 'Recommendation for you',
          products: pro.data,
    }
    console.log(pro);
    
  return (
    <div>
      <ProShocaseTwo data={allPro} type='Recommendation' />
    </div>
  )
}

export default Recommendation
