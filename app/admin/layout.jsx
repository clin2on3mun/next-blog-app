
import Image from 'next/image'
import Sidebar from '../../components/adminComponents/Sidebar'
import React from 'react'
import { assets } from '../../Assets/assets'
import { ToastContainer } from 'react-toastify'

export default function Layout({children}) {
  return (
    <>
    <div className='flex h-[100vh]'>
         <Sidebar/>
         <ToastContainer/>
         <div className="flex flex-col w-full overflow-y-auto">
           <div className="flex items-center sticky top-0 z-10 bg-white justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className='font-medium'>Admin Panel</h3>
             <Image src={assets.profile_icon} width={40} alt=""/>
           </div>
           {children}
         </div>
         
    </div> 
    </>
  )
}
