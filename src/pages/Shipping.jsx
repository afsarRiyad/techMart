import { useEffect, useState } from 'react';
import FormInput from '@/features/user/components/FormInput';
import { Undo2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useAddresses } from '@/features/user/hooks/useGetAddresses';
import { useShippingAddress } from '@/features/user/hooks/useShippingAddress';
import { useNavigate } from 'react-router';

const COUNTRIES = ['Bangladesh'];

const DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

const FormSelect = ({
  label,
  required,
  hint,
  value,
  onChange,
  options = [],
}) => (
  <div className="mb-6">
    <label className="mb-2 block font-inter text-sm font-semibold text-tcolor darkH">
      {label} {required && <span className="text-tcolor darkH">*</span>}
    </label>

    <select
      value={value}
      onChange={onChange}
      required={required}
      className="inputRing w-full appearance-none rounded-full border border-gray-300 bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:16px] bg-[right_1.25rem_center] bg-no-repeat px-5 py-3 font-inter text-[15px] text-tcolor outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222] darkH"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>

    {hint && (
      <p className="mt-2 font-inter text-[13px] italic text-gray-500 darktxt">
        {hint}
      </p>
    )}
  </div>
);

const Shipping = ({ setShow , className = '' }) => {
  const navigate = useNavigate();
  const { data: userData } = useAuth();

  const updateAddress = useShippingAddress();
  const { data: addressData, isLoading } = useAddresses();

  const userAddress = addressData?.data?.shippingAddress;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: COUNTRIES[0],
    state: DIVISIONS[0],
    townCity: '',
    streetAddress: '',
    apartment: '',
    zipCode: '',
    phone: '',
  });

  const phoneRegex =  /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8})$/;
  const zipRegex = /^\d{4}$/;

  useEffect(() => {
    if (!userAddress) return;

    setForm({
      firstName: userAddress?.firstName || '',
      lastName: userAddress?.lastName || '',
      company: userAddress?.companyName || '',
      country: userAddress?.country || COUNTRIES[0],
      state: userAddress?.state || DIVISIONS[0],
      townCity: userAddress?.townCity || '',
      streetAddress: userAddress?.streetAddress || '',
      apartment: userAddress?.apartment || '',
      zipCode: userAddress?.zipCode || '',
      phone: userAddress?.phone || '',
    });
  }, [userAddress]);

  const set = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Check whether anything changed
  const notChanged =
    form.firstName === (userAddress?.firstName || '') &&
    form.lastName === (userAddress?.lastName || '') &&
    form.company === (userAddress?.companyName || '') &&
    form.country === (userAddress?.country || COUNTRIES[0]) &&
    form.state === (userAddress?.state || DIVISIONS[0]) &&
    form.townCity === (userAddress?.townCity || '') &&
    form.streetAddress === (userAddress?.streetAddress || '') &&
    form.apartment === (userAddress?.apartment || '') &&
    form.zipCode === (userAddress?.zipCode || '') &&
    form.phone === (userAddress?.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (notChanged) {
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      toast.error('Please enter a valid phone number!');
      return;
    }

    if (!zipRegex.test(form.zipCode)) {
      toast.error('ZIP code is not valid!');
      return;
    }

    if (
      !form.firstName ||
      !form.lastName ||
      !form.state ||
      !form.townCity ||
      !form.streetAddress
    ) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const shippingAddress = {
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.company,
      country: form.country,
      state: form.state,
      townCity: form.townCity,
      streetAddress: form.streetAddress,
      apartment: form.apartment,
      zipCode: form.zipCode,
      phone: form.phone,
    };

    updateAddress.mutate(
      { shippingAddress },
      {
        onSuccess: () => {
          navigate('/account/addresses', { state: { success: 'Shipping address updated successfully!' } })
        }
      }
    );
  };

  if (isLoading) {
    return <p>Loading shipping address...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={`font-inter ${className}`}>
     {!className &&
      <>
           <button
              onClick={()=>setShow()}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-black pb-5"
            >
              <Undo2 size={20} />
              Back
            </button>
      <h2 className="mb-4 font-inter text-2xl font-bold text-tcolor darkH sm:mb-6 sm:text-[28px]">
        Billing Address
      </h2>
      <hr className="mb-6 border-gray-200 dark:border-[#333333] dark:border-gray-700" />
      </>
    }


      <FormInput
        label="Email"
        readOnly
        value={userData?.data?.email || ''}
      />

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <FormInput
          label="First name"
          required
          value={form.firstName}
          onChange={set('firstName')}
        />

        <FormInput
          label="Last name"
          required
          value={form.lastName}
          onChange={set('lastName')}
        />
      </div>

      <FormInput
        label="Company name (optional)"
        value={form.company}
        onChange={set('company')}
      />

      <FormSelect
        label="Country / Region"
        required
        value={form.country}
        onChange={set('country')}
        options={COUNTRIES}
      />

      <FormSelect
        label="State / Division"
        required
        value={form.state}
        onChange={set('state')}
        options={DIVISIONS}
      />

      <FormInput
        label="Town / City"
        required
        value={form.townCity}
        onChange={set('townCity')}
      />

      <FormInput
        label="Street address"
        required
        value={form.streetAddress}
        onChange={set('streetAddress')}
        placeholder="House number and street name"
      />

      <FormInput
        label="Apartment, suite, unit (optional)"
        value={form.apartment}
        onChange={set('apartment')}
        placeholder="Apartment, suite, unit, etc."
      />

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <FormInput
          label="Postcode / ZIP"
          required
          value={form.zipCode}
          onChange={set('zipCode')}
        />

        <FormInput
          label="Phone"
          required
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          placeholder="01712345678"
        />
      </div>

      <button
        type="submit"
        disabled={notChanged || updateAddress.isPending}
        className={`rounded-full px-6 py-3 font-inter text-[15px] font-semibold transition-colors duration-200 ${
          notChanged || updateAddress.isPending
            ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-[#333]'
            : 'cursor-pointer bg-gray-200 text-tcolor hover:bg-black hover:text-white dark:bg-[#333] dark:text-gray-100'
        }`}
      >
        {updateAddress.isPending ? 'Saving...' : 'Save address'}
      </button>
    </form>
  );
};

export default Shipping;