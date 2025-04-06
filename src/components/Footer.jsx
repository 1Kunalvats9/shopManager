import React from 'react'
import StoreIcon from './StoreIcon'

const Footer = () => {
  return (
    <div className='w-[100%] bg-[#101827] px-12 py-10 flex flex-col items-center justify-between'>
      <div className='w-[100%] flex md:flex-row flex-col gap-11 md:gap-0 items-start justify-between'>
        <div className='w-[100%] md:w-[30%] gap-4 flex flex-col items-start justify-start'>
          <div className='flex items-center justify-between gap-3 text-white'>
            <StoreIcon />
            <h1 className='text-xl md:text-3xl font-bold'>ShopManager</h1>
          </div>
          <p className='text-[#9CA3AF] text-xl'>Empowering local businesses with smart inventory management and analytics tools to help them grow and succeed.</p>
        </div>
        <div>
          <h1 className='md:text-2xl text-xl text-white font-semibold'>Quick Links</h1>
          <ul className='text-xl text-[#9CA3AF]'>
            <li className='mt-2 w-fit hover:text-[#818CF8] duration-200'><a href="">Features</a></li>
            <li className='mt-2 w-fit hover:text-[#818CF8] duration-200'><a href="">Pricing</a></li>
            <li className='mt-2 w-fit hover:text-[#818CF8] duration-200'><a href="">Support</a></li>
          </ul>
        </div>
        <div>
          <h1 className='md:text-2xl text-xl text-white font-semibold'>Contact</h1>
          <ul className='text-xl text-[#9CA3AF]'>
            <li className='mt-2'><a href="">support@shopmanager.com</a></li>
            <li className='mt-2'><a href="">+91 123456789</a></li>
            <li className='mt-2'><a href="">Sonipat Delhi, India</a></li>
          </ul>
        </div>
      </div>
      <div className='w-full mt-10 border-b-2 border-b-gray-500/20'></div>
      <h1 className='w-full text-center mt-6 text-xl md:text-2xl text-[#9CA3AF] '>© 2025 ShopManager. All rights reserved.</h1>
    </div>
  )
}

export default Footer
