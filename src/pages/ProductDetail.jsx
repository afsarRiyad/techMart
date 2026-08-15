import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import SidebarLayout from '../components/layouts/SidebarLayout'
import { useGetCategories } from '../features/products/hooks/useGetCategories'
import { ChevronRight, Plus, Minus, Heart, ShoppingCart, GitCompareArrows, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { useGetProduct } from './../features/products/hooks/useGetProduct';
import { useUpdateWishlist } from '../features/wishlist/hooks/useUpdateWishlist';
import { useWishlist } from '../features/wishlist/hooks/useWishlist';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const ProductDetail = () => {
  const { slug } = useParams()
  const { data: product, isLoading, isError } = useGetProduct(slug)
  const addtoWishlist = useUpdateWishlist()
  const { data: wishlistData } = useWishlist()
  const discountPrice = product?.salePrice ?? product?.price
  
  const productImages = product?.images && product.images.length > 0 ? product.images
  : product?.image ? [product.image]  : [];
  
  const [quantity, setQuantity] = useState(1)
  const wishListItem = wishlistData?.data || [];
  
  const isInWishlist = (proId) => {
    return wishListItem.some((item) => item._id === proId);
  }
  
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }
  
  const handleAddToCart = () => {
    // Add cart logic here
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

    return (
      <>
        <div className="flex flex-col md:flex-row gap-8 font-inter">
          {/* Product Images */}
          <div className="max-w-[395px]  w-full">
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
                    className=" overflow-hidden cursor-pointer relative "
                  >
                    <img onMouseEnter={()=>setZoom(true)} onMouseLeave={()=>setZoom(false)}
                    onMouseMove={handleMouseMove}
                      src={img} 
                      style={{  transform: zoom ? "scale(2)" : "scale(1)",
                          transformOrigin: `${position.x}% ${position.y}%`,  }}
                      alt={`${product?.name || 'Product'} ${index + 1}`}
                      className={`w-full mb-5 object-cover `}
                    />
                    <Search size={18} className='absolute z-20 right-0 top-0 text-gray-400'/>
                  </SwiperSlide>
                ))}
         </Swiper>
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
             <ul className='flex flex-col gap-1 list-disc pl-7 pt-2 font-inter'>
              {getPoints(product.description).map((point, index) => (
                 <li key={index} className='text-[14px] font-medium text-gray-500 font-inter'>{point}</li>
                  ))}
             </ul>
            }
          

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product?.rating || 0))}
                {'☆'.repeat(5 - Math.floor(product?.rating || 0))}
              </div>
              <span className="text-gray-500">({product?.reviews || 0} reviews)</span>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-600">
              <p>{product?.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${product?.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">
                {product?.stock > 0 ? `${product?.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity >= (product?.stock || 10)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product?.stock === 0}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">SKU:</span>
                  <span className="ml-2 font-medium">{product?.sku}</span>
                </div>
                <div>
                  <span className="text-gray-500">Brand:</span>
                  <span className="ml-2 font-medium">{product?.brand}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium">
                    {product?.categories?.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Tags:</span>
                  <span className="ml-2 font-medium">
                    {product?.tags?.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
