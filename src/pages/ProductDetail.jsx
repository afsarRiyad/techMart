import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import SidebarLayout from '../components/layouts/SidebarLayout'
import { useGetCategories } from '../features/products/hooks/useGetCategories'
import { ChevronRight, Plus, Minus, Heart, ShoppingCart, GitCompareArrows, Search, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useGetProduct } from './../features/products/hooks/useGetProduct';
import { useUpdateWishlist } from '../features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '../features/wishlist/hooks/useWishlist';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaOpencart } from "react-icons/fa6";
import { FaApple } from 'react-icons/fa'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useAddToCart } from '../features/Cart/hooks/useAddToCart'
import Accessories from './../components/products/Accessories';
import Reviews from '../components/products/Reviews'
import TechnicalSpecifications from '../components/products/TechnicalSpecifications '
import MoreProducts from '../components/products/MoreProducts'
import Gridview from '../components/products/Gridview'

const buttons = [
             {id:1, title:'Accessories', name:'randomCombo'},
             {id:2, title:'Description', name: 'description'},
             {id:3, title:'Specifications', name: 'specifications'},
             {id:4, title:'Reviews', name: 'reviews'},
             {id:5, title:'More Products', name: 'moreProducts'},
]

const ProductDetail = () => {
  const { slug } = useParams()
  const [show, setShow] = useState('randomCombo')
  const updateQuantity = useAddToCart()
  const { data: product, isLoading, isError } = useGetProduct(slug)
  const addtoWishlist = useUpdateWishlist()
  const { data: wishlistData } = useWishlist()
  const [proQuantity, setProQuantity] = useState('1')
  const price = product?.salePrice ?? product?.price
  const discountPercent = (product?.regularPrice - price) / product?.regularPrice * 100
  console.log(show);
   
  
  const productImages = product?.images && product.images.length > 0 ? product.images
  : product?.image ? [product.image]  : [];
  
  const [quantity, setQuantity] = useState(1)
  const wishListItem = wishlistData?.data || [];
  
  const isInWishlist = (proId) => {
    return wishListItem.some((item) => item._id === proId);
  }
  
  const handleQuantityChange = async(id) => {
    const data = {
           product : id,
           quantity : Number(proQuantity)
    }
    await updateQuantity.mutate(data)
  }
  console.log(product?._id);
  
  const handleAddToCart = () => {
    toast.success('Added to cart!')
  }
  
  const handleAddToWishlist = () => {
    addtoWishlist.mutate({
      productId: product?._id || product?.id
    })
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">Loading product...</div>
      </div>
    )
  }
  console.log(product);
  
  if (isError || !product) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-red-500">Product not found</div>
      </div>
    )
  }
const getPoints = (data) => {
  const words = data.split(' ');
  const points = [];
  const chunkSize = Math.ceil(words.length / 5);
  for (let i = 0; i < words.length; i += chunkSize) {
    points.push(words.slice(i, i + chunkSize).join(' '));
  }
  return points;
};

  
  const ProductDetailContent = ({ active, setActive }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [zoom, setZoom] = useState(false)
      const [position, setPosition] = useState({ x: 50, y: 50 });

     const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };
  const activeButtons = buttons.filter(button =>{
     switch (button.name) {
      case 'randomCombo':
        return product?.randomCombo && product?.randomCombo.length > 0;
        case 'description':
          return Boolean(product?.description.trim());
          case 'specifications':
          return product?.specifications && product?.specifications.length > 0;
          case 'reviews':
          return true;
          case 'moreProducts':
          return true;
      default:
        true;
     }}
  )


    return (
      <>
        <div className="flex flex-col md:flex-row gap-8 font-inter">
          {/* Product Images */}
          <div className="max-w-[395px]  w-full">
      <div className='relative'>
         <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
          }}
                className="mySwiper2"
      >
            {productImages.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    className=" overflow-hidden cursor-pointer "
                  >
                    <img onMouseEnter={()=>setZoom(true)} onMouseLeave={()=>setZoom(false)}
                    onMouseMove={handleMouseMove}
                      src={img} 
                      style={{  transform: zoom ? "scale(2)" : "scale(1)",
                          transformOrigin: `${position.x}% ${position.y}%`,  }}
                      alt={`${product?.name || 'Product'} ${index + 1}`}
                      className={`w-full mb-5 object-cover `}
                    />
                  </SwiperSlide>
                ))}
         </Swiper>
                <Search size={18} className='absolute pointer-events-none z-20 right-1 top-1 text-gray-400'/>
               {product?.salePrice && 
                  <span className={`bg-[#DC3545] px-3 py-1 text-white rounded-sm absolute top-3 left-3 font-semibold z-20 pointer-events-none`}>-{Math.floor(discountPercent)}%</span>
               }
      </div>
            {/* Thumbnail images for slider */}
             <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper "
      >
            {productImages.length > 1 && (
              <div className="">
                {productImages.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    className=" overflow-hidden cursor-pointer "
                  >
                    <img 
                      src={img} 
                      alt={`${product?.name || 'Product'} ${index + 1}`}
                      className="w-full pb-2 h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </div>
            )}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="w-full">
            <div className='flex gap-2'>
            {product?.categories?.map(item =>(
                <span key={item} className='text-[14px] hover:text-gray-800 text-gray-400 cursor-pointer'>{item}</span>
              ))}
              </div>
              <h1 className="text-[25px] font-medium  text-tcolor mb-2 border-b border-b-gray-300 pb-3">{product?.name || 'Product Name'}</h1>
               <div className='text-[15px] text-gray-600'> Availability: <span className='font-semibold text-[16px] text-green-700'>{product.stock} in stocks.</span> </div>
              {/* wishlist and compare  */}
                <div className='flex gap-4 mb-4 pt-5'>
                  {isInWishlist(product?._id || product?.id) ? (
                    <Link to='/wishlist' className='flex items-center gap-2 text-sm text-gray-500 hover:text-black cursor-pointer'>
                      <Heart size={18} className='text-black' fill="currentColor" />
                      <span>Added to Wishlist</span>
                    </Link>
                  ) : (
                    <button onClick={handleAddToWishlist} className='flex items-center gap-2 text-sm text-gray-500 hover:text-black cursor-pointer'>
                      <Heart size={18} />
                      <span>Wishlist</span>
                    </button>
                  )}
                  <button className='flex items-center gap-2 text-sm text-gray-500 hover:text-black cursor-pointer'>
                    <GitCompareArrows size={18} />
                    <span>Compare</span>
                  </button>
                </div>
                <div>
            </div>

            {product.description && 
             <ul className='flex flex-col gap-[1px] list-disc pl-7 pt-1 font-inter'>
              {getPoints(product.description).map((point, index) => (
                 <li key={index} className='text-[14px] font-medium text-gray-500 font-inter'>{point}</li>
                  ))}
             </ul>
            }
             {/* price and discount  */}
            <div className='pt-9'>
               <span className={`${product?.salePrice ? 'text-[#DC3545]' : 'text-gray-600'} font-medium text-[35px]`}>${price.toFixed(2)}</span>
               {/* discount regular price  */}
              {product?.salePrice && 
                <span className='text-[21px] text-gray-400 line-through pl-1'>${product?.regularPrice.toFixed(2)}</span>
              }
            </div>
                {/* quantity input field  */}
                <div className='pt-6 flex gap-3'>
                  <input type="number" className='border border-gray-300 rounded-full w-32 py-3     outline-none focus:ring-2 ring-blue-400/20 px-6'
                      value={proQuantity}
                      onChange={(e)=>setProQuantity(e.target.value)}
                      min={1}
                      max={product?.stock}
                          />
                  <button onClick={()=>handleQuantityChange(product?._id)} className='flex  gap-2 items-center justify-center px-10 py-3 bg-primary text-black rounded-full text-[16px] font-bold hover:bg-black cursor-pointer transition-all duration-150 hover:text-white'><FaOpencart size={20}/> Add to cart</button>
                </div>
                <div className="flex flex-wrap gap-4 font-inter">
              {/* Apple Pay button */}
              <div className='pt-5 flex gap-4 w-full'>
              <button
                type="button"
                aria-label="Pay with Apple Pay"
                className="flex items-center justify-center gap-1.5 h-12 px-8 flex-1 rounded-sm bg-black text-white cursor-pointer transition-transform duration-150 hover:opacity-90 ]"
              >
                <FaApple size={22} />
                <span className="text-[21px]  tracking-tight "> Pay</span>
              </button>

              {/* Link button */}
              <button
                type="button"
                aria-label="Pay securely with Link"
                className="flex items-center justify-center gap-2 h-12 px-8 flex-1  rounded-msm bg-[#00D66F] text-black cursor-pointer transition-transform duration-150 hover:brightness-95"
              >
                <span className="text-[18px] font-medium">Pay securely with</span>
                <span className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-black shrink-0">
                    <ArrowRight size={11} color="#00D66F" strokeWidth={3} />
                  </span>
                  <span className="text-[17px] font-semibold ">link</span>
                </span>
              </button>
            </div>
            </div>
          </div>
        </div>
            <div className='pt-32 flex gap-8 justify-center  text-tcolor text-[18px]'>
              {activeButtons.map(item =>(
               <button
            key={item.id}
            value={show}
            onClick={() => setShow(item.name)}
            className={`relative pb-3 cursor-pointer ${
              show === item.name ? 'border-b-2 border-b-primary font-medium after:content-[""] after:absolute after:left-1/2 after:-bottom-[11px] after:-translate-x-1/2 after:border-l-[7px] after:border-r-[12px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-primary' : '' }`}
          >
            {item.title}
          </button>
              ))}  
            </div>
            <div className='border rounded-lg border-gray-300 py-10 px-10 min-h-[300px] w-full '>
              {show === 'randomCombo' &&
                 <Accessories data={product?.randomCombo}/> 
                }
               {show === 'reviews' &&
                 <Reviews data={product?.reviews}/> 
                }
               {show === 'specifications' &&
                 <TechnicalSpecifications data={product?.specifications}/> 
                }
               {show === 'moreProducts' &&
                 <MoreProducts data={product?.moreProducts}/> 
                }
               {show === 'description' &&
                 <p >{product.description}</p>
                }
            </div>
            <div className='pt-10'>
             <div className="border-b border-b-gray-300 pb-3 mb-8 ">
                            <span className=" text-[26px] text-tcolor border-b-[2px] border-b-primary pb-[13px]">
                                Related Products
                            </span>
                        </div>
              <Gridview products={product?.relatedProducts} grid={'4'}/>
            </div>
      </>
    )
  }

  return (
    <SidebarLayout>
      {({ active, setActive }) => <ProductDetailContent active={active} setActive={setActive} />}
    </SidebarLayout>
  )
}

export default ProductDetail

