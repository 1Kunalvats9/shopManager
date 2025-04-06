import React, { useState,useEffect } from 'react'
import StoreIcon from './StoreIcon'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("Hello")

    useEffect(() => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email")
      setIsLoggedIn(!!token); 
      const fetchdata = async () => {
        const res = await fetch('https://shopmanagerback.onrender.com/api/user/get',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email }) // replace with actual email
        })
        const data = await res.json();
        setName(data.data.shopName)
      }
      fetchdata()
    }, [isLoggedIn]);

    const handleLogout = () => {
      localStorage.removeItem("token"); 
      toast.success('User logged out successfully')
      setIsLoggedIn(false); 
      navigate('/') 
    };
  return (
    <nav className='w-[100vw] h-[4rem] md:h-[5rem] bg-white shadow-sm flex justify-between items-center py-3 md:py-6 px-4 md:px-40'>
      <div className='flex items-center gap-3 cursor-pointer' onClick={()=>{navigate('/dashboard')}}>
        <StoreIcon />
        <h1 className='text-xl md:text-2xl font-bold'>ShopManager</h1>
      </div>
      <div>
        {isLoggedIn ?  <div className='flex gap-6 items-center text-gray-600'>
          <h1 className='text-xl text-[#5046E5] font-semibold underline'>{name}</h1>
          <a onClick={handleLogout} className='hover:text-red-500 text-xl text-black hover:duration-200' href="/login">Logout</a>
        </div> :  <button onClick={()=>{navigate("/login")}} className={`cursor-pointer text-bold text-lg md:text-xl px-2 py-1 md:px-3 md:py-2 bg-indigo-600 text-white rounded-lg md:rounded-lg`}>Login</button>}
      </div>
    </nav>
  )
}

export default Navbar