const FormInput = ({ label, required, hint, type = 'text', value, onChange, placeholder,  readOnly=false }) => (
  <div className="mb-6">
    <label className="mb-2 block font-inter text-sm font-semibold text-tcolor darkH">
      {label} {required && <span className="text-tcolor darkH">*</span>}
    </label>
    <input
      type={type}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="inputRing w-full rounded-full border border-gray-300 bg-white px-5 py-3 font-inter text-[15px] text-tcolor outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222] darkH placeholder:text-gray-400"
    />
    {hint && <p className="mt-2 font-inter text-[13px] italic text-gray-500 darktxt">{hint}</p>}
  </div>
)

export default FormInput