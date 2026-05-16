import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import MainLayout from "./components/layouts/MainLayout"
import MyAccount from "./pages/MyAccount"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Signup from "./pages/Signup"
import Forgot from "./pages/Forgot"
import Reset from "./pages/Reset"


function App() {

  return (
    <>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<MyAccount/>}/>
        <Route path="/account/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/account" element={<MyAccount/>}/>
        <Route path="/account/signup" element={<Signup/>}/>
        <Route path="/account/forgot-password" element={<Forgot/>}/>
        <Route path="/account/reset-password" element={<Reset/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
