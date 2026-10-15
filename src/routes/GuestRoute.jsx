import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth'


const GuestRoute = () => {
  const { data, isLoading } = useAuth()
  const location = useLocation()


  if (isLoading) {
    return <p className='py-16 text-center text-tcolor dark:text-gray-100'>Loading...</p>
  }

  if (data?.data) {
    return <Navigate to={location.state?.from || '/account'} replace />
  }

  return <Outlet />
}

export default GuestRoute
