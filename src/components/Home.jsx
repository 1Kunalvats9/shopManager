import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function Home() {
  const [startBtn, setStartBtn] = useState("Get Started")
  const router = useNavigate();
  const handleClick = () => {
    const token = localStorage.getItem("token")
    token ? router("/dashboard") : router('/login')
  }
  return (
    <div className="w-[100vw] min-h-screen flex flex-col items-center justify-start">
      <Navbar />
      <div className="w-[100%] bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl md:text-6xl">Manage Your Shop <span className="text-indigo-600">Smarter</span></h1>
            <p className="mt-3 max-w-md mx-auto font-medium text-medium text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">The complete solution for local shop vendors to manage inventory, track profits, and grow their business.</p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center flex items-center justify-center md:mt-8">
              <button onClick={handleClick} className="cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Get Started<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-20 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-8 w-8 text-indigo-600"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Inventory Management</h3>
              <p className="mt-2 text-gray-500">Keep track of your stock levels and get notifications when items are running low.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart3 h-8 w-8 text-indigo-600"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Sales Analytics</h3>
              <p className="mt-2 text-gray-500">View detailed reports and insights about your business performance.</p></div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" height="32" width="20" viewBox="0 0 320 512"><path fill="#5046e5" d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Revenue Tracking</h3><p className="mt-2 text-gray-500">Monitor your profits and expenses with easy-to-understand visualizations.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
