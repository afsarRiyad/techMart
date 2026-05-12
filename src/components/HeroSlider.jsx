import React, { useState } from 'react'
import background from '../assets/images/background.webp' 
import ProductBackground from '../assets/images/ProductBackground.webp' 
import Container from './layouts/Container';
import SounddeviceSlider from '../assets/images/SounddeviceSlider.webp'
import watchess from '../assets/images/SmartwatchessSLider.webp'
import SmartphonesSlider from '../assets/images/SmartphonesSlider.webp'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation} from 'swiper/modules';


const HeroSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
 <div style={{backgroundImage: `url(${activeIndex === 1 ? ProductBackground : background})`}} className='relative w-full h-[240px] lg:h-[410px]  bg-gray-100/30 bg-center transition-all duration-500  bg-cover overflow-hidden'>
    <Container>
        <Swiper 
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper h-full w-full items-center"
        onSlideChange={(swiper)=> setActiveIndex(swiper.realIndex)}
       >
    <SwiperSlide >
      <Container >
           <div className='flex font-roboto items-center  lg:h-[410px]  h-[240px] w-full overflow-hidden'>
              <div className='flex flex-col lg:w-[445px] w-[60%]'>
                     <span className='text-[#34BCEC] sm:text-base  text-[14px] sm:pb-2 font-semibold uppercase lg:pb-3 pb-1 tracking-widest anim-topTxt'>
                      shop to get what you love
                 </span>
                 <span className='uppercase  lg:w-110  sm:text-[28px] sm:pr-3 sm:leading-10 lg:text-[46px] text-[18px] lg:font-thin text-[#333E48] anim-text lg:leading-14 leading-8'>timepieces that make a statement up to <span className='font-inter font-bold'>40% off</span></span>
                 <div className='lg:pt-9 pt-2 anim-btn'>
                     <button className='relative group bg-primary sm:text-[16px] sm:py-2.5 sm:px-8 lg:py-3 lg:px-14 px-4 py-1.5 lg:rounded-xl rounded-md tracking-wider font-semibold lg:text-[16px] text-sm lg:font-thin cursor-pointer overflow-hidden select-none'>
                        Start Buying
                    <span className='btnHover'/>
                     </button>
                 </div>
              </div >
              <div className='flex-1 flex justify-center anim-image '>
                <img src={SounddeviceSlider} className='lg:h-[790px]  slideImg lg:pt-30 ml-2 lg:pl-0 w-auto object-contain' alt="sounddDevice" />
              </div>
           </div>
      </Container>
    </SwiperSlide>


    <SwiperSlide >
      <Container>
           <div className='flex font-roboto items-center  lg:h-[410px] h-[240px] justify-between w-full overflow-hidden'>
              <div className='flex flex-col lg:w-[445px] w-[60%]'>
                     <span className='uppercase  lg:w-110 sm:text-[28px] lg:text-[46px] text-[18px] lg:font-thin text-[#333E48] lg:leading-14 leading-8 anim-Watch-txt'>
                 <span className='text-[#34BCEC] lg:text-base whitespace-nowrap sm:text-base sm:pb-2 text-[14px] font-semibold uppercase lg:pb-3 pb-1 tracking-widest anim-topTxt block'>the new stardard </span>
                      shop to get what you love
                 </span>
                 <div className='priceTagAnim py-1 sm:pt-2 lg:py-0'>
                    <span className='align-top lg:text-[40px] text-[16px] lg:font-bold font-semibold'>$</span>
                    <span className='lg:text-[54px] text-[20px] font-bold'>749</span>
                    <span className='align-top lg:text-[40px] text-[16px] lg:font-bold font-semibold'>99</span>
                 </div>
                 <div className='lg:pt-9 sm:pt-5 pt-2 anim-btn'>
                     <button className='relative group bg-primary sm:text-[16px] sm:py-2.5 sm:px-8 lg:py-3 font-semibold lg:px-14 px-4 py-1.5 lg:rounded-xl rounded-md tracking-wider lg:text-[16px] text-sm lg:font-thin cursor-pointer overflow-hidden select-none'>
                        Start Buying
                    <span className='btnHover'/>
                     </button>
                 </div>
              </div >
              <div className='flex-1 flex justify-center lg:pl-40'>
                <img src={watchess} className='lg:h-[790px] h-auto lg:pt-30 pl-1 lg:pl-0 w-auto  anim-Watch-img' alt="watches" />
              </div>
           </div>
      </Container>
    </SwiperSlide>
 
    <SwiperSlide >
      <Container>
           <div className='flex font-roboto items-center lg:h-[410px] h-[240px] justify-between w-full overflow-hidden'>
              <div className='flex flex-col lg:w-[445px]  w-[60%]'>
                     <span className='text-[#34BCEC] lg:text-base sm:text-base sm:pb-2 whitespace-nowrap text-[14px] font-semibold uppercase lg:pb-3 pb-1 tracking-widest anim-topTxt'>
                      shop to get what you love
                 </span>
                 <span className='uppercase sm:text-[28px]  sm:pr-3 sm:leading-10 lg:w-110 lg:text-[46px] text-[18px] lg:font-thin text-[#333E48] anim-text lg:leading-14 leading-8'>timepieces that make a statement up to <span className='font-inter font-bold'>40% off</span></span>
                 <div className='lg:pt-9 sm:pt-5 pt-2 anim-btn'>
                     <button className='relative group bg-primary sm:text-[16px] sm:py-2.5 sm:px-8 lg:py-3 lg:px-14 px-4 py-1.5 lg:rounded-xl rounded-md tracking-wider lg:text-[16px] text-sm lg:font-thin font-semibold cursor-pointer overflow-hidden select-none'>
                        Start Buying
                    <span className='btnHover'/>
                     </button>
                 </div>
              </div >
              <div className='flex-1 flex justify-center  pt-13 lg:pt-0'>
                <img src={SmartphonesSlider} className='slideImgTop lg:h-[790px]  lg:pt-30 pt-16 pl-1 lg:pl-0 w-auto object-contain' alt="SmartphonesSlider" />
              </div>
           </div>
      </Container>
    </SwiperSlide>
    </Swiper>
    </Container>
    </div>
    </>
  )
}

export default HeroSlider