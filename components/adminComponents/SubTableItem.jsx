import React from 'react'

const SubTableItem = ({email, mongoId, deleteEmail, date}) => {
  return (
    <tr className='bg-white border-b text-left'>
       <th scope="row" className=" text-gray-900 whitespace-nowrap px-6 py-4 font-medium'">
         {email ||  "No email"}
       </th>
       <td className='px-6 py-4'>{(new Date(date).toDateString()) || "no date found"}</td>
       <td className='px-6 py-4 cursor-pointer' onClick={()=> deleteEmail(mongoId)}>X</td>
    </tr>
  )
}

export default SubTableItem