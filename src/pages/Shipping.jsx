import { useState } from 'react';import FormInput from '../features/user/components/FormInput';
import Container from '../components/layouts/Container';

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

const COUNTRIES = ['Albania', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France'];
const COUNTIES = ['Gjirokastër', 'Tirana', 'Durrës', 'Vlorë', 'Berat', 'Korçë'];

const Shipping = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: COUNTRIES[0],
    address1: '',
    address2: '',
    city: '',
    county: COUNTIES[0],
    postcode: '',
    phone: '',
  });

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <Container>
        <form onSubmit={handleSubmit} className=" font-inter">
      <h2 className="mb-4 font-inter text-2xl font-bold text-tcolor darkH sm:mb-6 sm:text-[28px]">
        Shipping address
      </h2>
      <hr className="mb-6 border-gray-200 dark:border-gray-700" />

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
        value={form.address1}
        onChange={set('address1')}
        placeholder="House number and street name"
      />
      <FormInput
        value={form.address2}
        onChange={set('address2')}
        placeholder="Apartment, suite, unit, etc. (optional)"
      />

      <FormInput
        label="Town / City"
        required
        value={form.city}
        onChange={set('city')}
      />

      <FormSelect
        label="County"
        required
        value={form.county}
        onChange={set('county')}
        options={COUNTIES}
      />

      <FormInput
        label="Postcode / ZIP"
        required
        value={form.postcode}
        onChange={set('postcode')}
      />

      <FormInput
        label="Phone"
        required
        type="tel"
        value={form.phone}
        onChange={set('phone')}
        placeholder="(555) 555-0199"
      />

      <button
        type="submit"
        className="rounded-full bg-gray-200 px-6 py-3 font-inter text-[15px] font-semibold text-tcolor transition-colors duration-200 hover:bg-black hover:text-white cursor-pointer dark:bg-[#333] dark:text-white"
      >
        Save address
      </button>
    </form>
    </Container>
  );
};

export default Shipping;