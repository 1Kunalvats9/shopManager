import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [shopName, setShopName] = useState("")
  const navigate = useNavigate()
  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      <div className='shadow-lg p-5 w-[40%] min-h-[40%] rounded-3xl border-t-4 border-[#5046E5]'>
        <h1 className='text-4xl font-bold my-2 text-center pb-3 border-b-2 border-b-black'>Register</h1>
        <form className='flex flex-col gap-1' onSubmit={async (e) => {
          e.preventDefault()
          try {
            const res = await fetch("https://shopmanagerback.onrender.com/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                shopName,
                email,
                password
              })
            });

            if (res.ok) {
              const form = e.target;
              console.log(shopName,email)
              toast.success('User registered successfully')
              form.reset();
              navigate("/login")
              
            } else {
              console.log("User registration failed.");
              toast.error('Cannot register user')
            }
          } catch (err) {
            console.log("error: ", err)
          }
        }}>
          <div className='flex flex-col items-start justify-start gap-2'>
             <label htmlFor="name" className='mt-[5%] text-2xl font-semibold'>Business Name</label>
             <input type="text" id='name' placeholder='Business name' className='outline-none focus:scale-105 duration-200 w-full border-2 px-4 py-2 rounded-md' onChange={(e)=>{
            setShopName(e.target.value)
          }} />
          </div>
          <div className='flex flex-col items-start justify-start gap-2'>
             <label htmlFor="email" className='mt-[5%] text-2xl font-semibold'>Email</label>
             <input type="text" id='email' placeholder='Email' onChange={(e) => {
            setEmail(e.target.value)
          }} className='outline-none focus:scale-105 duration-200 w-full border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col items-start justify-start gap-2'>
             <label htmlFor="password" className='mt-[5%] text-2xl font-semibold'>Password</label>
             <input type="password" id='password' placeholder='Password' onChange={(e) => {
            setPassword(e.target.value)
          }} className='outline-none focus:scale-105 duration-200 w-full border-2 px-4 py-2 rounded-md'/>
          </div>

  
          <button className='bg-[#5046E5] mt-6 text-white rounded-lg cursor-pointer font-bold px-6 py-2'>Register</button>
          <a className='text-md font-medium mt-3 text-right' href={"/login"}>Already have an account ? <span className='underline'>Login</span></a>
        </form>
      </div>
    </div>
  )
}

export default Register
