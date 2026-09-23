// Renamed from SignleOrderDetails.jsx (typo fix).
import { useLocation, useParams } from 'react-router';
import { useOrders } from '@/features/user/hooks/useOrders';
import Container from '@/components/layout/Container';

const Highlight = ({ children }) => (
  <mark className="rounded bg-yellow-100 px-1 font-semibold text-tcolor dark:text-gray-100">{children}</mark>
);

const SummaryRow = ({ label, value, valueNote, color = 'text-tcolor dark:text-gray-100' }) => (
  <div className="flex justify-between border-b border-b-gray-200 dark:border-b-[#333333] py-4">
    <span className={`text-[15px] font-bold ${color}`}>{label}</span>
    <span className={`text-[15px] font-semibold ${color}`}>
      {value} {valueNote && <span className="text-gray-500 dark:text-gray-400 font-normal">{valueNote}</span>}
    </span>
  </div>
);

const AddressBlock = ({ title, address, showEmail }) => {
  if (!address) return null;

  return (
    <div>
      <h3 className="border-b border-gray-200 dark:border-[#333333] pb-3 text-xl font-bold text-tcolor dark:text-gray-100">{title}</h3>
      <div className="mt-4 space-y-1 text-[15px] text-gray-600 dark:text-gray-300">
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.country}</p>
        <p>{address.state}</p>
        <p>{address.townCity}</p>
        <p>{address.streetAddress}</p>
        {address.apartment && <p>{address.apartment}</p>}
        <p>{address.zipCode}</p>
        <p>{address.phone}</p>
        {showEmail && address.email && <p className="pt-3">{address.email}</p>}
      </div>
    </div>
  );
};

const SingleOrderDetails = () => {
  const location = useLocation()
  const order = location?.state?.order[0]

  if (!order) {
    return (
      <section className="font-pop">
        <Container>
          <p className="py-20 text-center text-[15px] text-gray-500 dark:text-gray-400">
            We couldn't find that order.
          </p>
        </Container>
      </section>
    );
  }

  const orderNumber = order.orderNumber?.replace('#', '');
  const placedOn = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  const paymentMethod = order.paymentMethod?.replaceAll('_', ' ');
  const status = order.status;

  const subtotal = order.items?.reduce((sum, item) => sum + item.totalPrice, 0) ?? 0;
  const tax = order.tax ?? 0;
  const shippingCost = order.shippingCost ?? 0;
  const discount = order.discount ?? 0;
  const total = subtotal + shippingCost + tax - discount;

  return (
    <section className="font-pop">
      <Container>
        <h1 className="pb-6 text-center text-[40px] text-tcolor dark:text-gray-100">Order #{orderNumber}</h1>

        <p className="pb-6 text-[15px] text-gray-600 dark:text-gray-300">
          Order # <Highlight>{orderNumber}</Highlight> was placed on{' '}
          <Highlight>{placedOn}</Highlight> and is currently <Highlight>{status}</Highlight>.
        </p>

        <h2 className="border-b border-gray-300 dark:border-[#333333] pb-3 text-[30px] font-semibold text-tcolor dark:text-gray-100">
          Order details
        </h2>

        {/* items table */}
        <div className="mt-6 flex justify-between border-b border-gray-300 dark:border-[#333333] pb-3 text-[15px] font-semibold text-[#747474] dark:text-gray-400">
          <span>Product</span>
          <span>Total</span>
        </div>

        {order.items?.map((item) => (
          <div key={item._id ?? item.productName} className="flex justify-between border-b border-b-gray-200 dark:border-b-[#333333] py-4">
            <p className="text-[15px] text-tcolor dark:text-gray-100">
              {item.productName} <span className="font-bold">&times; {item.quantity}</span>
            </p>
            <span className="text-[15px] text-tcolor dark:text-gray-100">${item.totalPrice.toFixed(2)}</span>
          </div>
        ))}

        <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        {tax > 0 && <SummaryRow label="Tax - 15%" value={`$${tax.toFixed(2)}`} />}
        <SummaryRow
          label="Shipping"
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
        <div className="mt-14 grid grid-cols-1 gap-10 pb-16 md:grid-cols-2">
          <AddressBlock title="Billing address" address={order.billingAddress} showEmail />
          <AddressBlock title="Shipping address" address={order.shippingAddress} />
        </div>
      </Container>
    </section>
  );
};

export default SingleOrderDetails;