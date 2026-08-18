import React from 'react'
import Gridview from './Gridview';

const MoreProducts = ({data}) => {
  return (
    <div>
      <Gridview products={data}/>
    </div>
  )
}

export default MoreProducts
