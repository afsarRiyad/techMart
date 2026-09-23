import { ChevronDown, LockKeyhole, X } from 'lucide-react';
import Container from '@/components/layout/Container';
import Dropdown from '@/components/ui/Dropdown';
import { useCart } from '@/features/cart/hooks/useCart';
import { useRemoveFromCart } from "@/features/cart/hooks/useRemoveCart";
import { useState } from "react";
import { useUpdateCart } from "@/features/cart/hooks/useUpdateCart";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import CouponInput from '@/components/ui/CouponInput';
import { useApplyCoupon } from '@/features/cart/hooks/useApplyCoupon';
import { useShippingAddress } from '@/features/user/hooks/useShippingAddress';
import { useAuth } from '@/hooks/useAuth';

const Cart = () => {
  // 'guest' | 'unverified' | null - which checkout gate to explain to the shopper
  const [checkoutGate, setCheckoutGate] = useState(null);
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
  // nothing is decided here, we only ask which of the two doors to open
  if (!userData?.data) return setCheckoutGate('guest')
  if (!userData.data.isVerified) return setCheckoutGate('unverified')
  navigate('/checkout')
};

// the button inside the modal, it does the actual move
const gateAction = () => {
  if (checkoutGate === 'guest') {
    navigate('/account/login', { state: { from: '/checkout' } })
    return
  }
  navigate('/account/otp-verification', { state: { email: userData?.data?.email } })
};

return(
  <>
    {checkoutGate && (
      <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4'>
        <div className='cardSurface relative w-full max-w-sm rounded-2xl p-8 text-center'>
          <X
            className='absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-black dark:hover:text-gray-100'
            onClick={() => setCheckoutGate(null)}
          />

          <h2 className='mb-2 text-[20px] font-semibold text-tcolor dark:text-gray-100'>
            {checkoutGate === 'guest' ? 'Please log in to order' : 'Verify your account to order'}
          </h2>

          <p className='mb-6 font-inter text-gray-500 dark:text-gray-400'>
            {checkoutGate === 'guest'
              ? "We don't take orders from guests. Log in and we will bring you straight back to checkout."
              : "Your email is not verified yet, so we can't accept this order. Enter the code we sent you and checkout opens up."}
          </p>

          <div className='flex flex-col gap-3'>
            <button
              type='button'
              onClick={gateAction}
              className='cursor-pointer rounded-full bg-primary py-3 font-semibold text-tcolor transition-colors hover:bg-black hover:text-white'
            >
              {checkoutGate === 'guest' ? 'Log in' : 'Verify now'}
            </button>

            <button
              type='button'
              onClick={() => setCheckoutGate(null)}
              className='min-h-11 cursor-pointer rounded-full border border-gray-300 py-3 font-semibold text-tcolor transition-colors hover:bg-gray-100 dark:border-[#333333] dark:text-gray-100 dark:hover:bg-[#2a2a2a]'
            >
              Keep shopping
            </button>
          </div>
        </div>
      </div>
    )}
    {!cartItems || cartItems.length === 0 ? (
      <div className="py-10">
        <div className="relative overflow-hidden rounded bg-primary px-8 py-6 md:px-10">
          <span className="absolute left-0 top-0 h-full w-1.5 bg-yellow-600" />
          <p className="text-center text-[22px] text-tcolor dark:text-gray-100 md:text-[26px]">
            Your cart is currently empty.
          </p>
        </div>
    
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#212121] px-8 py-3 text-[15px] font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Return to shop
          </Link>
        </div>
      </div>
    ) : (
    <section className="font-pop">
      <Container>
        <h1 className="text-[28px] sm:text-[40px] text-tcolor dark:text-gray-100 w-full text-center pt-6 pb-10">Shopping Cart</h1>
        {cartItems?.length > 0 ?
        <>
        {/* phones and tablets get stacked cards, the fixed table needs room */}
        <div className="flex flex-col gap-4 lg:hidden">
          {cartItems?.map((item) => (
            <div key={item._id} className="cardSurface relative flex gap-3 rounded-xl border border-gray-200 p-3 dark:border-[#333333]">
              <Link to={`/products/${item.product.slug || item.product._id}`} className="imageTile shrink-0">
                <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded object-contain mix-blend-multiply dark:mix-blend-normal" />
              </Link>
              <div className="min-w-0 flex-1 pr-7">
                <Link to={`/products/${item.product.slug || item.product._id}`} className="line-clamp-2 text-[15px] font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-300">
                  {item.product.name}
                </Link>
                <p className="pt-1 text-[16px] font-semibold text-tcolor dark:text-gray-100">
                  ${(item.product.price).toFixed(2)}
                </p>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <input
                    onChange={(e) => handleChange(item._id, parseInt(e.target.value))}
                    disabled={updateMutation.isPending}
                    type="number"
                    min="1"
                    max={item.product.stock}
                    defaultValue={item.quantity}
                    aria-label={`Quantity for ${item.product.name}`}
                    className="h-11 w-20 rounded-xl border border-gray-400 dark:border-[#444444] dark:bg-[#242424] px-3 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:text-gray-100"
                  />
                  <span className="text-[16px] font-semibold text-tcolor dark:text-gray-100">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${item.product.name}`}
                onClick={() => handleRemove(item?.product?._id)}
                className="tapTarget absolute right-1 top-1 text-gray-400 hover:text-black dark:hover:text-gray-100"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

         <table className="hidden w-full table-fixed lg:table">
            <thead>
              <tr className="border-b border-gray-300 dark:border-[#333333] text-[#747474] dark:text-gray-400 font-semibold">
                <th className="w-[55%] py-4 text-start pl-4">Product</th>
                <th className="w-[15%] py-4 text-left">Price</th>
                <th className="w-[15%] py-4 text-left">Quantity</th>
                <th className="w-[15%] py-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item)=>(
                <tr key={item._id} className='border-b border-b-gray-200 dark:border-b-[#333333]'>
                  <td className="py-4 flex items-center gap-4">
                 <div className='flex items-center gap-4'>
                   <button type='button' aria-label={`Remove ${item.product.name}`} className='tapTarget text-gray-400 hover:text-black dark:hover:text-gray-100' onClick={ ()=>handleRemove(item?.product?._id) }><X size={18} /></button>
                    <Link to={`/products/${item.product.slug || item.product._id}`} className='imageTile shrink-0'>
                      <img src={item.product.image} alt={item.product.name} className="w-[80px] h-[80px] object-contain rounded cursor-pointer mix-blend-multiply dark:mix-blend-normal" />
                    </Link>
                    <Link to={`/products/${item.product.slug || item.product._id}`} className='text-[18px] cursor-pointer hover:text-black dark:hover:text-gray-100 font-pop text-gray-500 dark:text-gray-400 dark:text-gray-300 font-semibold'>{item.product.name}</Link>
                 </div>
                   </td>
                   <td className="py-4 text-left text-tcolor dark:text-gray-100 text-[17px] font-semibold">${(item.product.price).toFixed(2)}</td>
                   <td>
                    <input
                     onChange={(e)=>handleChange(item._id, parseInt(e.target.value))}
                     disabled={updateMutation.isPending}
                      type="number"
                      min="1"
                      max={item.product.stock}
                      defaultValue={item.quantity}
                      aria-label={`Quantity for ${item.product.name}`}
                      className='w-20 px-4 py-2 rounded-[12px] outline-none border border-gray-400 dark:border-[#444444] dark:bg-[#242424] dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    />
                   </td>
                     <td className="py-4 text-left text-tcolor dark:text-gray-100 text-[17px] font-semibold">
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
           <div className='pb-10 pt-10 sm:pt-20 flex flex-col sm:flex-row sm:justify-between gap-6'>
              <CouponInput setDiscount={setDiscount} subTotal={subTotal}/>
              <div className='flex flex-col gap-3 sm:gap-0 sm:ml-5'>
                <button onClick={handleUpdate} className='min-h-11 bg-gray-200 dark:bg-[#333333] dark:bg-[#212121] text-gray-500 dark:text-gray-300 font-semibold py-3 sm:w-34 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors duration-200'>Update Cart</button>
                <button
                  onClick={handleCheckoutClick}
                  className='bg-primary hover:text-white  text-tcolor font-semibold py-3 px-6 rounded-full cursor-pointer hover:bg-black transition-colors duration-200'
                >
                  Procesed to checkout
                </button>
              </div>
           </div>
           {/* cart totals  */}
           <section className='w-full flex justify-end pt-8'>
            <div className='max-w-[400px] w-full'>
             <div className='border-b border-b-gray-300 dark:border-b-[#333333]'>
               <h4 className='text-[25px] text-tcolor dark:text-gray-100 border-b-[2px] border-b-primary w-40 pb-3'>
                  Cart totals
                </h4>
             </div>
             <div className='flex justify-between border-b border-b-gray-300 dark:border-b-[#333333] pt-4 pb-2'>
               <span className='font-bold text-[15px] dark:text-gray-200'>Subtotal</span>
               <span className='text-gray-900 dark:text-gray-100 dark:text-gray-200'>${subTotal?.toFixed(2)}</span>
             </div>
             {dis > 0 && (
               <div className='flex justify-between border-b border-b-gray-300 dark:border-b-[#333333] pt-3 pb-2'>
                 <span className='font-bold text-[15px] text-green-600'>Coupon Discount</span>
                 <span className='font-semibold text-green-600'>- ${dis.toFixed(2)}</span>
               </div>
             )}
             <div className='font-bold pt-3 pb-4 text-[15px] text-tcolor dark:text-gray-100 dark:text-gray-200'>Shipping: {`sara palson`}</div>

               <div className='py-2 flex justify-between border-y border-y-gray-200 dark:border-y-[#333333]'>
                <span className='font-semibold dark:text-gray-200'>Tax - 15%</span>
                <span className='font-semibold text-red-800/70'>${tax.toFixed(2)}</span>
               </div>
               <div className='flex justify-between py-2'>
                <div className='flex gap-3'>
                  <span className='text-[15px] dark:text-gray-200'>Flat rate:</span>
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
               <span className='text-gray-900 dark:text-gray-100 dark:text-gray-200'>${flatCharge.toFixed(2)}</span>

             </div>
             <div className='pt-1 pb-4 text-[15px] text-tcolor dark:text-gray-100 dark:text-gray-200'>
              Shipping to <span className='font-bold'> {`sdfsad, asdfsd, CA 94102.`}</span> 
              </div>
               <div className='border-b border-b-gray-300 dark:border-b-[#333333] pb-4'>
                 <Dropdown 
                title={'Change addresses'} 
                titleCls={'text-[15px] text-tcolor dark:text-gray-200 font-bold cursor-pointer'} 
                icon={<ChevronDown size={20} className='ml-2' />}
                duration={'duration-1200'}
              >
                <div className='pt-6 space-y-5 max-w-[400px]'>
                  {/* Country / Region */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor dark:text-gray-100 mb-1'>
                      Country / Region <span className='text-red-500'>*</span>
                    </label>
                    <select
                      className='w-full px-4 py-2 rounded-full border border-gray-300 dark:border-[#333333] outline-none text-gray-600 dark:text-gray-300 appearance-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666%27 stroke-width=%272%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e")] bg-no-repeat bg-[right_1rem_center]'
                    >
                      <option>Bangladesh (BD)</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor dark:text-gray-100 mb-1'>
                      State <span className='text-red-500'>*</span>
                    </label>
                    <select
                      className='w-full px-4 py-2 rounded-full border border-gray-300 dark:border-[#333333] outline-none text-gray-600 dark:text-gray-300 appearance-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666%27 stroke-width=%272%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e")] bg-no-repeat bg-[right_1rem_center]'
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
                    <label className='block text-[14px] font-bold text-tcolor dark:text-gray-100 mb-1'>
                      Town / City <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue='asdfsd'
                      className='w-full px-4 py-2 rounded-full border border-gray-300 dark:border-[#333333] outline-none text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    />
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label className='block text-[14px] font-bold text-tcolor dark:text-gray-100 mb-1'>
                      ZIP Code <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue='94102'
                      className='w-full px-4 py-2 rounded-full border border-gray-300 dark:border-[#333333] outline-none text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    />
                  </div>

                  {/* Update button */}
                  <button onClick={handleAdrsUpdate} className='bg-gray-200 dark:bg-[#333333] text-gray-500 font-semibold py-3 px-8 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors duration-200'>
                    Update
                  </button>
                </div>
              </Dropdown>
               </div>
               <div className='flex justify-between pt-2 pb-2'>
               <span className='font-bold text-[15px] dark:text-gray-200'>Total</span>
               <span className='font-bold text-tcolor dark:text-gray-100 text-[17px]'>${(discountedSubTotal + flatCharge + tax).toFixed(2)}</span>
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