import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import MainLayout from "./components/layouts/MainLayout"
import MyAccount from "./pages/MyAccount"
import Login from "./pages/Login"


function App() {

  return (
    <>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<MyAccount/>}/>
        <Route path="/account/login" element={<Login/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
