import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router';
import { Eye, EyeOff, Vault } from 'lucide-react';
import Apple from '../assets/images/apple-logo.svg?react'
import Goolgle from '../assets/images/google.svg?react'
import  signup  from '../hooks/Fetchdata';
import { CircleAlert } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Signup = () => {
  const [touched, setTouched] = useState({})
  const navigate = useNavigate();
  const [errs, setErrs] = useState({})
  const [show, setShow] = useState(false)
  const [confirmShow, setConfirmShow] = useState(false)
  const [formData, setFormData] = useState({
                                            username : '',
                                            email: '',
                                            password:'',
                                            confirmPassword:'',
                                            agreeToTerms: false,
                                          })
 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
  if(errs[name]){
      setErrs((prev) =>({...prev, [name]: ''}))
  }
};

  const handleSubmit = async (e) =>{
           e.preventDefault();
           setErrs({})
           try {
            const data = await signup(formData)
            if(data?.success){
              toast.success(data.message || "account created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }
            localStorage.setItem("user", JSON.stringify(data.user))
            setTimeout(() => {
                 navigate("/account/login", { replace: true });
                   }, 1500);
                   
                    
           } catch (error) {
            const data = error.response?.data;
                    toast.error(data?.message || "Something went wrong", {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: false,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "dark",
                                  transition: Bounce,
                                  });
                   
              data?.errors?.forEach((err) => {
                  setErrs((prev) => (
                    {...prev, [err.field] : err.message}
                  ))
    });
           }
  }

  const handleBlur = (e) =>{
         setTouched((prev) => ({
                      ...prev,
                      [e.target.name]: true,
  }));
  }
 
  
  return (
    <main className="flex items-center justify-center mx-auto max-w-[424px] px-4 w-full">
      <form className='flex flex-col  shadow-lg max-w-[424px] w-full  rounded-md mx-auto border border-gray-100 dark:border-primary lg:my-22 my-10' onSubmit={handleSubmit}>
        <div className='flex justify-around w-full font-robot text-[20px] font-bold text-tcolor border-b border-b-gray-200 '>
          <Link to='/account/login' className='lg:w-[212px] flex justify-center cursor-pointer py-4 text-gray-500 dark:text-gray-400 select-none'>Sign In</Link>
          <span className='lg:w-[212px] flex justify-center border-b-[3px] cursor-pointer border-b-primary py-4 dark:text-gray-300 dark:border-b-yellow-500'>Sign Up</span>
        </div>
        <div className='px-8 flex flex-col gap-4 py-6'>
          {/* username field username field  */}
          {/* username field username field  */}
          <div className=''>
            <label htmlFor='name' className={`font-inter block font-semibold pb-2 dark:text-gray-300 select-none ${errs.username ? 'text-red-500' : 'text-tcolor'}`}>User Name</label>
            <input autoComplete="name" type="text" id='name' name='username' className={`w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300 inputRing ${errs.username ? 'border-2 border-red-400 placeholder:text-red-500' : ''}`} placeholder='Enter Your Name' onChange={(e)=>handleChange(e)} onBlur={(e)=>handleBlur(e) }/>
            {errs.username && 
                             <div className="flex items-start gap-1 mt-1 text-sm text-red-500 font-inter">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  <span className='font-semibold'>{errs.username }</span>
                </div>
              }
          </div>
           {/* email field email field  */}
           {/* email field email field  */}
          <div className=''>
            <label htmlFor='email' className={`font-inter block font-semibold pb-2 dark:text-gray-300 select-none ${errs.email ? 'text-red-500' : 'text-tcolor'}`}>Email Address</label>
            <input type="email" id='email' className={`w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300 inputRing ${errs.email ? 'border-2 border-red-400 placeholder:text-red-500' : ''}`} placeholder='Enter Your Email' autoComplete="email" name='email' onChange={(e)=>handleChange(e)} onBlur={(e)=>handleBlur(e) }/>
            {errs.email && 
                            <div className="flex items-start gap-1 mt-1 text-sm text-red-500 font-inter">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  <span className='font-semibold'>{errs.email}</span>
                </div>
              }
          </div>
          <div className=''>
            <label htmlFor='password' name='password' className={`font-inter block font-semibold pb-2 dark:text-gray-300 select-none ${errs.password ? 'text-red-500' : 'text-tcolor'}`} >Password</label>
            {/* password password  */}
            {/* password password  */}
            <div className='relative'>
              <input id='password' type={show ? "text" : "password"} className={`w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300 inputRing ${errs.password ? 'border-2 border-red-400 placeholder:text-red-500' : ''}`} placeholder='Enter Your Password' autoComplete="new-password" name='password' onChange={(e)=>handleChange(e)} onBlur={(e)=>handleBlur(e) }/>
              {show ?
                <Eye size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setShow(!show)} /> :
                <EyeOff size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setShow(!show)} />
              }
               {errs.password && 
                             <div className="flex items-start gap-1 mt-1 text-sm text-red-500 font-inter">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  <span className='font-semibold'>{errs.password}</span>
                </div>
              }
            </div>
          </div>
          {/* confirm password confirm password  */}
          {/* confirm password confirm password  */}
          <div className=''>
            <label htmlFor='confirmPassword' className={`font-inter block font-semibold pb-2 dark:text-gray-300 select-none ${errs.confirmPassword ? 'text-red-500' : 'text-tcolor'}`} >Confirm Password</label>
            <div className='relative'>
              <input id='confirmPassword' type={confirmShow ? "text" : "password"} className={`w-full border border-gray-200 rounded-sm outline-0 py-2 px-3 dark:placeholder:text-gray-300 inputRing ${errs.confirmPassword ? 'border-2 border-red-400 placeholder:text-red-500' : ''}`} placeholder='Confirm Your Password' autoComplete="new-password" name='confirmPassword' onChange={(e)=>handleChange(e)} onBlur={(e)=>handleBlur(e) }/>
              {confirmShow ?
                <Eye size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setConfirmShow(!confirmShow)} /> :
                <EyeOff size={20} className='absolute right-5 top-2.5 cursor-pointer' onClick={() => setConfirmShow(!confirmShow)} />
              }
              {errs.confirmPassword && (
                <div className="flex items-start gap-1 mt-1 text-sm text-red-500 font-inter">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  <span className='font-semibold'>{errs.confirmPassword}</span>
                </div>
)}
            </div>
          </div>
          {/* checkbox checkbox checkbox  */}
          {/* checkbox checkbox checkbox  */}
          <div className='flex gap-2 items-start '>
            <input type="checkbox" id='signUp' className='mt-1 accent-blue-500/75' name='agreeToTerms'  onBlur={(e)=>handleBlur(e) } onChange={(e)=>handleChange(e)}/>
            <label htmlFor="signUp" className='text-[15px] text-tcolor font-inter select-none dark:text-gray-300'>Are you agree to Electro <Link to='/terms-and-conditions' className='text-blue-500 hover:underline'>Terms of Condition</Link> and <Link to='/privacypolicy' className='text-blue-500 hover:underline'>Privacy Policy</Link> </label>
          </div>
            {errs.agreeToTerms && 
                            <div className="flex items-start gap-1 mt-1 text-sm text-red-500 font-inter">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  <span className='font-semibold'>{errs.agreeToTerms}</span>
                </div>
              }
          <div className='pt-2 relative'>
            <button className='bg-primary dark:bg-yellow-500 group w-full text-tcolor font-semibold py-3 px-4 rounded-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out select-none'>Sign Up </button>

          </div>
          <div className='flex justify-center items-center gap-2 pt-2'>
            <span className='w-40 bg-gray-200 h-[2px]' />
            <span className='text-inter text-gray-600'>or</span>
            <span className='w-40 bg-gray-200 h-[2px]' />
          </div>
          <div className='select-none'>
            <div className='border border-gray-200 py-2 flex font-inter items-center cursor-pointer mb-3 hover:shadow-md transition-all duration-300 ease-in-out'>
              <Goolgle fill='currentColor' className='w-8 h-auto ml-3' />
              <span className='text-gray-500 text-[15px] w-full pl-20 darkH'>Login with Google</span>
            </div>

            <div className='border border-gray-200 py-2 flex font-inter items-center cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out'>
              <Apple fill='currentColor' className='w-8 dark:text-white h-auto ml-3' />
              <span className='text-gray-500 text-[15px] w-full pl-21 darkH'>Login with Apple</span>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Signup