import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      <div className='shadow-lg p-5 rounded-3xl w-[40%] min-h-[40%] border-t-4 border-[#5046E5]'>
        <h1 className='text-4xl font-bold my-2 text-center pb-3 border-b-2 border-b-black'>Login</h1>
        <form className='flex flex-col gap-1' onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("https://shopmanagerback.onrender.com/api/auth/login", {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            });

            let data;
            try {
              data = await res.json();
            } catch (err) {
              toast.error("Server returned invalid response. Try again later.");
              return;
            }

            if (res.ok) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("email", email);
              toast.success("User Logged In successfully");
              navigate("/dashboard");
            } else {
              toast.error(data?.error || "Login failed");
            }
          } catch (err) {
            console.error("❌ Login Error:", err);
            toast.error("Unable to login. Check your network or try again.");
          }
        }}
        >
          <div className='flex flex-col items-start justify-start gap-2'>
            <label htmlFor="email" className='mt-[5%] text-2xl font-semibold'>Email</label>
            <input type="text" placeholder='Email' id='email' onChange={(e) => {
              setEmail(e.target.value)
            }} className='outline-none focus:scale-105 duration-200 w-full border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col items-start justify-start gap-2'>
            <label htmlFor="password" className='mt-[5%] text-2xl font-semibold'>Password</label>
            <input type="password" placeholder='Password' id='password' onChange={(e) => {
              setPassword(e.target.value)
            }} className='outline-none w-full focus:scale-105 duration-200 border-2 px-4 py-2 rounded-md' />
          </div>
          <button className='bg-[#5046E5] mt-10 text-white rounded-lg cursor-pointer font-bold px-6 py-2'>Login</button>
          <a className='text-md font-medium mt-3 text-right' href={"/register"}>Don't have an account ? <span className='underline'>Register</span></a>
        </form>
      </div>
    </div>
  )
}

export default Login
