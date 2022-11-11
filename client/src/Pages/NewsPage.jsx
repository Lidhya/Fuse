import React from 'react'
import LeftBar from '../Components/LeftBar';
import Navbar from '../Components/Navbar';
import News from '../Components/News';


function NewsPage() {
  return (
    <>
    <Navbar/>
    <div className='flex mt-20 m-3'>
    <div className='hidden md:block w-1/5 '><LeftBar/></div>
    <div><News/></div>
    </div>
    </>
  )
}

export default NewsPage