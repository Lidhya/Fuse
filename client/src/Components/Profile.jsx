import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import CloseIcon from '@mui/icons-material/Close';
import blank_profile from "../assets/empty profile/blank_profile.png"
import cover_blank from "../assets/empty profile/cover-picture-blank.jpg"
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from '../axios'
import { UserContext } from '../context/UserContext';
import Share from '../Components/Share'
import Post from "./Post";
import { customStyles } from './constantData/profileModalStyle'
import { validateUpdate } from './Validations/updateValidate'
import EditIcon from '@mui/icons-material/Edit';
import PermMediaIcon from '@mui/icons-material/PermMedia';


function Profile() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const userId = useLocation().pathname.split("/")[2]
    const { currentUser, config, updateCurrentUser, token } = useContext(UserContext)
    const [listModal, setListModal] = useState(false)
    const [list, setList] = useState('')
    const [listData,  setListData] = useState([])
    const [updateModal, setUpdateModal] = useState(false)
    const [coverModal, setCoverModal] = useState(false)
    const [profileModal, setProfileModal] = useState(false)
    const [profileUser, setProfileUser] = useState({})
    const [profilePosts, setProfilePosts] = useState([])
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [coverImage, setCoverImage] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const queryClient = useQueryClient()

    const pictureConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const { isLoading, error, data, refetch } = useQuery(["user"],
        () => {
            return Axios.get(`/user/get/${userId}`, config).then(({ data }) => {
                setProfileUser(data)
                return data;
            }).catch((error) => {
                console.log(error.data)
                return error.data
            })
        },
        {
            refetchOnWindowFocus: false,
            enabled: false
        }
    );

    // Mutations
    const mutation = useMutation((userId) => {
        return Axios.put(`/user/follow-unfollow/${userId}`, { currentUser: currentUser._id }, config).then((response) => {
            updateCurrentUser()
        }).catch((error) => {
            console.log(error.message);
        })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] })
            },
        })

    const getUserPosts = () => {
        try {
            Axios.get(`/post/${userId}`).then(({ data }) => {
                const sortedData = data.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setProfilePosts(sortedData);
                refetch()
            }).catch((error) => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserPosts()
    }, [userId])

    useEffect(() => {
        setCoverImage('')
        setProfileImage('')
        setErrorMessage('')
    }, [coverModal, profileModal])

    useEffect(() => {
        if (currentUser._id === data?._id) {
            const { _id, fname, lname, username, email, description, city } = data
            setFormValues({ _id, fname, lname, username, email, description, city, password: "" })
            setFormErrors({})
        }
    }, [updateModal])

    useEffect(() => {
        if (listModal) {
            try {
                if (list === 'Followers') {
                    Axios.get(`/user/followers/${currentUser._id}`, config)
                    .then(({data})=>{
                        setListData(data)
                        console.log(data)})
                    .catch((error)=> console.log(error))

                } else if (list === 'Following') {
                    Axios.get(`/user/followings/${currentUser._id}`, config)
                    .then(({data})=>{
                        setListData(data)
                        console.log(data)})
                    .catch((error)=> console.log(error))
                }
            } catch (error) {
                console.log(error);
            }

        }

    }, [listModal])

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            try {
                Axios.put(`/user/update/${currentUser._id}`, formValues, config)
                    .then((response) => {
                        console.log(response);
                        updateCurrentUser()
                    })
                    .catch(({ response }) => {
                        setErrorMessage(response.data)
                    })
            } catch (error) {
                setErrorMessage(error.message)
            }

        }
    }, [formErrors])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFollow = (e) => {
        e.preventDefault()
        mutation.mutate(profileUser?._id)
    }

    const handleUnfollow = (e) => {
        e.preventDefault()
        if (window.confirm(`Do you want to unfollow`)) return mutation.mutate(profileUser?._id)
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateUpdate(formValues));
        setIsSubmit(true);
    };

    const handleCoverUpload = (e) => {
        e.preventDefault()
        if (!coverImage) return setErrorMessage("No changes are made")
        const formdata = new FormData()
        formdata.append('cover', coverImage)
        try {
            Axios.put(`/user/cover-update/${currentUser._id}`, formdata, pictureConfig)
                .then((response) => {
                    console.log(response);
                    setCoverModal(false)
                    updateCurrentUser()
                })
                .catch((error) => setErrorMessage(error.message))
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const handleProfileUpload = (e) => {
        e.preventDefault()
        if (!profileImage) return setErrorMessage("No changes are made")
        const formdata = new FormData()
        formdata.append('profile', profileImage)
        try {
            Axios.put(`/user/profile-update/${currentUser._id}`, formdata, pictureConfig)
                .then((response) => {
                    console.log(response);
                    setProfileModal(false)
                    updateCurrentUser()
                })
                .catch((error) => setErrorMessage(error.message))
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <>
            <div className="px-4 md:px-14 ">
                <div className="flex justify-center">
                    <div className="w-full">
                        <div className="mb-0 pb-0">
                            <div className=" relative">
                                <img
                                    className="w-full h-64 object-cover  rounded-t-3xl"
                                    src={profileUser?.coverPicture ? profileUser.coverPicture : cover_blank}
                                    alt={profileUser?.fname}
                                />
                                <div onClick={() => setCoverModal(true)} className='z-0 absolute right-3 bottom-6 shadow bg-white rounded-full p-1'>
                                    <EditIcon />
                                </div>
                                <img
                                    className="w-36 h-36 rounded-full absolute object-cover left-0 right-0 ml-5 top-20 border-2 border-white border-solid "
                                    src={profileUser?.profilePicture ? profileUser.profilePicture : blank_profile}
                                    alt={profileUser?.username}
                                />
                                <EditIcon onClick={() => setProfileModal(true)} className='z-0 absolute left-32 bottom-11 shadow bg-white rounded-full p-1' />
                            </div>
                            <div className='bg-purple-300  -top-5 mb-6 h-auto flex flex-wrap content-center justify-between items-center relative rounded-3xl '>
                                <div className="flex flex-col  justify-center py-8 px-10 ">
                                    <h4 className="text-lg font-semibold">{profileUser?.fname + ' ' + profileUser?.lname}</h4>
                                    <span className="font-serif text-xs text-center">@{profileUser?.username}</span>
                                    <span className="font-normal text-center">{profileUser?.description}</span>
                                    {currentUser?._id === profileUser?._id ?
                                        <button className='border border-black text-md font-semibold p-1 mt-2 rounded-md' onClick={() => { setUpdateModal(true) }}>Edit profile</button>
                                        : (currentUser?.followings.includes(profileUser?._id) ?
                                            <button onClick={handleUnfollow} className=" focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Following</button>
                                            : <button onClick={handleFollow} className=" focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Follow</button>
                                        )}
                                </div>
                                <div className="flex  flex-wrap p-10  mt-2 space-x-3 md:mt-3">
                                    <div className='flex flex-col items-center'>
                                        <span className='text-black text-lg font-semibold'>Posts</span>
                                        <span className='text-black font-mono'>{profilePosts.length}</span>
                                    </div>
                                    <div className='flex flex-col text-lg items-center' onClick={() => { setListModal(true); setList('Followers') }} >
                                        <span className='text-black font-semibold'>Followers</span>
                                        <span className='text-black font-mono'>{profileUser.followers?.length}</span>
                                    </div>
                                    <div className='flex flex-col text-lg items-center' onClick={() => { setListModal(true); setList('Following') }}>
                                        <span className='text-black font-semibold'>Following</span>
                                        <span className='text-black font-mono'>{profileUser.followings?.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {currentUser?._id === profileUser?._id && <Share profileUpdate={getUserPosts} />}
            {profilePosts && profilePosts.map((post) => <Post post={post} key={post._id} profileUpdate={getUserPosts} />)}

            { /* --------------------------------- Modals --------------------------------- */}
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

            <Modal isOpen={listModal} onRequestClose={() => { setListModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setListModal(false) }} /></div>
                <h1 className='text-2xl  text-purple-700 font-thin mb-3'>{list}</h1>
                {listData.length>0 ? listData.map((user) => (
                    <div key={user._id} className=" bg-white my-3 rounded-xl shadow-md border-gray-100  border-2">
                        <div className=" flex flex-wrap justify-between items-center p-2.5">
                            <div className="flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={user?.profilePicture ? user.profilePicture : blank_profile} alt={user.username} />
                                <p className='font-semibold'>{user.fname + ' ' + user?.lname}</p>
                            </div>
                            {currentUser?.followings.includes(user?._id) ?
                                            <button onClick={handleUnfollow} className=" focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Following</button>
                                            : <button onClick={handleFollow} className=" focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Follow</button>
                                        }
                        </div>
                    </div>
                ))
            : <p className='text-gray-600 m-3 text-lg'>You have no {list}</p>
            }
            </Modal>

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
        </>
    )
}

export default Profile