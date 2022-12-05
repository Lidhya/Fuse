import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from '../axios'
import { UserContext } from '../context/UserContext';
import { validateUpdate } from './Validations/updateValidate'
import { errorHandler } from './javascripts/errorHandler'
import Swal from 'sweetalert2'
import Post from "./Post";
import Share from '../Components/Share'
/* ----------------------------- icon and images ---------------------------- */
import blank_profile from "../assets/empty profile/blank_profile.png"
import cover_blank from "../assets/empty profile/cover-picture-blank.png"
import EditIcon from '@mui/icons-material/Edit';
import CoverUploadModal from './Modals/CoverUploadModal';
import ProfileUploadModal from './Modals/ProfileUploadModal';
import ListModal from './Modals/ListModal';
import EditProfileModal from './Modals/EditProfileModal';
import CircularProgress from '@mui/material/CircularProgress';


function Profile() {
    const userId = useLocation().pathname.split("/")[2]
    const { currentUser, config, updateCurrentUser, token } = useContext(UserContext)
    const [listModal, setListModal] = useState(false)
    const [list, setList] = useState('')
    const [listData, setListData] = useState([])
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
    const navigate=useNavigate()

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
                errorHandler()
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
            errorHandler()
        })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] })
            },
        })

    const getUserPosts = () => {
        try {
            Axios.get(`/post/${userId}`, config).then(({ data }) => {
                const sortedData = data.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setProfilePosts(sortedData);
                refetch()
            }).catch((error) => errorHandler())
        } catch (error) { errorHandler() }
    }

    useEffect(() => {
        error && errorHandler()
        setListModal(false)
        setListData([])
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
                    Axios.get(`/user/followers/${profileUser._id}`, config)
                        .then(({ data }) => setListData(data))
                        .catch((error) => errorHandler())

                } else if (list === 'Following') {
                    Axios.get(`/user/followings/${profileUser._id}`, config)
                        .then(({ data }) => setListData(data))
                        .catch((error) => errorHandler())
                }
            } catch (error) {
                errorHandler()
            }
        }
    }, [listModal])

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            try {
                Axios.put(`/user/update/${currentUser._id}`, formValues, config)
                    .then((response) => {
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

    const handleFollow = (e, userId) => {
        e.preventDefault()
        mutation.mutate(userId)
    }

    const handleUnfollow = (e, userId, userName) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want unfollow ${userName}?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Unfollow'
        }).then((result) => {
            if (result.isConfirmed) {
                return mutation.mutate(userId)
            } else return;
        })
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

    const handleMessage=(e)=>{
        e.preventDefault()
        const data={
            senderId: currentUser._id,
            receiverId: profileUser?._id 
            
        }
        try {
            Axios.post(`/conversations`, data, config)
                .then(({data}) => {
                    navigate('/messenger')
                })
                .catch((error) => errorHandler())
        } catch (error) {
            errorHandler()
        }
    }

    const coverUploadModalProps = {
        setCoverImage, setCoverModal, coverImage, coverModal, handleCoverUpload, errorMessage, profileUser
    }

    const profileUploadModalProps = {
        profileImage, profileModal, setProfileImage, setProfileModal, profileUser, handleProfileUpload, errorMessage
    }

    const listModalProps = {
        listModal, setListModal, listData, currentUser, handleFollow, handleUnfollow, list
    }

    const EditProfileModalProps = {
        updateModal, setUpdateModal, errorMessage, formValues, formErrors, handleChange, handleSubmit
    }

    return (
        <>
        { isLoading ? <CircularProgress color="secondary" />
            : <div className="px-4 md:px-14 ">
                <div className="flex justify-center">
                    <div className="w-full">
                        <div className="mb-0 pb-0">
                            <div className=" relative">
                                <img
                                    className="w-full h-64 object-cover  rounded-t-3xl"
                                    src={profileUser?.coverPicture ? profileUser.coverPicture : cover_blank}
                                    alt={profileUser?.fname}
                                />
                                {currentUser?._id === profileUser?._id && <div onClick={() => setCoverModal(true)} className='z-0 absolute right-3 bottom-6 shadow bg-white rounded-full p-1'>
                                    <EditIcon />
                                </div>
                                }
                                <img
                                    className="w-36 h-36 rounded-full absolute object-cover left-0 right-0 ml-5 top-20 border-2 border-white border-solid "
                                    src={profileUser?.profilePicture ? profileUser.profilePicture : blank_profile}
                                    alt={profileUser?.username}
                                />
                                {currentUser?._id === profileUser?._id && <EditIcon onClick={() => setProfileModal(true)} className='z-0 absolute left-32 bottom-11 shadow bg-white rounded-full p-1' />}
                            </div>
                            <div className='bg-purple-300  -top-5 mb-6 h-auto flex flex-wrap content-center justify-between items-center relative rounded-3xl '>
                                <div className="flex flex-col  justify-center py-8 px-10 ">
                                    <h4 className="text-lg text-center font-semibold">{profileUser?.fname + ' ' + profileUser?.lname}</h4>
                                    <span className="font-serif text-xs text-center">@{profileUser?.username}</span>
                                    <span className="font-normal text-center">{profileUser?.description}</span>
                                    <div className='flex flex-wrap justify-center'>
                                    {currentUser?._id === profileUser?._id ?
                                        <button className=' border border-black text-md font-semibold p-1 mt-2 rounded-md' onClick={() => { setUpdateModal(true) }}>Edit profile</button>
                                        : (currentUser?.followings.includes(profileUser?._id) ?
                                            <button onClick={(e) => handleUnfollow(e, profileUser._id, profileUser.fname)} className="m-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Following</button>
                                            : <button onClick={(e) => handleFollow(e, profileUser._id)} className="m-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Follow</button>
                                        )}
                               {  currentUser?._id !== profileUser?._id  && <button onClick={handleMessage} className='m-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'>Message</button>    }
                               </div>
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
            }
            {currentUser?._id === profileUser?._id && <Share profileUpdate={getUserPosts} />}
            {profilePosts.length > 0 ? profilePosts.map((post) => <Post post={post} key={post._id} profileUpdate={getUserPosts} />)
                : (<div className='flex flex-col justify-center items-center'>
                    <span className="text-xl text-gray-400">
                        There are no posts yet.
                    </span>
                </div>)
            }

            { /* --------------------------------- Modals --------------------------------- */}
            <CoverUploadModal {...coverUploadModalProps} />
            <ProfileUploadModal {...profileUploadModalProps} />
            <ListModal {...listModalProps} />
            <EditProfileModal {...EditProfileModalProps} />

        </>
    )
}

export default Profile