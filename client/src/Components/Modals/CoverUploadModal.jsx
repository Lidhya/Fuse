import React from 'react'
import Modal from 'react-modal'
import { customStyles } from '../javascripts/profileModalStyle'
import CloseIcon from '@mui/icons-material/Close';
import cover_blank from "../../assets/empty profile/cover-picture-blank.png"
import PermMediaIcon from '@mui/icons-material/PermMedia';

function CoverUploadModal({setCoverImage, setCoverModal,coverImage, coverModal, handleCoverUpload, errorMessage, profileUser}) {
  return (
    <Modal isOpen={coverModal} onRequestClose={() => { setCoverModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setCoverModal(false) }} /></div>
                <h1 className='text-2xl  text-purple-700 font-thin mb-3'>Edit cover picture</h1>
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
                <img
                    className="w-full max-h-96 object-cover"
                    src={coverImage ? URL.createObjectURL(coverImage) : (profileUser?.coverPicture ? profileUser.coverPicture : cover_blank)}
                    alt={profileUser?.fname}
                />
                <div className="flex justify-between items-center my-2 mx-2" >
                    <label htmlFor="cover-upload"> <PermMediaIcon htmlColor="gray" className="text-lg mr-1 cursor-pointer" />Choose cover picture</label>
                    <input name='coverImage' className='hidden' id='cover-upload' onChange={(e) => setCoverImage(e.target.files[0])} type="file" accept="image/png, image/jpeg" />
                    <button onClick={handleCoverUpload} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
                </div>
            </Modal>
  )
}

export default CoverUploadModal