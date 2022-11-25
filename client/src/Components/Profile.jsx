import React, { useState } from 'react'
import Modal from 'react-modal'
import CloseIcon from '@mui/icons-material/Close';
import blank_profile from "../assets/empty profile/blank_profile.png"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35rem',
        maxHeight: '38rem',
        backgroundColor: '#fffff',
        border: 'none'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
};

function Profile() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [value, setValue] = useState('')

    
  return (
    <div className="px-5 md:px-14 mt-5">
    <div className="flex justify-center">     
      <div className="w-full">
        <div className="mb-0 pb-0">
          <div className=" relative">
            <img
              className="w-full h-64 object-cover  rounded-t-3xl"
              src="https://fiberopticassy.com/wp-content/uploads/sites/13/2021/09/white-image-copia.png"
              alt=""
            />
            <img
              className="w-36 h-36 rounded-full absolute object-cover left-0 right-0 ml-5 top-20 border-2 border-white border-solid "
              src={ blank_profile}
              alt=""
            />
          </div>
          <div className='bg-purple-300  -top-5 mb-6 h-auto flex flex-wrap content-center justify-between items-center relative rounded-3xl '>
          <div className="flex flex-col  justify-center py-8 px-10 ">
              <h4 className="text-lg font-semibold">Bonnie Green</h4>
              <span className="font-normal">Visual Designer</span>   
              <button className='border border-black text-md font-semibold p-1 mt-2  rounded-md' onClick={() => { setModal2(true) }}>Edit profile</button>         
          </div>
          <div className="flex  flex-wrap p-10  mt-2 space-x-3 md:mt-3">
                  <div className='flex flex-col items-center'>
                  <span className='text-black text-lg font-semibold'>Posts</span>
                  <span className='text-black font-mono'>20</span>
                  </div>
                  <div className='flex flex-col text-lg items-center' onClick={() =>{setModal1(true); setValue('Followers')} } >
                  <span className='text-black font-semibold'>Followers</span>
                  <span className='text-black font-mono'>340</span>
                  </div>
                  <div className='flex flex-col text-lg items-center' onClick={() =>{setModal1(true); setValue('Following')} }>
                  <span className='text-black font-semibold'>Following</span>
                  <span className='text-black font-mono'>220</span>
                  </div>
               </div>
               <div className='p-10 hidden lg:block'>
              < MoreVertOutlinedIcon />
              </div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={modal1} onRequestClose={() => { setModal1(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setModal1(false) }} /></div>
            <h1 className='text-2xl  text-purple-700 font-thin mb-3'>{value}</h1>
                {arr.map((index) => (
                <div key={index} className=" bg-white my-3 rounded-xl shadow-md border-gray-100  border-2">
                    <div className=" flex flex-wrap justify-between items-center p-2.5">
                        <div className="flex items-center">
                            <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={blank_profile} alt="" />
                            <p className='font-semibold'>Hellen Keller</p>
                        </div>
                        <button className='border border-red-500 text-sm p-1 rounded-md  hover:bg-gray-100 '>Unfollow</button>

                    </div>
                </div>
            ))}
            </Modal>

            <Modal isOpen={modal2} onRequestClose={() => { setModal2(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setModal2(false) }} /></div>
            <h1 className='text-2xl  text-purple-700 font-thin mb-3'>Edit profile</h1>
            <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                                    <input type="text" name="fname" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 " placeholder="John" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                                    <input type="text" name="lname" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 " placeholder="Doe" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 " placeholder="johndoe@gmail.com" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 " placeholder="john_doe" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">About you</label>
                                    <input type="text" name="about" id="about" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 " placeholder="I am ..." required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="Enter current password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400" required />
                                </div>
                                <button type="submit" className="w-1/5 my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>             
            </Modal>
  </div>
  )
}

export default Profile