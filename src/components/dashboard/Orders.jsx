import React from 'react'
import Dashboard from './Dashboard'
import Container from '../layouts/Container'
import { Link, useNavigate } from 'react-router'
import { Eye } from 'lucide-react'
import { useOrders } from '../../features/user/hooks/useOrders'


const Oders = () => {
  const navigate = useNavigate()
  const { data: order, isLoading, error } = useOrders()
  console.log(order?.data);

  const handleNavigate =(orderId)=>{
     const id = orderId.replace('#', '')
       const targetOrder = order?.data?.filter((target)=> target.orderNumber === orderId)   
       navigate(`/account/orders/${id}`, {state: {order: targetOrder}})
  }
  
  return (
    <>
       <div className="w-full hidden md:flex overflow-x-auto font-inter rounded-lg border-y border-y-gray-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th className="px-8 py-4 text-sm font-semibold text-gray-700">
              Order
            </th>
            <th className="px-8 py-4 text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="px-8 py-4 text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-8 py-4 text-sm font-semibold text-gray-700">
              Total
            </th>
            <th className="pl-4 text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {order?.data?.map((order) => (
            <tr
              key={order._id}
              className="border-b border-gray-200 last:border-none "
            >
              <td className="px-8 py-6 font-semibold text-gray-800 cursor-pointer">
                <button onClick={()=>handleNavigate(order.orderNumber)}>
                  {order.orderNumber}
                </button>
              </td>

              <td className="px-8 py-6 text-gray-600">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
              </td>

              <td className="px-8 py-6 text-yellow-600 font-medium">
                {order.status}
              </td>

              <td className="px-8 py-6 text-gray-600">
                ${(order.totalAmount).toFixed(2)} for {order.items.length} items
              </td>

              <td className="">
                <button onClick={()=>handleNavigate(order.orderNumber)} className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-black hover:text-white duration-200 cursor-pointer">
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
        className="rounded-lg border border-gray-200 bg-white p-4"
      >
        <div className="flex justify-between">
          <span className="text-gray-500">Order</span>
          <span className="font-semibold">{order.id}</span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-gray-500">Date</span>
          <span>{order.createdAt}</span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className="text-yellow-600 font-medium">
            {order.status}
          </span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-gray-500">Total</span>
          <span>{order.totalAmount}</span>
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gray-100 py-3 font-medium hover:bg-gray-200">
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

export default Oders
