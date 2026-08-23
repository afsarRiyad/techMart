// Renamed from ToggleSwitcth.jsx (typo fix).
 const ToggleSwitch = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex outilne-none hover:bg-black h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300  cursor-pointer bg-gray-200 dark:bg-gray-600 `}
  >
   
  </button>
)

export default ToggleSwitch