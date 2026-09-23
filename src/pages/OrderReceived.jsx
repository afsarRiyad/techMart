import { useLocation, useNavigate } from 'react-router';
import Container from '@/components/layout/Container';

const SectionHeading = ({ children }) => (
  <h2 className="inline-block border-b-2 border-b-primary pb-3 text-[30px] text-tcolor dark:text-gray-100">
    {children}
  </h2>
);

const SummaryRow = ({ label, value, valueNote, color = 'text-tcolor dark:text-gray-100' }) => (
  <div className="flex justify-between border-b border-b-gray-200 dark:border-b-[#333333] py-4">
    <span className={`text-[15px] font-bold ${color}`}>{label}</span>
    <span className={`text-[15px] font-semibold ${color}`}>
      {value} {valueNote && <span className="text-gray-500 dark:text-gray-400 font-normal">{valueNote}</span>}
    </span>
  </div>
);

const AddressBlock = ({ title, address, showEmail }) => (
  <div>
    <SectionHeading>{title}</SectionHeading>
    <div className="mt-6 space-y-1 text-[15px] text-gray-600 dark:text-gray-300">
      
      <p>{address.firstName}</p>
      <p>{address.lastName}</p>
      <p>{address.country}</p>
      <p>{address.state}</p>
      <p>{address.townCity}</p>
      <p>{address.streetAddress}</p>
      <p>{address.zipCode}</p>
      <p>{address.apartment}</p>
      <p>{address.phone}</p>
      {showEmail && address.email && <p className="pt-3">{address.email}</p>}
    </div>
  </div>
);

const OrderReceived = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const orderDetils = location.state?.order
    const shippingAddr = orderDetils?.data?.shippingAddress
    const tax = orderDetils?.data?.tax
    const shippingCost = orderDetils?.data?.shippingCost
    const discount = orderDetils?.data?.discount
    const orderId = orderDetils?.data?.orderNumber?.replace('#', "")
    const email = orderDetils?.data?.customerEmail
    const paymentStatus = orderDetils?.data?.paymentStatus
    const date = orderDetils?.data?.createdAt
    const paymentMethod = orderDetils?.data?.paymentMethod?.replaceAll('_', ' ')
  const subtotal = orderDetils.data?.items?.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = (subtotal + shippingCost + tax) - discount;
  return (
    <section className="font-pop">
      <Container>
        <h1 className="pt-10 pb-8 text-center text-[40px] text-tcolor dark:text-gray-100">Order received</h1>

        <p className="text-[15px] text-gray-700 dark:text-gray-200 dark:text-gray-300">Thank you. Your order has been received.</p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-gray-700 dark:text-gray-200 dark:text-gray-300">
          <li>
            Order number: <span className="font-bold text-tcolor dark:text-gray-100">{orderId}</span>
          </li>
          <li>
            Date: <span className="font-bold text-tcolor dark:text-gray-100">
                {new Date(date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
            </span>
          </li>
          <li>
            Email: <span className="font-bold text-tcolor dark:text-gray-100">{email}</span>
          </li>
          <li>
            Total: <span className="font-bold text-tcolor dark:text-gray-100">${total.toFixed(2)}</span>
          </li>
          <li>
            Payment method: <span className="font-bold text-tcolor dark:text-gray-100">{paymentMethod}</span>
          </li>
          <li>
            Payment Status: <span className="font-bold text-tcolor dark:text-gray-100">{paymentStatus}</span>
          </li>
        </ul>

        <div className="mt-14">
          <SectionHeading>Order details</SectionHeading>
        </div>
        <div className="mt-6 border-t border-gray-200 dark:border-[#333333]" />

        {/* items table */}
        <div className="flex justify-between border-b border-gray-300 dark:border-[#333333] py-4 text-[15px] font-semibold text-tcolor dark:text-gray-100">
          <span>Product</span>
          <span>Total</span>
        </div>

        {orderDetils?.data?.items?.map((item) => (
          <div key={item.id} className="flex justify-between border-b border-b-gray-200 dark:border-b-[#333333] py-4">
            <p className="text-[15px] text-tcolor dark:text-gray-100">
              {item.productName} <span className="font-bold">&times; {item.quantity}</span>
            </p>
            <span className="text-[15px] text-tcolor dark:text-gray-100">${item.totalPrice.toFixed(2)}</span>
          </div>
        ))}

        <SummaryRow label="Subtotal:" value={`$${subtotal.toFixed(2)}`} />
        <SummaryRow label="Tax - 15%" value={`$${tax.toFixed(2)}`} />
        <SummaryRow
          label="Shipping:"
          value={`$${shippingCost.toFixed(2)}`}
          valueNote="via Flat rate"
        />

        {discount > 0 && (
          <SummaryRow
            label="Coupon Discount:"
            value={`- $${discount.toFixed(2)}`}
            color="text-green-600"
          />
        )}

        <SummaryRow label="Payment method:" value={paymentMethod} />
        <SummaryRow label="Total:" value={`$${total.toFixed(2)}`} />

        {/* addresses */}
        <div className="mt-16 grid grid-cols-1 gap-10 pb-16 md:grid-cols-2">
          {/* <AddressBlock title="Billing address" address={order.billingAddress} showEmail /> */}
          <AddressBlock title="Shipping address" address={shippingAddr} showEmail/>
        </div>
      </Container>
    </section>
  );
};

export default OrderReceived;