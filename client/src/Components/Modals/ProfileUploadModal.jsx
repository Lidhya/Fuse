import React from 'react'
import Modal from 'react-modal'
import { customStyles } from '../javascripts/profileModalStyle'
import CloseIcon from '@mui/icons-material/Close';
import blank_profile from "../../assets/empty profile/blank_profile.png"
import PermMediaIcon from '@mui/icons-material/PermMedia';

function ProfileUploadModal({profileImage, profileModal, setProfileImage, setProfileModal, profileUser, handleProfileUpload, errorMessage}) {
  return (
    <Modal isOpen={profileModal} onRequestClose={() => { setProfileModal(false) }} style={customStyles}>
    <div className='text-end'><CloseIcon onClick={() => { setProfileModal(false) }} /></div>
    <h1 className='text-2xl  text-purple-700 font-thin mb-3'>Edit profile picture</h1>
    {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
    <div className='flex justify-center items-center'>
        <img
            className="w-52 h-52 rounded-full object-cover"
            src={profileImage ? URL.createObjectURL(profileImage) : (profileUser?.profilePicture ? profileUser.profilePicture : blank_profile)}
            alt={profileUser?.fname}
        />
    </div>
    <div className="flex justify-between items-center my-2 mx-2 " >
        <label htmlFor="profile-upload"> <PermMediaIcon htmlColor="gray" className="text-lg mr-1 cursor-pointer" />Choose profile picture</label>
        <input name='profileImage' className='hidden' id='profile-upload' onChange={(e) => setProfileImage(e.target.files[0])} type="file" accept="image/png, image/jpeg" />
        {/* <button className="text-gray-500 border-gray-500 border-2 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">Remove</button> */}
        <button onClick={handleProfileUpload} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
    </div>
</Modal>
  )
}

export default ProfileUploadModal