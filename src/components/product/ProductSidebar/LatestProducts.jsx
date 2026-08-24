import React from 'react'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { apiCustomer } from '@/api/apiCustomer'
import { FaStar, FaRegStarHalfStroke } from 'react-icons/fa6'

const Rating = React.memo(({ rate }) => {
  const fullRating = Math.floor(rate)
  return (
    <div className="flex py-2">
      {Array.from({ length: 5 }, (_, i) =>
        i < fullRating ? (
          <FaStar className="text-primary" key={i} />
        ) : (
          <FaRegStarHalfStroke className="text-primary" key={i} />
        )
      )}
    </div>
  )
})

Rating.displayName = 'Rating'

const LatestProducts = () => {
  const { data: latest, isLoading } = useQuery({
    queryKey: ['latestProducts'],
    queryFn: async () => {
      const res = await apiCustomer.get('/api/products', {
        params: { limit: 5, sort: 'latest' },
      })
      return res.data
    },
  })

  if (isLoading) {
    return (
      <div className="pt-10 font-pop">
        <div className="border-b border-b-gray-300 pb-3 mb-8">
          <span className="font-medium text-[18px] text-tcolor border-b-[2px] border-b-primary pb-[13px]">
            Latest Products
          </span>
        </div>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex gap-4 pb-5 animate-pulse">
            <div className="w-20 h-20 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="pt-10 font-pop">
      <div className="border-b border-b-gray-300 pb-3 mb-8">
        <span className="font-medium text-[18px] text-tcolor border-b-[2px] border-b-primary pb-[13px]">
          Latest Products
        </span>
      </div>
      {latest?.data?.map((item) => (
        <div key={item._id} className="flex gap-4 leading-none pb-5">
          <Link to={`/products/${item.slug || item._id}`}>
            <img src={item.image} alt={item.name} loading="lazy" className="w-20 h-auto cursor-pointer" />
          </Link>
          <div>
            <Link
              to={`/products/${item.slug || item._id}`}
              className="text-[14px] line-clamp-2 text-gray-500 font-medium cursor-pointer hover:text-black"
            >
              {item.name}
            </Link>
            {item.rating && <Rating rate={item.rating} />}
            <span className="font-medium text-[15px]">${item.price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(LatestProducts)
