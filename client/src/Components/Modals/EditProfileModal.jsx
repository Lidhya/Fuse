import React from 'react'
import Modal from 'react-modal'
import { customStyles } from '../javascripts/profileModalStyle'
import CloseIcon from '@mui/icons-material/Close';
import blank_profile from "../../assets/empty profile/blank_profile.png"

function EditProfileModal({updateModal, setUpdateModal, errorMessage, formValues, formErrors, handleChange, handleSubmit}) {
  return (
    <Modal isOpen={updateModal} onRequestClose={() => { setUpdateModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setUpdateModal(false) }} /></div>
                <h1 className='text-2xl  text-purple-700 font-thin mb-4'>Edit profile</h1>

                <form onSubmit={handleSubmit}>
                    {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="fname" id="floating_first_name" value={formValues?.fname} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            <p className='text-red-400 text-sm'>{formErrors.fname}</p>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="lname" id="floating_last_name" value={formValues?.lname} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>                   
                            <p className='text-red-400 text-sm'>{formErrors.lname}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="username" id="username" value={formValues?.username} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            <p className='text-red-400 text-sm'>{formErrors.username}</p>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="city" id="City" value={formValues?.city} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="City" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="description" id="description" value={formValues?.description} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">About you</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="email" name="email" id="floating_email" value={formValues?.email} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        <p className='text-red-400 text-sm'>{formErrors.email}</p>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="password" name="password" id="floating_password" value={formValues?.password} onChange={handleChange} className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current password</label>
                        <p className='text-red-400 text-sm'>{formErrors.password}</p>
                    </div>
                    <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save changes</button>
                </form>
            </Modal>
  )
}

export default EditProfileModal