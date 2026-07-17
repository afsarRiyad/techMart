import React from 'react'
import { useFetchData } from '../hooks/Fetchdata';

const BestSellers = () => {
     const { data: sec, loading, errs } = useFetchData('/api/home-v3')
        const section = sec?.data?.sections?.find(cat => cat.id === 'laptops-and-computers') || [];
  return (
    <div>
      {/* <ProShocaseTwo data={section} type=''/> */}
    </div>
  )
}

export default BestSellers
