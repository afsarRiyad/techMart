import React from 'react'
import Container from './../components/layouts/Container';
import { Link } from 'react-router';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="flex items-center justify-center px-4 bg-white dark:bg-[#181818]">
      <Container>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <h1 className="text-[120px] md:text-[180px] font-bold text-primary leading-none mb-4">
            404
          </h1>
          <h2 className="text-[24px] md:text-[32px] font-bold text-tcolor dark:text-gray-300 mb-4 font-inter">
            Page Not Found
          </h2>
          <p className="text-[16px] text-gray-500 dark:text-gray-400 mb-8 font-inter max-w-md">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-primary dark:bg-yellow-500 text-tcolor dark:text-black font-semibold py-3 px-8 rounded-sm hover:bg-blue-600 hover:text-white dark:hover:bg-yellow-600 transition-all duration-300 ease-in-out cursor-pointer select-none"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </Container>
    </main>
  )
}

export default NotFound
