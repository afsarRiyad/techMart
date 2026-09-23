import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import Container from '@/components/layout/Container'
import { Link, useNavigate } from 'react-router'
import { Eye } from 'lucide-react'
import { useOrders } from '@/features/user/hooks/useOrders'


const Orders = () => {
  const navigate = useNavigate()
  const { data: order, isLoading, error } = useOrders()

  const handleNavigate =(orderId)=>{
     const id = orderId.replace('#', '')
       const targetOrder = order?.data?.filter((target)=> target.orderNumber === orderId)   
       navigate(`/account/orders/${id}`, {state: {order: targetOrder}})
  }
  if (isLoading) {
    return <div>Loading orders...</div>
  }
  if (!order?.data?.length) {
    return (
      <div className="py-10">
        <div className="relative overflow-hidden rounded bg-primary px-8 py-6 md:px-10">
          <span className="absolute left-0 top-0 h-full w-1.5 bg-yellow-600" />

          <p className="text-center text-[22px] text-tcolor dark:text-gray-100 md:text-[26px]">
            Your orders are currently empty.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#212121] px-8 py-3 text-[15px] font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Return to shop
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <>
       <div className="w-full hidden md:flex overflow-x-auto font-inter rounded-lg border-y border-y-gray-200 dark:border-y-[#333333] bg-white dark:bg-[#262626] dark:bg-[#212121]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-[#333333] text-left">
            <th className="px-8 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 dark:text-gray-300">
              Order
            </th>
            <th className="px-8 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 dark:text-gray-300">
              Date
            </th>
            <th className="px-8 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 dark:text-gray-300">
              Status
            </th>
            <th className="px-8 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 dark:text-gray-300">
              Total
            </th>
            <th className="pl-4 text-sm font-semibold text-gray-700 dark:text-gray-200 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {order?.data?.map((order) => (
            <tr
              key={order._id}
              className="border-b border-gray-200 dark:border-[#333333] last:border-none"
            >
              <td className="px-8 py-6 font-semibold text-gray-800 dark:text-gray-100 cursor-pointer">
                <button onClick={()=>handleNavigate(order.orderNumber)}>
                  {order.orderNumber}
                </button>
              </td>

              <td className="px-8 py-6 text-gray-600 dark:text-gray-300">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
              </td>

              <td className="px-8 py-6 text-yellow-600 font-medium">
                {order.status}
              </td>

              <td className="px-8 py-6 text-gray-600 dark:text-gray-300">
                ${(order.totalAmount).toFixed(2)} for {order.items.length} items
              </td>

              <td className="">
                <button onClick={()=>handleNavigate(order.orderNumber)} className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#212121] px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-black hover:text-white duration-200 cursor-pointer">
                  View
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>

  {/* Mobile */}
  <div className="space-y-4 md:hidden font-inter">
    {order?.data?.map((order) => (
      <div
        key={order._id}
        className="rounded-lg border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#262626] dark:bg-[#212121] p-4"
      >
        <div className="flex justify-between gap-3">
          <span className="text-gray-500 dark:text-gray-400">Order</span>
          <span className="font-semibold">{order.orderNumber}</span>
        </div>

        <div className="mt-3 flex justify-between gap-3">
          <span className="text-gray-500 dark:text-gray-400">Date</span>
          <span>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Status</span>
          <span className="text-yellow-600 font-medium">
            {order.status}
          </span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Total</span>
          <span>{order.totalAmount}</span>
        </div>

        <button
          onClick={() => handleNavigate(order.orderNumber)}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#2a2a2a] py-3 font-medium hover:bg-gray-200 dark:hover:bg-[#333333] dark:text-gray-200"
        >
          View
          <Eye size={18} />
        </button>
      </div>
    ))}
  </div>
</div>
    </>
  )
}

export default Orders
