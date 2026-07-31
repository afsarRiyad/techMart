import React, { useState } from 'react'
import { LayoutDashboard, Package, Download, MapPin, CreditCard, UserRound, LogOut } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import Container from '../layouts/Container';
import { logout } from '../../hooks/Fetchdata';
import { clearCustomerToken } from '../../api/apiCustomer';

const dashboardNav = [
               {id:1, name: 'Dashborad', icon: LayoutDashboard, href: '/account', title:'My Account' },
               {id:2, name: 'Orders', icon: Package, href: '/account/orders', title:'Orders' },
               {id:3, name: 'Downloads', icon: Download, href: '/account/downloads', title:'Downloads' },
               {id:4, name: 'Addresses', icon: MapPin, href: '/account/addresses', title:'Addresses' },
               {id:5, name: 'Payment Methods', icon: CreditCard, href: '/account/payments-methods', title:'Payments method' },
               {id:6, name: 'Account details', icon: UserRound, href: '/account/account-details', title:'Account details' },
               {id:7, name: 'Log out', icon: LogOut, action: 'logout', },
]


const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const active = dashboardNav.find(item => item.href === location.pathname)?.title
  const handleLogout = async () => {
  try {
    await logout();

    clearCustomerToken();

    navigate("/account/login", { replace: true });
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
   <Container>
     <h1 className='flex justify-center pt-3 text-[40px] font-inter text-tcolor'>{dashboardNav.find(item => item.href === location.pathname)?.title}</h1>
       <div className='flex flex-col md:flex-row py-10 gap-8'>
           <div className='  md:max-w-2/7 w-full'>
                {dashboardNav.map((item, index) => {
  if (item.action === "logout") {
    return (
      <button
        key={item.id}
        onClick={handleLogout}
        className={`w-full flex justify-between group/main cursor-pointer border-t border-t-gray-400 py-4 ${
          index === dashboardNav.length - 1 && "border-b border-b-gray-400"
        }`}
      >
        <span className="group-hover/main:text-black text-base text-gray-500">
          {item.name}
        </span>

        <item.icon
          size={20}
          className="group-hover/main:text-black text-gray-500"
        />
      </button>
    );
  }

  return (
    <Link key={item.id} to={item.href}>
      <div
        className={`flex justify-between group/main cursor-pointer border-t border-t-gray-400 py-4 ${
          index === dashboardNav.length - 1 && "border-b border-b-gray-400"
        }`}
      >
        <span
          className={`group-hover/main:text-black text-base ${
            active === item.title
              ? "text-black font-semibold"
              : "text-gray-500"
          }`}
        >
          {item.name}
        </span>

        <item.icon
          size={20}
          className={`group-hover/main:text-black ${
            active === item.title
              ? "text-black font-semibold"
              : "text-gray-500"
          }`}
        />
      </div>
    </Link>
  );
})}
         </div>
         <div className='w-full'>
          <Outlet />
         </div>
         </div>
   </Container>
         </>
  )
}

export default Dashboard
