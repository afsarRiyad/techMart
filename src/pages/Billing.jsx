import { useEffect, useState } from 'react';
import FormInput from './../features/user/components/FormInput';
import Container from '../components/layouts/Container';
import { Undo2 } from 'lucide-react';
import { useBillingAddress } from '../features/user/hooks/useBillingAddress';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useAddresses } from '../features/user/hooks/useGetAddresses';



const FormSelect = ({ label, required, hint, value, onChange, options = [] }) => (

  <div className="mb-6">

    <label className="mb-2 block font-inter text-sm font-semibold text-tcolor darkH">

      {label} {required && <span className="text-tcolor darkH">*</span>}

    </label>

    <select

      value={value}

      onChange={onChange}

      className="inputRing w-full appearance-none rounded-full border border-gray-300 bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:16px] bg-[right_1.25rem_center] bg-no-repeat px-5 py-3 font-inter text-[15px] text-tcolor outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222] darkH"

    >

      {options.map((opt) => (

        <option key={opt} value={opt}>

          {opt}

        </option>

      ))}

    </select>

    {hint && <p className="mt-2 font-inter text-[13px] italic text-gray-500 darktxt">{hint}</p>}

  </div>

);



const COUNTRIES = ['Bangladesh', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France'];

const COUNTIES = ['Bangladesh', 'Tirana', 'Durrës', 'Vlorë', 'Berat', 'Korçë'];



const Billing = ({ setShow, className,title}) => {
  const { data: userData } = useAuth()
  const updateAddress = useBillingAddress()
  const { data: addressData, isLoading } = useAddresses()
  const userAddress = addressData?.data?.billingAddress

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: COUNTRIES[0],
    streetAddress: '',
    apartment: '',
    townCity: '',
    state: COUNTIES[0],
    zipCode: '',
    phone: '',
  });

  const phoneRegex = /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8})$/;
  const zipRegex = /^\d{4}$/;

  useEffect(() => {
    if (!userAddress) return;

    setForm({
      firstName: userAddress?.firstName || '',
      lastName: userAddress?.lastName || '',
      company: userAddress?.companyName || '',
      country: userAddress?.country || COUNTRIES[0],
      streetAddress: userAddress?.streetAddress || '',
      apartment: userAddress?.apartment || '',
      townCity: userAddress?.townCity || '',
      state: userAddress?.state || COUNTIES[0],
      zipCode: userAddress?.zipCode || '',
      phone: userAddress?.phone || '',
    });
  }, [userAddress]);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const notChanged =
    form.firstName === (userAddress?.firstName || '') &&
    form.lastName === (userAddress?.lastName || '') &&
    form.company === (userAddress?.companyName || '') &&
    form.country === (userAddress?.country || COUNTRIES[0]) &&
    form.streetAddress === (userAddress?.streetAddress || '') &&
    form.apartment === (userAddress?.apartment || '') &&
    form.townCity === (userAddress?.townCity || '') &&
    form.state === (userAddress?.state || COUNTIES[0]) &&
    form.zipCode === (userAddress?.zipCode || '') &&
    form.phone === (userAddress?.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (notChanged) {
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      toast.error('please enter a valid phone number!')
      return
    } else if (!zipRegex.test(form.zipCode)) {
      toast.error('zipcode is not valid!')
      return
    } else if (!form.state || !form.townCity || !form.streetAddress) {
      toast.error('state / town or street address is required!')
      return
    }

    const billingAddress = {
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.company,
      country: form.country,
      streetAddress: form.streetAddress,
      apartment: form.apartment,
      townCity: form.townCity,
      state: form.state,
      zipCode: form.zipCode,
      phone: form.phone,
    };
    updateAddress.mutate({ billingAddress });
  };

  if (isLoading) {
    return <p>Loading billing address...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className=" font-inter">

      {!title && 
      <button
       onClick={() => setShow('list')}
        className="flex items-center gap-2 text-gray-700 hover:text-black pb-5" >
        <Undo2 size={20} />
        Back
      </button>
      }
      <div>
      {!title &&
       <h2 className={`mb-4 font-inter text-2xl font-bold text-tcolor darkH sm:mb-6 sm:text-[28px] `}>
        Billing address
      </h2>
      }
      <span className={`${className}`}>{title}</span>
      <hr className="mb-6 mt-3 border-gray-200 dark:border-gray-700" />
      </div>

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

      <FormInput
        label="Street address"
        required
        value={form.streetAddress}
        onChange={set('streetAddress')}
        placeholder="House number and street name"

      />

      <FormInput
        value={form.apartment}
        onChange={set('apartment')}
        placeholder="Apartment, suite, unit, etc. (optional)"

      />

      <FormInput
        label="Town / City"
        required
        value={form.townCity}
        onChange={set('townCity')}

      />

      <FormSelect

        label="County"
        required
        value={form.state}
        onChange={set('state')}
        options={COUNTIES}

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
          placeholder="(+880) 1839758594"

        />

      </div>



      <button
        type="submit"
        disabled={notChanged || updateAddress.isPending}
        className={`rounded-full px-6 py-3 font-inter text-[15px] font-semibold transition-colors duration-200 ${notChanged || updateAddress.isPending
            ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-[#333]'
            : 'cursor-pointer bg-gray-200 text-tcolor hover:bg-black hover:text-white dark:bg-[#333] dark:text-white'
          }`}
      >
        {updateAddress.isPending ? 'Saving...' : 'Save address'}
      </button>

    </form>

  );

};



export default Billing;