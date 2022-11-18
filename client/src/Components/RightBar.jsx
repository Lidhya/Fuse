import React from 'react'
import { Link } from 'react-router-dom'
import User_1 from "../assets/Users/Profile-Pic-S.png"


function RightBar() {
   let arr = [1, 2, 3, 4]

  return (   
<aside className="fixed w-1/5 " aria-label="Sidebar">
   <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-900">
      <ul className="space-y-2 ">
         <li>
            <p className=" items-center  p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
               <span className=" font-semibold">Suggestions for you</span>
            </p>
         </li>
         {arr.map((index)=>(
         <li key={index}>
            <a href="#" className="flex gap-1 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
            <img src={User_1} alt="" className="w-10 h-10 rounded-full object-cover"/>
               <span className="flex-1 ml-3 whitespace-nowrap">User 1</span>
               <button className='border border-white text-sm p-1 rounded-md  hover:bg-gray-100 dark:hover:bg-gray-700'>Follow</button>
            </a>
         </li>
         ))}
      </ul>
      <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
      <li>
            <p className="flex items-center  p-2 text-base font-normal text-white">
               <span className=" font-semibold">Messages</span>
            </p>
         </li>
         {arr.map((index)=>(
         <li key={index}>
            <Link to="/messenger" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <img src={User_1} alt="" className="w-10 h-10 rounded-full object-cover"/>
               <span className="ml-4">Hellen Doe</span>
               <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
            </Link>
         </li>
         ))}
      </ul>
   </div>
</aside>

  )
}

export default RightBar