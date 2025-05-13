"use client"
import { FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";
import { login } from "@/app/store/userSlice";
import { useDispatch} from "react-redux";
import { useState } from "react";
import axios from "axios";


const Login = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const dispatch = useDispatch()

const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
       const res = await axios.post('http://localhost:3000/api/users/login',{email,password});

    const data = await res.data
    if (data) {
      dispatch(login(data.token));             // ✅ Update Redux
      localStorage.setItem('token', data.token); // ✅ Store in localStorage
      alert('login')
    }
    } catch (error: any) {
      alert(error.message)
    }
   

  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
      onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiMail className="text-gray-400 mr-2" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiLock className="text-gray-400 mr-2" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Login
          </button>
        </div>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/user/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
