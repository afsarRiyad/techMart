import React from 'react'
import Container from './layouts/Container'
import { TruckElectric, ThumbsUp, RefreshCw , CreditCard, Tag    } from 'lucide-react';
const valueProps =  [
     {
      id: 1,
      title: 'Free Delivery',
      subTitle: 'from $50',
      icons: TruckElectric,
     },
     {
      id: 1,
      title: '99% Positive',
      subTitle: 'Feedbacks',
      icons:  ThumbsUp,
     },
     {
      id: 1,
      title: '365 days',
      subTitle: 'for free return',
      icons: RefreshCw,
     },
     {
      id: 1,
      title: 'Payment',
      subTitle: 'Secure System',
      icons:  CreditCard,
     },
     {
      id: 1,
      title: 'Only Best',
      subTitle: 'Brands',
      icons:  Tag,
     },
]

let lastInd = valueProps.length - 1
const ValueProps = () => {
  return (
    <Container className='pt-12'>
      <div className='border border-gray-300 rounded flex overflow-x-auto scroll-x-auto snap-x py-1 snap-mandatory touch-auto select-none'> 
         {valueProps.map((item, id)=>{
         return(
           <div key={id} className={`flex justify-center items-center gap-4 lg:py-5 py-2 px-7 lg:px-10 border-r whitespace-nowrap border-r-gray-200 ${id === lastInd && 'border-none'}`} >
            <item.icons className='text-primary' size={30} />
            <div className='text-center'>
             <h3 className='font-inter font-bold text-[14px]'>{item.title}</h3>
             <p className='font-inter text-[14px] text-gray-500'>{item.subTitle}</p>
            </div>
          </div>
         )
         })}
      </div>
    </Container>
  )
}

export default ValueProps
