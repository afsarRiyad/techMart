import React, { useState } from 'react'
import Container from '../components/layouts/Container'
import { trackOrders } from '../features/user/services/userServices'
import toast from 'react-hot-toast'
import { CheckCircle, Circle, Package, Truck, Home } from 'lucide-react'

const TrackOrder = () => {
  const [orderData, setOrderData] = useState({ orderId: "", email: "" })
  const [trackedOrder, setTrackedOrder] = useState(null)
  const [loading, setLoading] = useState(false)

  const orderSteps = [
    { key: 'pending', label: 'Pending', icon: Circle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
  ]

  const getStatusIndex = (status) => {
    const index = orderSteps.findIndex(step => step.key === status)
    return index >= 0 ? index : 0
  }

  const handleTrack = async () => {
    if (!orderData.orderId || orderData.orderId.trim() === '' || orderData.orderId === undefined || orderData.orderId === null) {
      toast.error('Please enter an Order ID')
      return
    }
    
    setLoading(true)
    try {
      const response = await trackOrders({ orderId: orderData.orderId.trim(), email: orderData.email })
      setTrackedOrder(response.data)
      toast.success('Order found successfully')
      setOrderData({email:'', orderId:''})
    } catch (error) {
      console.log('Track error:', error)
      toast.error(error.message || 'Order not found')
      setTrackedOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Container>
      <main className='text-inter py-2 pb-12 px-3 lg:px-5'> 
        <h1 className='text-[38px] text-tcolor flex justify-center pb-7 font-medium darkH'>Track your Order</h1>
        <span className='text-[15px] text-gray-500 leading-6 block pb-5 font-roboto content-center dark:text-gray-300 w-full mx-auto text-center'>
          To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
        </span>
        
        <div className='flex flex-col lg:flex-row lg:gap-x-8 gap-y-4 w-full lg:gap-y-0'>
          <div className='lg:max-w-[50%] w-full w-[300px]'>
            <label htmlFor='orderId' className='block text-tcolor font-inter font-semibold pb-2 dark:text-gray-300 select-none'>Order ID</label>
            <input 
              onChange={(e) => setOrderData((prev) => ({ ...prev, orderId: e.target.value }))} 
              id='orderId' 
              type="text" 
              className='w-full border rounded-full border-gray-200 outline-none px-7 py-2 text-gray-700 inputRing dark:placeholder:text-gray-200' 
              placeholder='Found in your order confirmation email.'
            />
          </div>
          <div className='lg:max-w-[50%] w-full'>
            <label htmlFor='billingEmail' className='block text-tcolor font-inter font-semibold pb-2 dark:text-gray-300 select-none'>Billing email</label>
            <input 
              id='billingEmail' 
              onChange={(e) => setOrderData((prev) => ({ ...prev, email: e.target.value }))} 
              type="email" 
              className='w-full border rounded-full border-gray-200 outline-none px-7 py-2 text-gray-700 inputRing dark:placeholder:text-gray-200' 
              placeholder='Email you used during checkout.' 
              autoComplete="email"
            />
          </div>
        </div>
        <button 
          onClick={handleTrack} 
          disabled={loading}
          className='bg-gray-200 w-34 h-12 hover:bg-black dark:hover:border dark:hover:border-gray-200 hover:text-white text-black font-bold py-2 px-4 rounded-full mt-4 cursor-pointer transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Tracking...' : 'Track Order'}
        </button>

        {trackedOrder && (
          <div className='mt-12 max-w-4xl mx-auto'>
            {/* Order Summary */}
            <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h2 className='text-2xl font-bold text-tcolor dark:text-white mb-2'>
                    Order {trackedOrder.orderNumber}
                  </h2>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Placed on {formatDate(trackedOrder.createdAt)}
                  </p>
                </div>
                <div className='text-right'>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    trackedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    trackedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    trackedOrder.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    trackedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {trackedOrder.status.charAt(0).toUpperCase() + trackedOrder.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 text-sm'>Total Amount</p>
                  <p className='text-xl font-bold text-tcolor dark:text-white'>${trackedOrder.totalAmount?.toFixed(2)}</p>
                </div>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 text-sm'>Payment Method</p>
                  <p className='text-xl font-bold text-tcolor dark:text-white capitalize'>{trackedOrder.paymentMethod?.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 text-sm'>Payment Status</p>
                  <p className={`text-xl font-bold capitalize ${
                    trackedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'
                  }`}>{trackedOrder.paymentStatus}</p>
                </div>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 text-sm'>Items</p>
                  <p className='text-xl font-bold text-tcolor dark:text-white'>{trackedOrder.items?.length}</p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className='bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md'>
              <h3 className='text-xl font-bold text-tcolor dark:text-white mb-8'>Order Status</h3>
              
              <div className='relative'>
                {/* Green Progress Line */}
                <div className='absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700'>
                  <div 
                    className='h-full bg-green-500 transition-all duration-500'
                    style={{ width: `${(getStatusIndex(trackedOrder.status) / (orderSteps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className='flex justify-between relative'>
                  {orderSteps.map((step, index) => {
                    const Icon = step.icon
                    const isCompleted = index <= getStatusIndex(trackedOrder.status)
                    const isCurrent = index === getStatusIndex(trackedOrder.status)
                    
                    return (
                      <div key={step.key} className='flex flex-col items-center relative z-10'>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className='w-6 h-6 text-white' />
                          ) : (
                            <Icon className={`w-6 h-6 ${isCurrent ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`} />
                          )}
                        </div>
                        <span className={`mt-3 text-sm font-medium ${
                          isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Current Status Message */}
              <div className='mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
                <p className='text-green-800 dark:text-green-300 font-medium'>
                  {trackedOrder.status === 'delivered' && 'Your order has been delivered successfully!'}
                  {trackedOrder.status === 'shipped' && 'Your order is on the way and will be delivered soon.'}
                  {trackedOrder.status === 'processing' && 'Your order is being processed and prepared for shipment.'}
                  {trackedOrder.status === 'pending' && 'Your order has been received and is pending confirmation.'}
                  {trackedOrder.status === 'cancelled' && 'This order has been cancelled.'}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className='mt-8 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-bold text-tcolor dark:text-white mb-4'>Order Items</h3>
              <div className='space-y-4'>
                {trackedOrder.items?.map((item, index) => (
                  <div key={index} className='flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0'>
                    <div>
                      <p className='font-medium text-tcolor dark:text-white'>{item.productName}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>Qty: {item.quantity} × ${item.unitPrice?.toFixed(2)}</p>
                    </div>
                    <p className='font-bold text-tcolor dark:text-white'>${item.totalPrice?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </Container>
  )
}

export default TrackOrder