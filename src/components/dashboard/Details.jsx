import React, { useState, useMemo, useEffect } from 'react'
import ToggleSwitch from '@/features/user/components/ToggleSwitch'
import getPasswordStrength from '@/features/user/components/GetPasswordStrength'
import FormInput from '@/features/user/components/FormInput'
import { useUpdateProfile } from '@/features/user/hooks/useUpdateProfile'
import { useAuth } from '@/hooks/useAuth'



const Details = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone:'',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile()
  const {data: user} = useAuth()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(()=>{
       if (user?.data) {
    setFormData({
      firstName: user.data.firstName || "",
      lastName: user.data.lastName || "",
      username: user.data.username || "",
      phone: user.data.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }
  },[user])
  const strength = useMemo(() => getPasswordStrength(formData.newPassword), [formData.newPassword])

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const passwordsMatch =
    !formData.newPassword || formData.newPassword === formData.confirmPassword
const wantsPasswordChange =
  formData.currentPassword ||
  formData.newPassword ||
  formData.confirmPassword
const hasProfileChanges =
  formData.firstName !== (user?.data?.firstName || "") ||
  formData.lastName !== (user?.data?.lastName || "") ||
  formData.phone !== (user?.data?.phone || "") ||
  formData.username !== (user?.data?.username || "");

const hasChanges = hasProfileChanges || Boolean(wantsPasswordChange);
const passwordFieldsComplete =
  !wantsPasswordChange ||
  (formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    passwordsMatch);
  const canSave =
     formData.firstName.trim() &&
  formData.lastName.trim() &&
  formData.username.trim() &&
  passwordFieldsComplete &&
  hasChanges &&
  !isSaving

  const handleSubmit =  (e) => {
    e.preventDefault()
     if (!canSave) return
    updateProfile(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl darkbg">
      <FormInput
        label="First name"
        required
        value={formData.firstName}
        onChange={handleChange('firstName')}
      />

      <FormInput
        label="Last name"
        required
        value={formData.lastName}
        onChange={handleChange('lastName')}
      />

      <FormInput
        label="Display name"
        required
        value={formData.username}
        onChange={handleChange('username')}
        hint="This will be how your name will be displayed in the account section and in reviews"
      />

      <FormInput
        label="Email address"
        required
        type="email"
        value={user?.data?.email}
        readOnly={true}
      />

      <FormInput
        label="Phone Number"
        required
        value={formData.phone}
        onChange={handleChange('phone')}
        type='number'
        placeholder={"+880 18*********"}
      />

      {/* Section divider */}
      <div className="mb-6 mt-10">
        <h2 className="font-inter text-2xl text-tcolor dark:text-gray-100 darkH">Password change</h2>
        <div className="mt-3 h-[3px] w-16 bg-primary" />
      </div>

      {/* Current password */}
      <div className="mb-6">
        <label className="mb-2 block font-inter text-sm font-semibold text-tcolor dark:text-gray-100 darkH">
          Current password (leave blank to leave unchanged)
        </label>
        <input
          type={showCurrent ? 'text' : 'password'}
          value={formData.currentPassword}
          onChange={handleChange('currentPassword')}
          className="inputRing w-full rounded-full border border-gray-300 bg-white px-5 py-3 font-inter text-[15px] text-tcolor dark:text-gray-100 outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222] darkH"
        />
        <div className="mt-3">
          <ToggleSwitch checked={showCurrent} onChange={setShowCurrent} label="Show current password" />
        </div>
      </div>

      {/* New password */}
      <div className="mb-6">
        <label className="mb-2 block font-inter text-sm font-semibold text-tcolor dark:text-gray-100 darkH">
          New password (leave blank to leave unchanged)
        </label>
        <input
          type={showNew ? 'text' : 'password'}
          value={formData.newPassword}
          onChange={handleChange('newPassword')}
          className="inputRing w-full rounded-full border border-gray-300 bg-white px-5 py-3 font-inter text-[15px] text-tcolor dark:text-gray-100 outline-none transition-all duration-200 dark:border-gray-700 dark:bg-[#222] darkH"
        />

        <div className="mt-3 flex items-center justify-between">
          <ToggleSwitch checked={showNew} onChange={setShowNew} label="Show new password" />

          {strength && (
            <p className={`font-inter text-sm font-medium ${strength.color}`}>
              {strength.message} <span>{strength.emoji}</span>
            </p>
          )}
        </div>

        <p className="mt-3 font-inter text-[13px] text-gray-500 dark:text-gray-400 darktxt">
          Hint: The password should be at least twelve characters long. To make it stronger, use
          upper and lower case letters, numbers, and symbols like ! " ? $ % ^ &amp; ).
        </p>
      </div>

      {/* Confirm new password */}
      <div className="mb-8">
        <label className="mb-2 block font-inter text-sm font-semibold text-tcolor dark:text-gray-100 darkH">
          Confirm new password
        </label>
        <input
          type={showConfirm ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          className={`inputRing w-full rounded-full border bg-white px-5 py-3 font-inter text-[15px] text-tcolor dark:text-gray-100 outline-none transition-all duration-200 dark:bg-[#222] darkH ${
            !passwordsMatch ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        <div className="mt-3">
          <ToggleSwitch checked={showConfirm} onChange={setShowConfirm} label="Show confirm password" />
        </div>
        {!passwordsMatch && (
          <p className="mt-2 font-inter text-[13px] text-red-500">Passwords do not match.</p>
        )}
      </div>

            <button
          type="submit"
          disabled={!canSave}
          className={`rounded-full px-8 py-3 font-inter text-sm font-semibold transition-all duration-300 ${
            canSave
              ? "bg-primary text-tcolor dark:text-gray-100 hover:brightness-95 cursor-pointer"
              : "cursor-not-allowed bg-gray-200 dark:bg-[#333333] text-gray-400 dark:text-gray-500"
          }`}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
    </form>
  )
}

export default Details