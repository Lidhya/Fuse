import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import blank_profile from "../assets/empty profile/blank_profile.png"
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import User_1 from "../assets/Users/Profile-Pic-S.png"



function LeftBar() {
   const { logout, currentUser }=useContext(UserContext)
   const {fname, lname, profilePicture, description, followings, followers }=currentUser
   const handleLogout = () => {
      logout()
    return  <Navigate to='/signin'/>
   }

   return (

      <div className='flex flex-col w-1/5 fixed  '>
         <div className="w-full p-3 mb-3 mt-6 max-w-sm  rounded-lg border  shadow-md bg-gray-900 border-gray-700">
            <div className="flex flex-col items-center pb-10 ">
               <img className=" w-44 relative -top-10 h-44 rounded-full shadow-lg" src={profilePicture? profilePicture : blank_profile} alt={fname} />
               <Link to='/profile/sdfsadf' className=" text-xl font-medium text-gray-900 dark:text-white">{fname+' '+lname}</Link>
               <span className="text-sm  text-gray-500 dark:text-gray-400">{description}</span>
               <div className="flex flex-wrap justify-center content-center mt-2 space-x-3 md:mt-3">
                  <div className='flex flex-col items-center'>
                     <span className='text-white font-light'>Posts</span>
                     <span className='text-white font-mono'>20</span>
                  </div>
                  <div className='flex flex-col items-center'>
                     <span className='text-white font-light'>Followers</span>
                     <span className='text-white font-mono'>{followers.length}</span>
                  </div>
                  <div className='flex flex-col items-center'>
                     <span className='text-white font-light'>Following</span>
                     <span className='text-white font-mono'>{followings.length}</span>
                  </div>
               </div>

            </div>
         </div>

         <aside className="w-full mb-3" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 p-3 bg-gray-50 rounded-lg border  shadow-md dark:bg-gray-900">
               <ul className="space-y-2">
                  <li>
                     <Link to="/news" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NewspaperOutlinedIcon />
                        <span className="ml-3">News</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/messenger" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        < MailOutlinedIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/profile/dafsfs" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <PersonOutlineOutlinedIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LightModeOutlinedIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">Theme</span>
                     </Link>
                  </li>
                  <li>
                     <button onClick={handleLogout} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LogoutOutlinedIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
                     </button>
                  </li>
               </ul>
            </div>
         </aside>

      </div>


   )
}

export default LeftBar