import React, { useEffect } from 'react'
import Billing from '@/pages/Billing';
import Shipping from '@/pages/Shipping';
import { useNavigate, useLocation, useSearchParams } from 'react-router';
import { useAddresses } from '@/features/user/hooks/useGetAddresses';
import toast from 'react-hot-toast';

const AddressCard = ({ title, address, onEdit, onAdd }) => {
  if (!address) {
    return (
      <div className='max-w-[50%] w-full'>
        <h2 className='pb-2 pt-5 border-b border-b-gray-300 dark:border-b-[#333333] text-[28px] font-semibold text-tcolor dark:text-gray-100'>
          {title}
        </h2>
        <button onClick={onAdd} className='w-full text-end text-gray-700 dark:text-gray-200 dark:text-gray-300 pt-10 pb-3 border-b border-b-gray-300 dark:border-b-[#333333]'>
          Add {title}
        </button>
        <p className='pt-4 text-gray-500 dark:text-gray-400 text-[14px]'>You have not set up this type of address yet.</p>
      </div>
    )
  }

  return (
    <div className='max-w-[50%] w-full'>
      <h2 className='pb-2 pt-5 border-b border-b-gray-300 dark:border-b-[#333333] text-[28px] font-semibold text-tcolor dark:text-gray-100'>
        {title}
      </h2>
      <button onClick={onEdit} className='w-full text-end text-gray-700 dark:text-gray-200 dark:text-gray-300 pt-10 pb-3 border-b border-b-gray-300 dark:border-b-[#333333]'>
        Edit {title}
      </button>
      <div className='pt-4 text-tcolor dark:text-gray-100 text-[15px] leading-relaxed'>
        <p>{address.firstName} {address.lastName}</p>
        {address.companyName && <p>{address.companyName}</p>}
        {address.streetAddress && <p>{address.streetAddress}</p>}
        {address.apartment && <p>{address.apartment}</p>}
        {address.townCity && <p>{address.townCity}</p>}
        {address.state && <p>{address.state}</p>}
        {address.zipCode && <p>{address.zipCode}</p>}
        {address.country && <p>{address.country}</p>}
      </div>
    </div>
  )
}

const Addresses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const edit = searchParams.get('edit');
  const { data: addressData } = useAddresses();
  const billingAddress = addressData?.data?.billingAddress;
  const shippingAddress = addressData?.data?.shippingAddress;

  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state.success);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const goToList = () => navigate('/account/addresses');
  const goToBilling = () => navigate('/account/addresses?edit=billing');
  const goToShipping = () => navigate('/account/addresses?edit=shipping');

  return (
    <>
      {edit === 'billing' && (
        <Billing setShow={goToList} />
      )}
      {!edit && (
        <>
          <p className='font-pop text-[14px] font-semibold text-gray-500 dark:text-gray-400'>The following addresses will be used on the checkout page by default.</p>
          <div className='flex gap-10 font-pop'>
            <AddressCard
              title='Billing address'
              address={billingAddress}
              onEdit={goToBilling}
              onAdd={goToBilling}
            />
            <AddressCard
              title='Shipping address'
              address={shippingAddress}
              onEdit={goToShipping}
              onAdd={goToShipping}
            />
          </div>
        </>
      )}
      {edit === 'shipping' && (
        <Shipping setShow={goToList} />
      )}
    </>
  )
}

export default Addresses
