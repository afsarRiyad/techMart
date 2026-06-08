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
      id: 2,
      title: '99% Positive',
      subTitle: 'Feedbacks',
      icons:  ThumbsUp,
     },
     {
      id: 3,
      title: '365 days',
      subTitle: 'for free return',
      icons: RefreshCw,
     },
     {
      id: 4,
      title: 'Payment',
      subTitle: 'Secure System',
      icons:  CreditCard,
     },
     {
      id: 5,
      title: 'Only Best',
      subTitle: 'Brands',
      icons:  Tag,
     },
]

let lastInd = valueProps.length - 1
const ValueProps = () => {
  return (
    <Container className='xl:pt-12 pt-8'>
      <div className='border border-gray-300 rounded flex snap-center snap-x py-1 snap-mandatory touch-auto overflow-x-auto'> 
         {valueProps.map((item, id)=>{
         return(
           <div key={id} className={`flex justify-center items-center gap-4 lg:py-3 py-2 px-7 lg:px-1 border-r whitespace-nowrap border-r-gray-200 ${id === lastInd && 'border-none'} flex-1`} >
            <item.icons className='text-primary' size={30} />
            <div className='text-center'>
             <h3 className='font-inter font-bold text-[14px] dark:text-white'>{item.title}</h3>
             <p className='font-inter text-[14px] text-gray-400'>{item.subTitle}</p>
            </div>
          </div>
         )
         })}
      </div>
    </Container>
  )
}

export default ValueProps
