import React from 'react'
import { useFetchData } from '../hooks/Fetchdata'
import StoreHighlights from './ui/StoreHighlights'
import footerWidget from '../assets/images/footerWidget.webp'
import Container from './layouts/Container'

const FooterWidget = () => {
    const{data: sec, loading, errs} = useFetchData('/api/home-v3')
    const featured = sec?.data?.sections?.find(section => section.id === 'featured-products')
    const top = sec?.data?.sections?.find(section => section.id === 'top-selling')
    const sale = sec?.data?.sections?.find(section => section.id === 'on-sale')
    
  return (
   <Container>
  <div className="hidden md:flex flex-wrap gap-y-8 pb-4 lg:pb-8">
    <div className="w-1/2 lg:w-1/4 pr-3">
      <StoreHighlights data={featured} />
    </div>

    <div className="w-1/2 lg:w-1/4 pr-4 pl-3">
      <StoreHighlights data={top} />
    </div>

    <div className="w-1/2 lg:w-1/4 pr-3 pl-3">
      <StoreHighlights data={sale} sale />
    </div>

    <div className="w-1/2 lg:w-1/4 pl-3">
      <img
        src={footerWidget}
        alt="footerWidget"
        className="lg:w-full"
      />
    </div>
  </div>
</Container>
  )
}

export default FooterWidget
