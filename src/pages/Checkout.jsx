import React, { useState } from 'react'
import Container from '../components/layouts/Container'
import Dropdown from '../components/ui/Dropdown'
import CouponInput from '../components/ui/CouponInput'
import Billing from './Billing'
import Shipping from './Shipping'
import OrderSummary from '../components/ui/OrderSummary'
import { useCart } from '../features/Cart/hooks/useCart.js'
import { Undo2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const Checkout = () => {
    const navigate = useNavigate()
    const {data} = useCart()
    const [notes, setNotes] = useState()
    const subTotal = data?.data?.totalAmount
      const [discount, setDiscount] = useState(() => {
  const stored = localStorage.getItem("cartCouponCode");
  return stored ? JSON.parse(stored) : null;
});
   const dis = discount?.discountAmount

      const [shipToDifferent, setShipToDifferent] = useState(false)
const cancleCoupon = () =>{
    localStorage.removeItem("cartCouponCode")
    setDiscount(null)
    toast.success('Coupon removed!')
}
      
  return (
    <Container>
       <h2 className='font-pop text-[40px] pt-5 text-tcolor text-center pb-7'>Checkout</h2>
       <Dropdown 
          subtitle={'Have a coupon?'}
          subCls={'pl-1 font-semibold cursor-pointer'}
          title={'Click here to enter your code / Cancel coupon'}
          duration={'duration-250'}
          titleCls='bg-primary  px-5 w-full mb-5 py-3 border-l border-l-8 border-l-tcolor/20 '>
        <div className='flex items-center justify-between'>
            <CouponInput setDiscount={setDiscount} subTotal={subTotal} />
        {dis > 0 &&
          <div>
            <button className="px-4 py-2 rounded-full text-white font-semibold hover:bg-red-500 cursor-pointer mt-5 bg-red-400" onClick={cancleCoupon}>Cancel Coupon</button>
          {discount?.description && 
            <span className="pl-5 text-red-400 text-[22px] font-semibold">{discount?.description}</span>
          }
          </div>
          }
        </div>
       </Dropdown>
       <div className="flex gap-5 pt-10">
         <div className='w-[55%]'>
           <Billing title={'Billing Details'} className={'border-b-[3px] text-[30px] pb-4 border-b-primary'}/>
           <div className=" pt-12 font-inter text-2xl font-bold text-tcolor border-b border-b-gray-300 pb-3 darkH  sm:text-[28px] mb-6">
           <span className='text-[28px] pb-3 font-normal border-b-[3px] mb-6 border-b-primary'>Shipping Details</span>
           </div>
            <input type="checkbox" id='shipping' onClick={()=>setShipToDifferent(!shipToDifferent)} />
           <label htmlFor="shipping" className='font-bold pl-2 select-none'>
             Ship to a different address?
           </label>
            {shipToDifferent &&
              <Shipping className={'pt-10'}/>
            }
            <div className="mb-6 pt-10">
                <label className="mb-2 block font-inter text-sm font-semibold text-tcolor">
                    Order notes <span className="font-normal text-gray-500">(optional)</span>
                </label>

                <textarea
                    onChange={(e)=>setNotes(e.target.value)}
                    rows={5}
                    placeholder="Notes about your order, e.g. special delivery instructions."
                    className="inputRing w-full resize-none rounded-2xl border border-gray-300 bg-white px-5 py-3 font-inter text-[15px] text-tcolor outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222]"
                />
                </div>
         </div>
         <div className='w-[45%]'>
            <OrderSummary discount={discount} shipToDifferent={shipToDifferent} notes={notes}/>
         </div>
       </div>
    </Container>
  )
}

export default Checkout
