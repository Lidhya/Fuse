import React from 'react'
import Modal from 'react-modal'
import User_1 from "../assets/Users/Profile-Pic-S.png"
import post_1 from "../assets/posts/library-06.jpg"
import CloseIcon from '@mui/icons-material/Close';

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

function Profile() {
  return (
    <div className="px-14 my-5">
    <div className="flex justify-center">     
      <div className="w-full">
        <div className="profileRightTop">
          <div className="h-80 relative">
            <img
              className="w-full h-64 object-cover  rounded-t-3xl"
              src={post_1}
              alt=""
            />
            <img
              className="w-36 h-36 rounded-full absolute object-cover left-0 right-0 ml-5 top-36 border-2 border-white border-solid z-10"
              src={User_1}
              alt=""
            />
          </div>
          <div className='bg-purple-300 h-auto flex  justify-between items-center relative -top-16 rounded-b-3xl z-0'>
          <div className="flex flex-col  justify-center py-8 px-10 ">
              <h4 className="text-lg font-semibold">Bonnie Green</h4>
              <span className="font-light">Visual Designer</span>            
          </div>
          <div className="flex  flex-wrap   mt-2 space-x-3 md:mt-3">
                  <div className='flex flex-col items-center'>
                  <span className='text-black text-lg font-light'>Posts</span>
                  <span className='text-black font-mono'>20</span>
                  </div>
                  <div className='flex flex-col text-lg items-center'>
                  <span className='text-black font-light'>Followers</span>
                  <span className='text-black font-mono'>340</span>
                  </div>
                  <div className='flex flex-col text-lg items-center'>
                  <span className='text-black font-light'>Following</span>
                  <span className='text-black font-mono'>220</span>
                  </div>
               </div>
              < MoreVertOutlinedIcon/>
          </div>
        </div>
        <div className="flex">
        </div>
      </div>
    </div>
    <Modal isOpen={modal} onRequestClose={() => { setModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setModal(false) }} /></div>
                
            </Modal>
  </div>
  )
}

export default Profile