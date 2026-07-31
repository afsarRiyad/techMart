import React, { useState } from 'react'
import { validateCoupon, applyCoupon } from '../hooks/Fetchdata'

const Cart = () => {
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderTotal] = useState(100) // This should come from your cart total

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code')
      return
    }

    setLoading(true)
    setError('')
    setDiscount(null)

    try {
      const response = await validateCoupon(couponCode, orderTotal)
      if (response.success) {
        setDiscount(response.data)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid coupon code')
    } finally {
      setLoading(false)
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await applyCoupon(couponCode, orderTotal)
      if (response.success) {
        setDiscount(response.data)
        alert('Coupon applied successfully!')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply coupon')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {/* Coupon Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3">Have a coupon?</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleValidateCoupon}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Validate'}
          </button>
          <button
            onClick={handleApplyCoupon}
            disabled={loading || !discount}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        {discount && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-semibold">
              Coupon Applied: {discount.code}
            </p>
            <p className="text-green-600 text-sm">
              {discount.discountType === 'percentage' 
                ? `${discount.discountValue}% off` 
                : `$${discount.discountValue} off`}
            </p>
            <p className="text-green-600 text-sm">
              Discount: ${discount.discountAmount.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
        {discount && (
          <div className="flex justify-between mb-2 text-green-600">
            <span>Discount:</span>
            <span>-${discount.discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>
            ${discount 
              ? (orderTotal - discount.discountAmount).toFixed(2) 
              : orderTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Cart