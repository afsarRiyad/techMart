import { Route, Routes } from "react-router"
import Home from "@/pages/Home"
import MainLayout from "@/components/layout/MainLayout"
import MyAccount from "@/pages/MyAccount"
import Login from "@/pages/Login"
import Cart from "@/pages/Cart"
import Signup from "@/pages/Signup"
import Forgot from "@/pages/Forgot"
import Reset from "@/pages/Reset"
import OtpVerification from "@/pages/OtpVerification"
import TrackOrder from "@/pages/TrackOrder"
import Terms from "@/pages/Terms"
import AuthCallback from "@/pages/AuthCallback"
import Orders from "@/components/dashboard/Orders"
import Downloads from "@/components/dashboard/Downloads"
import Addresses from "@/components/dashboard/Addresses"
import Payments from "@/components/dashboard/Payments"
import Details from "@/components/dashboard/Details"
import Dashboard from "@/components/dashboard/Dashboard"
import ProtectedRoute from "@/routes/ProtectedRoute"
import Billing from "@/pages/Billing"
import Shipping from "@/pages/Shipping"
import Deals from "@/components/home/Deals"
import Recommendation from "@/components/home/Recommendation"
import Checkout from "@/pages/Checkout"
import SingleOrderDetails from '@/components/ui/SingleOrderDetails';
import Wishlist from '@/pages/Wishlist';
import OrderReceived from "@/pages/OrderReceived"
import Products from "@/pages/Products"
import ProductDetail from "@/pages/ProductDetail"
import ScrollToTop from "@/components/common/ScrollToTop"
import NotFound from "@/pages/NotFound"


function App() {

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/account/login" element={<Login/>}/>
        <Route path="/order-received" element={<OrderReceived/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<Products />} />
        <Route path="/category/:parent/:child" element={<Products />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/account/signup" element={<Signup/>}/>
        <Route path="/account/forgot-password" element={<Forgot/>}/>
        <Route path="/account/otp-verification" element={<OtpVerification/>}/>
        <Route path="/account/reset-password" element={<Reset/>}/>
        <Route path="/track-order" element={<TrackOrder/>}/>
        <Route path="/auth/callback" element={<AuthCallback/>}/>
     <Route element={<ProtectedRoute/>}>
       <Route element={<Dashboard/>}>
        <Route path="/account" element={<MyAccount/>}/>
        <Route path="/account/orders" element={<Orders/>}/>
        <Route path="/account/downloads" element={<Downloads/>}/>
        <Route path="/account/addresses" element={<Addresses/>}/>
        <Route path="/account/payments-methods" element={<Payments/>}/>
        <Route path="/account/billing" element={<Billing/>}/>
        <Route path="/account/shipping" element={<Shipping/>}/>
        <Route path="/account/account-details" element={<Details/>}/>
        <Route path="/account/orders/:orderId" element={<SingleOrderDetails/>}/>
      </Route>
     </Route>
        <Route path="/terms-and-conditions" element={<Terms/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
