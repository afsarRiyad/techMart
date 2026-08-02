import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { setCustomerToken } from '../api/apiCustomer'
import toast, { Toaster } from 'react-hot-toast'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      setCustomerToken(token)
      
      toast.success('Login successful!')
      
      navigate('/account', { replace: true })
    } else {
      toast.error('Login failed. No token received.')
      
      navigate('/account/login', { replace: true })
    }
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster/>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing login...</p>
      </div>
    </div>
  )
}

export default AuthCallback
