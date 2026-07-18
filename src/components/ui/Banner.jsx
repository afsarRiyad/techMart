import React from 'react'
import banner1 from '../../assets/images/banner1.webp'
import banner2 from '../../assets/images/banner2.webp'
import Container from '../layouts/Container'

const Banner = () => {
  return (
    <Container>
      <div className='flex gap-3 pb-17'>
        <div>
            <img src={banner1} alt={banner1} />
        </div>
        <div>
            <img src={banner2} alt={banner2} />
        </div>
      </div>
    </Container>
  )
}

export default Banner
