import React from 'react'
import Container from '../layouts/Container'
import { featureData } from './featureData'
import FeatureCard from './FeatureCard'

const Features = () => {
    return (
        <Container>
    <div className='overflow-x-auto scroll-x-auto font-inter scroll-smooth overflow-y-hidden touch-pan-x select-none min-w-0'>
      <div className='grid grid-flow-col xl:grid-cols-4 xl:gap-5 lg:gap-6 gap-5 sm:auto-cols-[50%] auto-cols-[95%] pt-8 snap-x snap-mandatory '>
                     {featureData.map(item =>{
                        return(
                            <FeatureCard key={item.id} {...item} />
                        )
                     })}
                </div>
            </div>
        </Container>
    )
}

export default Features