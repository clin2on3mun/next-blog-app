import { assets } from '../../Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({image,title,author, deleteBlog, date,mongoId}) => {
  return (
    <tr className='bg-white border-b'>
       <th className='items-center gap-3 text-gray-900 whitespace-nowrap hidden sm:flex px-6 py-4 font-medium' scope="col">
         <Image src={image || assets.profile_icon} width={40} height={50} alt='author'/>
         <p>{author || "no author"}</p>
       </th>
       <td className="px-6 py-4">
        {title || "no title"}
       </td>
       <td className="px-6 py-4">
         {(new Date(date)).toDateString()}
       </td>
      <td onClick={()=> deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">X</td>
    </tr>
  )
}

export default BlogTableItem