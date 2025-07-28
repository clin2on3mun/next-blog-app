"use client"

import React, { useEffect, useState } from 'react'
import  SubTableItem from '../../../components/adminComponents/SubTableItem'
import axios from 'axios'
import { toast } from 'react-toastify'

function page() {
  const [emails, setEmails] =useState([])

  const fetchEmails = async () =>{
    const response =  await axios.get('/api/email')
    setEmails(response.data.emails)
  }
  
  const deleteEmail =async(id)=>{
    const response = await axios.delete('/api/email',{
      params:{
        id: id
      }
    })
    if(response.data.success){
      toast.success(response.data.msg)
      fetchEmails()
    }
    else{
      toast.error("Failed to delete")
    }
  }


  useEffect(()=>{
    fetchEmails()
  },[])
  return (
   <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[600px] overflow-x-auto  mt-4 border border-gray-400 scrollbar-hide'>
         <table className='w-full text-sm text-gray-500'>
           <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Email subscription
                </th>
                <th scope='col' className='px-6 py-3 hidden sm:block'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                 Action
                </th>
              </tr>
           </thead>
           <tbody>
            {
              emails.map((email)=> (<SubTableItem key={email._id} mongoId = {email._id} deleteEmail={deleteEmail} email={email.email} date={email.date}/>))
            }
            
           </tbody>
         </table>
      </div>
    </div>
  )
}

export default page