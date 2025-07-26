"use client"
import React, { useState, useEffect } from 'react'
import BlogTableItem from '../../../components/adminComponents/BlogTableItem'
import axios from 'axios'
import { toast } from 'react-toastify'


function page() {
  const [blogs,setBlogs] =  useState()
   const fetchBlogs = async()=>{
   const response =  await axios.get('/api/blogs')
     setBlogs(response.data.blogs)
     console.log(response.data.blogs)
  }

  const deleteBlogs = async(mongoId)=>{
     const response =  await axios.delete('/api/blogs',{
      params:{
        id:mongoId
      }
     })
     toast.success(response.data.msg)
     fetchBlogs()
  }


  useEffect(()=>{
    fetchBlogs()

  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[800px] overflow-x-auto  mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='hidden sm:block px-6 py-3'>
                   Author Name 
                </th>
                <th scope='col' className=' px-6 py-3'>
                   Blog title 
                </th>
                <th scope='col' className=' px-6 py-3'>
                    Date
                </th>
                <th scope='col' className=' px-6 py-3'>
                   Action 
                </th>
              </tr>
              </thead>
              <tbody>
                { 
                  blogs?.map((blog, index)=>(
                    <BlogTableItem key={index} mongoId={blog._id} title={blog.title} date={blog.date} author={blog.author} deleteBlog={deleteBlogs}/>
                  )) 
                }
                 
              </tbody>
        </table>
      </div>
    </div>
  )
}

export default page