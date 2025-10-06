/*
'use client';
import '../../components/Nav.css';
import React from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { easeOut, motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface data {
    name: string;
    email:string;
    password:string;
    cpassword:string;
}
const page = () => {
  const router = useRouter();

        const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

  const [login, setlogin] = useState({
    email:"",
    password:""
  })


  const handleSubmit = ()=>{
    if(!login.email || !login.password){
        Swal.fire({
     title: 'Error!',
      text: 'Fill in to signed up.',
      icon: 'error',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
    }
    else{
          Swal.fire({
      title: 'Login successful!',
      text: 'You have successfully signed In.',
      icon: 'success',
      confirmButtonText: 'OK',
        confirmButtonColor:'darkblue'
        })
        router.push('/');
    }
  }
  return (
   <div>
          <div className='overall-login bg-blue-900 flex flex-wrap justify-center'>
            <br />
            <motion.div className='login'
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} >
            <h1>Sign In</h1>
            <br />
          
          <input type='email' value={login.email} placeholder='Enter Email' onChange={(e) => setlogin({...login, email:e.target.value})} />
          <br />
            <br />
            
          <input type='password' value={login.password} placeholder='Enter Password' onChange={(e) => setlogin({...login, password:e.target.value})} />
          <br />
          <br />
          <button onClick={handleSubmit} className='bg-blue-900 text-white'>Submit</button>
          <h2 style={{marginTop:20}} className='text-center'>Do not have an Account? <Link className='text-blue-500 font-bold' href='/pages/register'>Sign Up</Link></h2>
        </motion.div>
        <br />
          <br />
            <br />
        </div>
    </div>
  )
}

export default page;
*/











"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff } from "lucide-react";


interface LoginResponse {
  email: string;
  role: "admin" | "librarian" | "teacher" | "student";
  name: string;
  error?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
/*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fakeUsers: Record<string, UserRole> = {
      "admin@example.com": { role: "admin" },
      "librarian@example.com": { role: "librarian" },
      "teacher@example.com": { role: "teacher" },
      "student@example.com": { role: "student" },
    };

    const user = fakeUsers[form.email.toLowerCase()];
    if (user && form.password === "password123") {
      switch (user.role) {
        case "admin":
          router.push("/pages/adminn");
          break;
        case "librarian":
          router.push("/pages/librarian");
          break;
        case "teacher":
          router.push("/pages/studentsTeachers");
          break;
        case "student":
          router.push("/pages/studentsTeachers");
          break;
        default:
          router.push("/");
      }
    } else {
      setError("❌ Invalid email or password");
    }
  };
*/




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Redirect user based on role
        switch (data.role) {
          case "admin":
            router.push("/pages/adminn");
            break;
          case "librarian":
            router.push("/pages/librarian");
            break;
          case "teacher":
          case "student":
            router.push("/pages/studentsTeachers");
            break;
          default:
            router.push("/");
        }
      } else {
        setError(data.error || "❌ Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Unable to connect to server");
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-400">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md relative">
        {/* Back button */}
        <Link href="/" className="absolute top-4 left-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Back
          </button>
        </Link>

        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🔐 Login
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your credentials to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-700" aria-hidden="true" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-700" aria-hidden="true" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              required
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot your password?
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link href="/pages/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </Link>
        </p>

         <p className="text-sm text-gray-600 text-center mt-2">Or Signin with the Social-Media of your choice</p>

     {/* Third Party Authentication */}
<div className="flex items-center justify-center mt-3 flex-wrap gap-3">
  {[
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      alt: "Google",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      alt: "LinkedIn",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "GitHub",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
      alt: "Facebook",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      alt: "Apple",
    },
  ].map((item, idx) => (
    <button
      key={idx}
      type="button"
      className="hover:scale-110 ease-in-out duration-300 shadow-md p-2 rounded-lg bg-white"
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={30}
        height={30}
        className="object-contain"
      />
    </button>
  ))}
</div>


        {/* Terms & Privacy */}
        <div className="text-gray-500 text-center mt-6 text-sm">
          <p>
            By logging in, you agree to our{" "}
            <Link href="/terms" className="text-blue-500 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

