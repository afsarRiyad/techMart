import { ChevronDown, LockKeyhole, X } from 'lucide-react';
import Container from './../components/layouts/Container';
import Dropdown from '../components/ui/Dropdown';
import { useCart } from '../features/Cart/hooks/useCart.js';
import { useRemoveFromCart } from "../features/Cart/hooks/useRemoveCart.js";
import { useState } from "react";
import { useUpdateCart } from "../features/Cart/hooks/useUpdateCart.js";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import CouponInput from '../components/ui/CouponInput.jsx';
import { useApplyCoupon } from '../features/Cart/hooks/useApplyCoupon.js';
import { useShippingAddress } from '../features/user/hooks/useShippingAddress.js';
import { useAuth } from '../hooks/useAuth.js';

const Cart = () => {
  const [showVerifyAlert, setShowVerifyAlert] = useState(false);
  const navigate = useNavigate();
  const couponMutation = useApplyCoupon();
  const [deliveryArea, setDeliveryArea] = useState('inside')
  const updateShippingAddress = useShippingAddress()
  const [discount, setDiscount] = useState(() => {
  const stored = localStorage.getItem("cartCouponCode");
  return stored ? JSON.parse(stored) : null;
});
  const [cartData, setCartData] = useState({});
  const {data: userData} = useAuth()
  const { data, isLoading, error } = useCart();
 const subTotal = data?.data?.totalAmount
 const flatCharge = deliveryArea === 'inside' ? 0 : 50;
 const tax = subTotal * 0.15
 const totalAmount = subTotal + flatCharge + tax
 const cartItems = data?.data?.items
const dis = discount?.discountAmount ?? 0
const discountedSubTotal = subTotal - dis 
const removeMutation = useRemoveFromCart()
const updateMutation = useUpdateCart()
const handleRemove = (itemId)=>{
        removeMutation.mutateAsync(itemId)
}
console.log(userData?.data?.isVerified);

const handleChange = (itemId, newQuantity) =>{
  setCartData(prev =>({...prev, [itemId]: newQuantity}))
}
const handleUpdate = async () => {
  const updateEntries = Object.entries(cartData);
  if (updateEntries.length === 0) return;

  const results = await Promise.all(
    updateEntries.map(([itemId, quantity]) =>
      updateMutation.mutateAsync({ itemId, quantity })
    )
  );

  if (dis > 0) {
    const freshTotal = results[results.length - 1]?.data?.totalAmount;
    const res = await couponMutation.apply({ code: discount?.code, orderTotal: freshTotal });
    setDiscount(res);
  }
};


const cancleCoupon = () =>{
    localStorage.removeItem("cartCouponCode")
    setDiscount(null)
    toast.success('Coupon removed!')
}
const handleAdrsUpdate = async() =>{
           await updateShippingAddress.mutate()
}
const handleCheckoutClick = () => {
  if (!userData?.data?.isVerified) {
    setShowVerifyAlert(true);
    return;
  }
  navigate('/checkout');
};

return(
  <>
  {showVerifyAlert && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center relative">
      <X
        className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-black"
        onClick={() => setShowVerifyAlert(false)}
      />
      <h2 className="text-[20px] font-semibold text-tcolor mb-2">
        Verify your account
      </h2>
      <p className="text-gray-500 mb-6">
        You need to verify your account before proceeding to checkout.
      </p>
      <Link
        to="/account/otp-verification"
        onClick={() => setShowVerifyAlert(false)}
        className="inline-block bg-primary text-tcolor font-semibold py-3 px-8 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
      >
        Go to Verify Page
      </Link>
    </div>
  </div>
)}
    {!cartItems || cartItems.length === 0 ? (
      <div className="py-10">
        <div className="relative overflow-hidden rounded bg-primary px-8 py-6 md:px-10">
          <span className="absolute left-0 top-0 h-full w-1.5 bg-yellow-600" />
          <p className="text-center text-[22px] text-tcolor md:text-[26px]">
            Your cart is currently empty.
          </p>
        </div>
    
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-gray-100 px-8 py-3 text-[15px] font-medium text-gray-700 transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Return to shop
          </Link>
        </div>
      </div>
    ) : (
    <section className="font-pop ">
      <Container>
        <h1 className="text-[40px] text-tcolor w-full text-center pt-6 pb-10">Shopping Cart</h1>
        {cartItems?.length > 0 ?
        <>
         <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-300 text-[#747474] font-semibold">
                <th className="w-[55%] py-4 text-start pl-45">Product</th>
                <th className="w-[15%] py-4 text-left">Price</th>
                <th className="w-[15%] py-4 text-left">Quantity</th>
                <th className="w-[15%] py-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item)=>(
                <tr key={item._id} className='border-b border-b-gray-200'>
                  <td className="py-4 flex items-center gap-4">
                 <div className='flex items-center gap-8'>
                   <X className='text-gray-400 cursor-pointer hover:text-black' onClick={ ()=>handleRemove(item?.product?._id) }/>
                    <Link to={`/products/${item.product.slug || item.product._id}`}>
                      <img src={item.product.image} alt={item.product.name} className="w-[80px] h-[80px] object-cover rounded cursor-pointer" />
                    </Link>
                    <Link to={`/products/${item.product.slug || item.product._id}`} className='text-[18px] pl-3 cursor-pointer hover:text-black font-pop text-gray-500 font-semibold'>{item.product.name}</Link>
                 </div>
                   </td>
                   <td className="py-4 text-left text-tcolor text-[17px] font-semibold">${(item.product.price).toFixed(2)}</td>
                   <td>
                    <input
                     onChange={(e)=>handleChange(item._id, parseInt(e.target.value))}
                     disabled={updateMutation.isPending}
                      type="number"
                      min="1"
                      max={item.product.stock}
                      defaultValue={item.quantity}
                      className='w-20 px-4 py-2 rounded-[12px] outline-none border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    />
                   </td>
                     <td className="py-4 text-left text-tcolor text-[17px] font-semibold">
                       ${(item.product.price * item.quantity).toFixed(2)}
                     </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dis > 0 &&
          <button className="px-4 py-2 rounded-full text-white font-semibold hover:bg-red-500 cursor-pointer mt-5 bg-red-400" onClick={cancleCoupon}>Cancel Coupon</button>}
          {discount?.description && 
            <span className="pl-5 text-red-400 text-[22px] font-semibold">{discount?.description}</span>
          }
           {/* button section  */}
           <div className='pb-10 pt-20 flex justify-between '>
              <CouponInput setDiscount={setDiscount} subTotal={subTotal}/>
              <div className='flex flex-col '>
                <button onClick={handleUpdate} className='bg-gray-200 text-gray-500 font-semibold py-3 w-34 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 ml-15'>Update Cart</button>
                <button
                  onClick={handleCheckoutClick}
                  className='bg-primary hover:text-white text-tcolor font-semibold py-3 px-6 rounded-full cursor-pointer hover:bg-black transition-colors duration-200'
                >
                  Procesed to checkout
                </button>
              </div>
           </div>
           {/* cart totals  */}
           <section className='w-full  flex justify-end pt-8 '>
            <div className='max-w-[400px] w-full'>
             <div className='border-b border-b-gray-300 '>
               <h4 className='text-[25px] text-tcolor border-b-[2px] border-b-primary w-40 pb-3 '>
                  Cart totals
                </h4>
             </div>
             <div className='flex justify-between border-b border-b-gray-300 pt-4 pb-2'>
               <span className='font-bold text-[15px]'>Subtotal</span>
               <span className='text-gray-900'>${subTotal?.toFixed(2)}</span>
             </div>
             {dis > 0 && (
               <div className='flex justify-between border-b border-b-gray-300 pt-3 pb-2'>
                 <span className='font-bold text-[15px] text-green-600'>Coupon Discount</span>
                 <span className='font-semibold text-green-600'>- ${dis.toFixed(2)}</span>
               </div>
             )}
             <div className='font-bold  pt-3 pb-4 text-[15px] text-tcolor'>Shipping: {`sara palson`}</div>

               <div className='py-2 flex justify-between border-y border-y-gray-200'>
                <span className='font-semibold'>Tax - 15%</span>
                <span className='font-semibold text-red-800/70'>${tax.toFixed(2)}</span>
               </div>
               <div className='flex justify-between py-2 '>
                <div className='flex gap-3'>
                  <span className=' text-[15px] '>Flat rate:</span>
                <Dropdown title={'Select shipping'}
                          titleCls='font-semibold'
                          icon={<ChevronDown size={19}/>}>
                 <div>
                        <label>
                          <input
                            type="radio"
                            name="deliveryArea"
                            value="inside"
                            checked={deliveryArea === 'inside'}
                            onChange={(e) => setDeliveryArea(e.target.value)}
                          />
                          <span className="pl-2">Inside Dhaka</span>
                        </label>
                      </div>

                      <div>
                        <label>
                          <input
                            type="radio"
                            name="deliveryArea"
                            value="outside"
                            checked={deliveryArea === 'outside'}
                            onChange={(e) => setDeliveryArea(e.target.value)}
                          />
                          <span className="pl-2">Outside Dhaka</span>
                        </label>
                      </div>
                </Dropdown>
                </div>
               <span className='text-gray-900'>${flatCharge.toFixed(2)}</span>

             </div>
             <div className=' pt-1 pb-4 text-[15px] text-tcolor'>
              Shipping to <span className='font-bold'> {`sdfsad, asdfsd, CA 94102.`}</span> 
              </div>
               <div className='border-b border-b-gray-300 pb-4'>
                 <Dropdown 
                title={'Change addresses'} 
                titleCls={'text-[15px] text-tcolor font-bold cursor-pointer'} 
                icon={<ChevronDown size={20} className='ml-2' />}
                duration={'duration-1200'}
              >
                <div className='pt-6 space-y-5 max-w-[400px]'>
                  {/* Country / Region */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor mb-1'>
                      Country / Region <span className='text-red-500'>*</span>
                    </label>
                    <select
                      className='w-full px-4 py-2 rounded-full border border-gray-300 outline-none text-gray-600 appearance-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666%27 stroke-width=%272%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e")] bg-no-repeat bg-[right_1rem_center]'
                    >
                      <option>Bangladesh (BD)</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor mb-1'>
                      State <span className='text-red-500'>*</span>
                    </label>
                    <select
                      className='w-full px-4 py-2 rounded-full border border-gray-300 outline-none text-gray-600 appearance-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666%27 stroke-width=%272%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e")] bg-no-repeat bg-[right_1rem_center]'
                    >
                      <option>Dhaka</option>
                      <option>Chattogram</option>
                      <option>Rajshahi</option>
                      <option>Khulna</option>
                      <option>Barishal</option>
                      <option>Sylhet</option>
                      <option>Rangpur</option>
                      <option>Mymensingh</option>
                    </select>
                  </div>

                  {/* Town / City */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor mb-1'>
                      Town / City <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue='asdfsd'
                      className='w-full px-4 py-2 rounded-full border border-gray-300 outline-none text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    />
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor mb-1'>
                      ZIP Code <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue='94102'
                      className='w-full px-4 py-2 rounded-full border border-gray-300 outline-none text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    />
                  </div>

                  {/* Update button */}
                  <button onClick={handleAdrsUpdate} className='bg-gray-200 text-gray-500 font-semibold py-3 px-8 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors duration-200'>
                    Update
                  </button>
                </div>
              </Dropdown>
               </div>
               <div className='flex justify-between pt-2 pb-2'>
               <span className='font-bold text-[15px] '>Total</span>
               <span className='font-bold text-tcolor text-[17px]'>${(discountedSubTotal + flatCharge + tax).toFixed(2)}</span>
             </div>
            </div>
           </section>
           </>
        : <h1>cart is empty</h1>
        }
      </Container>
    </section>
    )}
    </>
  )
}

export default Cart