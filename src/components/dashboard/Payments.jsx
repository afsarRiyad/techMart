import React, { useState } from 'react'
import { CreditCard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate, useSearchParams } from 'react-router'
import toast from 'react-hot-toast'

const CardBrands = () => (
  <div className='flex items-center gap-1'>
    <div className='w-8 h-5 bg-blue-600 rounded text-[8px] text-white flex items-center justify-center font-bold'>VISA</div>
    <div className='w-8 h-5 bg-red-500 rounded text-[8px] text-white flex items-center justify-center font-bold'>MC</div>
    <div className='w-8 h-5 bg-blue-400 rounded text-[8px] text-white flex items-center justify-center font-bold'>AMEX</div>
  </div>
)

const PaymentMethods = () => {
  const { data: userData } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const showForm = searchParams.get('action') === 'add'
  const [saveInfo, setSaveInfo] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('card')

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    country: 'Bangladesh',
  })

  const [savedForm, setSavedForm] = useState({
    email: userData?.data?.email || '',
    phone: '',
    fullName: userData?.data?.firstName ? `${userData.data.firstName} ${userData.data.lastName}` : '',
  })

  const handleCardChange = (field) => (e) => {
    let value = e.target.value
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    }
    if (field === 'expiry') {
      value = value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.slice(0, 2) + ' / ' + value.slice(2, 4)
      }
    }
    if (field === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }
    setCardForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSavedChange = (field) => (e) => {
    setSavedForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Payment method added successfully!')
    navigate('/account/payments-methods')
    setCardForm({ cardNumber: '', expiry: '', cvc: '', country: 'Bangladesh' })
    setSaveInfo(false)
  }

  const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-inter text-[15px] text-tcolor outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222] dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary'

  return (
    <div className='font-inter'>
      {!showForm ? (
        <>
          <div className='bg-primary/90 border-l-4 border-yellow-500 px-4 py-3 mb-6'>
            <p className='text-[15px] text-tcolor'>No saved methods found.</p>
          </div>
          <button
            onClick={() => navigate('/account/payments-methods?action=add')}
            className='px-6 py-3 bg-gray-200 hover:bg-gray-300 text-tcolor font-semibold rounded-full transition-colors duration-200 cursor-pointer'
          >
            Add payment method
          </button>
        </>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='card'
                  checked={selectedMethod === 'card'}
                  onChange={() => setSelectedMethod('card')}
                  className='w-4 h-4 text-primary accent-primary'
                />
                <span className='font-semibold text-tcolor'>Credit / Debit Card</span>
                <CreditCard size={20} className='ml-auto text-gray-500' />
              </label>
            </div>

            {selectedMethod === 'card' && (
              <div className='bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 mb-6'>
                <p className='text-[13px] text-gray-600 dark:text-gray-400 mb-5'>
                  <strong>Test mode:</strong> use card 4242 4242 4242 4242 with any expiry and CVC. More test cards.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                  <div className='md:col-span-1'>
                    <label className='mb-2 block text-sm font-semibold text-tcolor'>Card number</label>
                    <div className='relative'>
                      <input
                        type='text'
                        value={cardForm.cardNumber}
                        onChange={handleCardChange('cardNumber')}
                        placeholder='1234 1234 1234 1234'
                        className={inputClass}
                        required
                      />
                      <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                        <CardBrands />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-tcolor'>Expiration date</label>
                    <input
                      type='text'
                      value={cardForm.expiry}
                      onChange={handleCardChange('expiry')}
                      placeholder='MM / YY'
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-semibold text-tcolor'>Security code</label>
                    <div className='relative'>
                      <input
                        type='text'
                        value={cardForm.cvc}
                        onChange={handleCardChange('cvc')}
                        placeholder='CVC'
                        className={inputClass}
                        required
                      />
                      <CreditCard size={16} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' />
                    </div>
                  </div>
                </div>

                <div className='mb-5'>
                  <label className='mb-2 block text-sm font-semibold text-tcolor'>Country</label>
                  <select
                    value={cardForm.country}
                    onChange={handleCardChange('country')}
                    className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  >
                    <option>Bangladesh</option>
                  </select>
                </div>

                <label className='flex items-center gap-3 cursor-pointer mb-4'>
                  <input
                    type='checkbox'
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className='w-5 h-5 rounded border-gray-300 accent-primary'
                  />
                  <span className='text-[15px] text-tcolor'>Save my information for faster checkout</span>
                </label>

                {saveInfo && (
                  <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
                    <div className='mb-4'>
                      <label className='mb-2 block text-sm font-semibold text-tcolor'>Email</label>
                      <input
                        type='email'
                        value={savedForm.email}
                        onChange={handleSavedChange('email')}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <label className='mb-2 block text-sm font-semibold text-tcolor'>Mobile number</label>
                      <div className='flex gap-2'>
                        <div className='w-24'>
                          <select className="w-full rounded-lg border border-gray-300 bg-white px-2 py-3 font-inter text-[14px] text-tcolor outline-none appearance-none">
                            <option>🇧🇩 +880</option>
                          </select>
                        </div>
                        <input
                          type='tel'
                          value={savedForm.phone}
                          onChange={handleSavedChange('phone')}
                          placeholder='+880 183423758534'
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>
                    <div className='mb-4'>
                      <label className='mb-2 block text-sm font-semibold text-tcolor'>Full name</label>
                      <input
                        type='text'
                        value={savedForm.fullName}
                        onChange={handleSavedChange('fullName')}
                        className={inputClass}
                        required
                      />
                    </div>
                    <p className='text-[12px] text-gray-500 mt-4'>
                      By selecting to save your info, you agree to create an account subject to Link's <a href='#' className='underline'>Terms</a> and <a href='#' className='underline'>Privacy Policy</a>.
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              type='submit'
              className='px-6 py-3 bg-gray-200 hover:bg-gray-300 text-tcolor font-semibold rounded-full transition-colors duration-200 cursor-pointer'
            >
              Add payment method
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PaymentMethods
