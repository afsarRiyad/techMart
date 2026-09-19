import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth';
import VerifyRequired from '@/components/common/VerifyRequired';

// Wraps routes that need an account. Pass requireVerified for the areas the api
// already refuses for unverified users (orders and checkout).
const ProtectedRoute = ({ requireVerified = false }) => {
  const { data, isLoading, isError } = useAuth()
  const location = useLocation()

  if (isLoading) return <p className='py-16 text-center text-tcolor dark:text-white'>Loading...</p>;

  if (isError || !data?.data) {
    // remember where they were, so login can send them back
    return <Navigate to="/account/login" replace state={{ from: location.pathname }} />;
  }

  if (requireVerified && !data.data.isVerified) {
    return <VerifyRequired />;
  }

  return <Outlet />;
};

export default ProtectedRoute
