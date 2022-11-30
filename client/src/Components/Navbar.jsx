import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import Axios from '../axios'
import { errorHandler } from './javascripts/errorHandler'
/* ---------------------------------- icons --------------------------------- */
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Navbar() {
  const { logout, currentUser, config } = useContext(UserContext)
  const [notifications, setNotifications] = useState([])
  const [count, setCount] = useState(0)

  const { isLoading, error, data } = useQuery(["notifications"], () => {
    return Axios.get(`/notifications/${currentUser._id}`, config)
      .then(({ data }) => {
        setNotifications(data)
        return data;
      }).catch((error) => errorHandler())
  }
  );

  useEffect(() => {
    notifications &&
      setCount(notifications.filter(e => e.isVisited === false).length)
  }, [notifications])

  const handleLogout = () => {
    if (window.confirm('Do you want to Signout?')) {
      logout()
      return <Navigate to='/signin' />
    }
  }
  const handleHamClick = () => {
    document.getElementById('navbar-hamburger').classList.toggle('hidden')
  }

  const handleSearchClick = () => {
    document.getElementById('navbar-search').classList.toggle('hidden')
  }

  return (

    <nav className="bg-white px-2 sm:px-4 py-1 top-0 fixed w-full dark:bg-gray-900 drop-shadow-md z-40">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-3xl font-extrabold whitespace-nowrap text-yellow-500">FUSE<span className='text-purple-700'>.</span></span>

        </Link>
        <div className="flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" onClick={handleSearchClick} aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="hidden relative md:block" id='navbar-search'>
            <div className="flex  absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find people..." />
          </div>
          <button data-collapse-toggle="navbar-search" onClick={handleHamClick} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <span className="sr-only">Open menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-hamburger">
          <div className="relative mt-3 md:hidden">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="search" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find people..." />
          </div>
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:gap-6 md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-purple-700 " aria-current="page"><HomeOutlinedIcon /><span className='md:hidden pl-3 text-white'>Home</span></Link>
            </li>
            <li>
              <Link to="/messenger" className="block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:hover:bg-transparent md:hover:text-purple-700 md:p-0  "><TextsmsOutlinedIcon /><span className='md:hidden pl-3 text-white'>Message</span></Link>
            </li>
            <li>
              <Link to="/notifications" className="block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:hover:bg-transparent md:hover:text-purple-700 md:p-0 "><NotificationsNoneOutlinedIcon />{count > 0 && <span className='-ml-2 absolute px-1.5 py-0.5 bg-red-600 text-white rounded-full text-xs'> {count}</span>}<span className='md:hidden pl-3 text-white'>Notificatoins</span></Link>
            </li>
            <li>
              <Link to={`/profile/${currentUser._id}`} className="block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:hover:bg-transparent md:hover:text-purple-700 md:p-0 "><PersonOutlineOutlinedIcon /><span className='md:hidden pl-3 text-white'>Profile</span></Link>
            </li>
            <li>
              <Link to="/news" className=" block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:hover:bg-transparent md:hover:text-purple-700 md:p-0 "><NewspaperOutlinedIcon /><span className='md:hidden pl-3 text-white'>News</span></Link>
            </li>
            <li className='md:hidden'>
              <Link to="/" className=" block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:hover:bg-transparent md:hover:text-purple-700 md:p-0 "><LightModeOutlinedIcon /><span className=' pl-3 text-white'>Theme</span></Link>
            </li>
            <li className='md:hidden'>
              <button onClick={handleLogout} className=" block py-2 pr-4 pl-3 text-purple-700 hover:text-white rounded md:hover:bg-transparent md:hover:text-purple-700 md:p-0 "><LogoutOutlinedIcon /><span className=' pl-3 text-white'>Sign out</span></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar