import React from 'react'
import Gridview from '@/components/product/Gridview';

const MoreProducts = ({data}) => {
  return (
    <div>
      <Gridview products={data}/>
    </div>
  )
}

export default MoreProducts
