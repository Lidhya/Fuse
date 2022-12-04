import React from 'react'
import Modal from 'react-modal'
import { customStyles } from '../javascripts/profileModalStyle'
import CloseIcon from '@mui/icons-material/Close';
import blank_profile from "../../assets/empty profile/blank_profile.png"
import { Link } from 'react-router-dom';

function ListModal({listModal, setListModal, listData, currentUser, handleFollow, handleUnfollow, list}) {
  return (
    <Modal isOpen={listModal} onRequestClose={() => { setListModal(false) }} style={customStyles}>
    <div className='text-end'><CloseIcon onClick={() => { setListModal(false) }} /></div>
    <h1 className='text-2xl  text-purple-700 font-thin mb-3'>{list}</h1>
    {listData.length > 0 ? listData.map((user) => (
        <div key={user._id} className=" bg-white my-3 rounded-xl shadow-md border-gray-100  border-2">
            <div className=" flex flex-wrap justify-between items-center p-2.5">
                <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={user?.profilePicture ? user.profilePicture : blank_profile} alt={user.username} />
                    <Link to={`/profile/${user._id}`} className='font-semibold'>{user.fname + ' ' + user?.lname}</Link>
                </div>
                {currentUser?.followings?.includes(user?._id) ?
                    <button onClick={(e) => handleUnfollow(e, user._id, user.fname)} className="ml-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Following</button>
                    : (user?._id !== currentUser._id && <button onClick={(e) => handleFollow(e, user._id)} className="ml-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Follow</button>)
                }
            </div>
        </div>
    ))
        : <p className='text-gray-600 m-3 text-lg'>No {list} yet</p>
    }
</Modal>

  )
}

export default ListModal