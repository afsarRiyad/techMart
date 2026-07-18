import React from 'react'
import logo1 from '../assets/images/themeforest1.webp'
import logo2 from '../assets/images/themeforest2.webp'
import logo3 from '../assets/images/themeforest3.webp'
import logo4 from '../assets/images/themeforest4.webp'
import logo5 from '../assets/images/themeforest5.webp'
import logo6 from '../assets/images/themeforest6.webp'
import Container from './layouts/Container'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';

const logos = [
    {id: 1, src: logo1, alt: 'airdnd'},
    {id: 2, src: logo2, alt: 'coinbuild'},
    {id: 3, src: logo3, alt: 'dribble'},
    {id: 4, src: logo4, alt: 'instagram'},
    {id: 5, src: logo5, alt: 'netflix'},
    {id: 6, src: logo6, alt: 'pinterest'},
    {id: 7, src: logo1, alt: 'airdnd'},
    {id: 8, src: logo2, alt: 'coinbuild'},
    {id: 9, src: logo3, alt: 'dribble'},
    {id: 10, src: logo4, alt: 'instagram'},
    {id: 11, src: logo5, alt: 'netflix'},
    {id: 12, src: logo6, alt: 'pinterest'},
]

const SponsorLogo = () => {
  return (
   <Container className='pt-12 pb-8 relative'>
     <button className="custom-prev absolute xl:left-10 left-0 xl:top-21 top-20 z-10 disabled:opacity-50 cursor-pointer">
        <ChevronLeft />
      </button>

      <button className="custom-next absolute xl:right-10 right-5 xl:top-21 top-20 z-10 disabled:opacity-50 cursor-pointer">
        <ChevronRight />
      </button>
        <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
    breakpoints={{
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    }}
    className='border-y border-y-gray-200'
                 >
      {logos.map((logo) => (
        <SwiperSlide key={logo.id}>
          <Link>
            <img className='brightness-130 hover:brightness-80 cursor-pointer xl:w-44 w-38 h-auto py-5' src={logo.src} alt={logo.alt} />
          </Link>
        </SwiperSlide>
      ))}
      </Swiper>
   </Container>
  )
}

export default SponsorLogo
