import React, { useState } from 'react'
import { LayoutDashboard, Package, Download, MapPin, CreditCard, UserRound, LogOut } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import Container from '@/components/layout/Container';
import { logout } from '@/hooks/useFetchData';
import { clearCustomerToken } from '@/api/apiCustomer';
import {  useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation();
  const active = dashboardNav.find(item => item.href === location.pathname)?.title
  const handleLogout = async () => {
  try {
    await logout();
    clearCustomerToken();
    queryClient.setQueryData(['me'], null)
    queryClient.removeQueries({ queryKey: ['me'] });
    navigate("/account/login", { replace: true });
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
   <Container>
     <h1 className='flex justify-center pt-3 text-[26px] sm:text-[40px] font-inter text-tcolor dark:text-gray-100'>{dashboardNav.find(item => item.href === location.pathname)?.title}</h1>
       <div className='flex flex-col md:flex-row py-6 md:py-10 gap-6 md:gap-8'>
           {/* phones get a scrollable strip of tabs, a seven item stack buries the page */}
           <div className='md:max-w-2/7 w-full flex md:block gap-2 overflow-x-auto pb-1 md:overflow-visible md:gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                {dashboardNav.map((item, index) => {
  if (item.action === "logout") {
    return (
      <button
        key={item.id}
        onClick={handleLogout}
        className={`w-auto md:w-full shrink-0 flex justify-between items-center gap-2 group/main cursor-pointer rounded-full md:rounded-none border border-gray-200 dark:border-[#333333] md:border-0 md:border-t md:border-t-gray-400 px-4 md:px-0 min-h-11 md:py-4 whitespace-nowrap ${
          index === dashboardNav.length - 1 && "md:border-b md:border-b-gray-400"
        }`}
      >
        <span className="group-hover/main:text-black text-base text-gray-500 dark:text-gray-400">
          {item.name}
        </span>

        <item.icon
          size={20}
          className="group-hover/main:text-black text-gray-500 dark:text-gray-400"
        />
      </button>
    );
  }

  return (
    <Link key={item.id} to={item.href}>
      <div
        className={`flex justify-between items-center gap-2 group/main cursor-pointer rounded-full md:rounded-none border border-gray-200 dark:border-[#333333] md:border-0 md:border-t md:border-t-gray-400 px-4 md:px-0 min-h-11 md:py-4 whitespace-nowrap ${
          index === dashboardNav.length - 1 && "md:border-b md:border-b-gray-400"
        }`}
      >
        <span
          className={`group-hover/main:text-black dark:text-gray-100 text-base ${
            active === item.title
              ? "text-black dark:text-gray-100 font-semibold"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {item.name}
        </span>

        <item.icon
          size={20}
          className={`group-hover/main:text-black dark:text-gray-100 ${
            active === item.title
              ? "text-black dark:text-gray-100 font-semibold"
              : "text-gray-500 dark:text-gray-400"
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
