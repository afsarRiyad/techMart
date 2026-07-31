import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { toast, Bounce } from 'react-toastify'
import { setCustomerToken } from '../api/apiCustomer'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      setCustomerToken(token)
      
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      
      navigate('/account', { replace: true })
    } else {
      toast.error('Login failed. No token received.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      
      navigate('/account/login', { replace: true })
    }
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing login...</p>
      </div>
    </div>
  )
}

export default AuthCallback
