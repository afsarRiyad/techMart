import { useState } from 'react';
import { Banknote, LocateFixed } from 'lucide-react';
import { useCart } from '@/features/cart/hooks/useCart';
import { Link } from 'react-router';
import { useCreateOrder } from '@/features/user/hooks/useCreateOrder';
import { useAddresses } from '@/features/user/hooks/useGetAddresses';

const paymentMethods = [
  {
    id: 'cash_on_delivery',
    label: 'Cash on Delivery',
    icon: Banknote,
    description: 'Pay with cash when your order arrives. Please have the exact amount ready for our delivery agent.',
    img:false
  },
  {
    id: 'bkash',
    label: 'bKash',
    icon: 'https://res.cloudinary.com/dj5ogudnj/image/upload/v1786212230/BKash-Icon2-Logo.wine_sznb3m.webp',
    description: 'You will be redirected to bKash to complete your payment after placing the order.',
    img:true
  },
  {
    id: 'nagad',
    label: 'Nagad',
    icon: 'https://res.cloudinary.com/dj5ogudnj/image/upload/v1786212221/Nagad-Logo.wine_ey0c6s.webp',
    description: 'You will be redirected to Nagad to complete your payment after placing the order.',
    img:true
  },
];

const OrderSummary = ({ onPlaceOrder = () => {}, discount = 0, shipToDifferent, notes}) => {
    const placeOrderMutation = useCreateOrder()
  const { data: cartData } = useCart();
  const {data: address} = useAddresses()
  const totalAmount = cartData?.data?.totalAmount || 0;
  const discountAmount = Number(discount?.discountAmount ?? 0);
  const couponCode = discount?.code ?? ''
  const products = cartData?.data?.items;
  const subtotal = Number(totalAmount ?? 0);
  const shippingFee = 50;
  const total = (subtotal + shippingFee) - discountAmount;
  const orderAddress = shipToDifferent ? address?.data?.shippingAddress : address?.data?.billingAddress
  
  const [selectedPayment, setSelectedPayment] = useState( "cash_on_delivery");
  const [agreed, setAgreed] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

  console.log(selectedPayment);
  const handlePlaceOrder = async () => {
    if (!agreed) return;
    const items = products.map((item)=> ({
          product: item?.product?._id,
          quantity: item.quantity
    })) 
    const payload = {
        items: items,
        shippingAddress: orderAddress,
        paymentMethod: selectedPayment,
        notes: notes || '',
        couponCode: couponCode || ''
    }
    
    await placeOrderMutation.mutateAsync(payload)
  };

  return (
    <div className="font-pop rounded-lg bg-gray-100 dark:bg-[#1f1f1f] p-8">
      <h2 className="text-[25px] text-tcolor border-b-[2px] border-b-primary w-40 pb-3">
        Your order
      </h2>

      {/* items table */}
      <div className="mt-6 border-b border-gray-300 pb-3 flex justify-between text-tcolor font-bold text-[15px]">
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      {products?.map((item) => (
        <div key={item?.product?._id} className="border-b border-gray-200 py-4">
          <div className="flex justify-between text-[15px] text-tcolor">
            <span>
              {item.product.name} <span className="font-bold">&times; {item.quantity}</span>
            </span>
            <span className="font-semibold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      ))}

      <div className="flex justify-between border-b border-gray-300 py-4">
        <span className="font-bold text-[15px] text-tcolor">Subtotal</span>
        <span className="text-tcolor">${(totalAmount ?? 0).toFixed(2)}</span>
      </div>

      {discountAmount > 0 && (
        <div className="flex justify-between border-b border-b-gray-300 pt-3 pb-2">
          <span className="font-bold text-[15px] text-green-600">Coupon Discount</span>
          <span className="font-semibold text-green-600">- ${discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="border-b border-gray-300 py-4">
        <div className="flex justify-between text-[15px]">
          <span className="text-gray-600 font-semibold">Flat rate:</span>
          <span className="text-tcolor">${shippingFee.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between border-b border-gray-300 py-4">
        <span className="font-bold text-[15px] text-tcolor">Total</span>
        <span className="font-bold text-tcolor">${(total).toFixed(2)}</span>
      </div>

      {/* payment methods */}
      <div className="pt-2">
        {paymentMethods.map(({ id, label, icon: Icon, description, img }) => {
          const isSelected = selectedPayment === id;
          return (
            <div key={id} className="border-b border-gray-200 last:border-b-0">
              <label className="flex items-center justify-between py-4 cursor-pointer select-none">
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                      isSelected ? 'border-blue-600' : 'border-gray-400'
                    }`}
                  >
                    {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={id}
                    checked={isSelected}
                    onChange={() => setSelectedPayment(id)}
                    className="sr-only"
                  />
                  <span className="font-bold text-[15px] text-tcolor">{label}</span>
                </span>

                {Icon && (
                  <span className="flex h-14 w-14 items-center justify-center">
                    {img ? <img src={Icon} className=''/> :
                       <Icon size={25}/>}
                  </span>
                )}
                
              </label>

              {isSelected && description && (
                <div className="mb-4 rounded-md bg-gray-200/70 dark:bg-[#2a2a2a] p-4 text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="pt-6 text-[14px] text-gray-600 leading-relaxed">
        Your personal data will be used to process your order, support your experience throughout
        this website, and for other purposes described in our privacy policy.
      </p>

      <label className="mt-4 flex items-start gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 accent-tcolor cursor-pointer"
        />
        <span className="text-[14px] text-tcolor">
          I have read and agree to the website{' '}
          <Link to="/terms-and-conditions" className="text-blue-600 hover:underline">
            terms and conditions
          </Link>{' '}
          <span className="text-red-500">*</span>
        </span>
      </label>

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={!agreed || isPlacing}
        className={`mt-6 w-full rounded-full py-4 font-bold transition-colors duration-200 ${
          agreed && !isPlacing
            ? 'bg-primary text-tcolor hover:bg-black hover:text-white cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isPlacing ? 'Placing order...' : 'Place order'}
      </button>
    </div>
  );
};

export default OrderSummary;