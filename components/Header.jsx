import Image from 'next/image'
import {assets} from '../Assets/assets'
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export const Header = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const emailForm =  new FormData()
    emailForm.append("email", email)
    const response =  await axios.post('/api/email', emailForm)

    if(response.data.success){
      toast.success(response.data.msg)
      setEmail('')
    }
    else{
      toast.error('Email not sent')
    }
  } 

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={180} alt="logo" className='w-[130px] sm:w-auto'/>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0_#000000]'>
          Get Started <Image src={assets.arrow} alt='arrow'/>
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className='text-3xl sm:text-5xl font-medium'> Latest Blog </h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur luctus auctor. Nullam consequat, ex ac condimentum hendrerit, turpis nisi bibendum orci, a vehicula ligula ex ut tortor.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-between max-w-[500px]  scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0_#000000]">
          <input onChange={(e)=> setEmail(e.target.value)} value={email} required type="text" className="pl-4 outline-none" placeholder='enter your email'/>
          <button type="submit" className="border-l border-black py-4 px-2 md:px-4 sm:px-8 active:bg-gray-600 active:text-white">Subscribe</button>
        </form>
      </div>

    </div>
  )
}
