import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth';

// Wraps routes that need an account. Pass requireVerified for the areas the api
// already refuses for unverified users (orders and checkout).
const ProtectedRoute = ({ requireVerified = false }) => {
  const { data, isLoading, isError } = useAuth()
  const location = useLocation()

  if (isLoading) return <p className='py-16 text-center text-tcolor dark:text-gray-100'>Loading...</p>;

  if (isError || !data?.data) {
    // remember where they were, so login can send them back
    return <Navigate to="/account/login" replace state={{ from: location.pathname }} />;
  }

  // signed in but the email is still unconfirmed: the code page, and no way back
  // into the page they asked for until the code is in
  if (requireVerified && !data.data.isVerified) {
    return (
      <Navigate
        to="/account/otp-verification"
        replace
        state={{ email: data.data.email, from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute
