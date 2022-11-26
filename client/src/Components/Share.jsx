import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal'
import Axios from '../axios'
import { UserContext } from '../context/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import blank_profile from "../assets/empty profile/blank_profile.png"
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import User_1 from "../assets/Users/Profile-Pic-S.png"
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import LabelIcon from '@mui/icons-material/Label';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import icons from './Icons'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35rem',
        backgroundColor: '#fffff',
        border: 'none'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
};

export default function Share({ profileUpdate }) {
    Modal.setAppElement('#root')
    const { currentUser, token, logout } = useContext(UserContext)
    const [modal, setModal] = useState(false)
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [Loading, setLoading] = useState(false);

    const uploadMax = 30000000
    const id = currentUser._id

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    // Access the client
    const queryClient = useQueryClient()

    // Mutations
    const mutation = useMutation((formData) => {
        return Axios.post(`/post/create-post/${id}`, formData, config).then((response) => {
            console.log(response);
            setLoading(false)
            profileUpdate && profileUpdate()
        }).catch(({response}) => {
            if (!response?.data?.auth) return logout();
            console.log(response);
        })
    },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['posts'] })
                queryClient.invalidateQueries({ queryKey: ['userPosts'] })
            },
        })


    const handleSubmit = () => {
        if (!image && !video && !description) return setErrorMessage("There is nothing to post")
        const formData = new FormData()
        image && formData.append('file', image)
        video && formData.append('file', video)
        description && formData.append('description', description)
        setModal(false)
        setLoading(true)
        mutation.mutate(formData)
    }

    useEffect(() => {
        if (!modal) {
            setImage('')
            setVideo('')
            setDescription('')
            setErrorMessage('')
        }
    }, [modal])

    return (
        <div className='px-5 md:px-14 my-3 text-center'>
            <Modal isOpen={modal} onRequestClose={() => { setModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setModal(false) }} /></div>
                <div className="flex flex-col justify-between  h-5/6 mb-2">
                    <div className="flex ">
                        <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={User_1} alt="" />
                        <textarea
                            rows={3}
                            placeholder="Share what's on your mind"
                            className="border-none w-full focus:outline-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
                    <div>
                        {image ? <img className='w-full max-h-96' src={image ? URL.createObjectURL(image) : ''} alt="logo" /> :
                            video && <video controls className=' w-full' src={video ? URL.createObjectURL(video) : ''}></video>}
                    </div>
                    <div className='mb-2'>
                        <hr className="my-3" />
                        <div className="flex flex-wrap  justify-between">
                            <div className="flex flex-wrap ">
                                <div className="flex items-center mx-2 cursor-pointer" >
                                    <label htmlFor="image-upload">
                                        <PermMediaIcon htmlColor="gray" className="text-lg mr-1" /></label>
                                    <input name='image' className='hidden' onChange={(e) => {
                                        setErrorMessage('')
                                        if (e.target.files[0].size > uploadMax) return setErrorMessage("File size should be less than 30MB")
                                        setImage(e.target.files[0]);
                                        setVideo('');
                                    }}
                                        id='image-upload' type="file" accept="image/png, image/jpeg" />
                                </div>
                                <div className="flex items-center mx-2 cursor-pointer">
                                    <label htmlFor="video-upload">
                                        <VideoCameraBackIcon htmlColor="gray" className="text-lg mr-1" /></label>
                                    <input name='video' className='hidden' onChange={(e) => {
                                        setErrorMessage('')
                                        if (e.target.files[0].size > uploadMax) return setErrorMessage("File size should be less than 30MB")
                                        setVideo(e.target.files[0]);
                                        setImage('');
                                    }}
                                        id='video-upload' type="file" accept="video/mp4,video/x-m4v,video/*" />
                                </div>
                            </div>
                            <button onClick={handleSubmit} className="border-none p-1.5 px-3 rounded bg-green-600 font-medium mr-5 cursor-pointer text-white">Post</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="w-full h-full rounded-xl shadow-md  bg-white mb-12">
                <div className="p-2.5">
                    <div className="flex items-center">
                        <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={currentUser?.profilePicture ? currentUser.profilePicture : blank_profile} alt={currentUser.username} />
                        <input
                            onClick={() => setModal(true)}
                            placeholder="Share a post"
                            className="border-none w-full focus:outline-none "
                        />
                    </div>
                    <hr className="m-5" />
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap m-3">
                            <div className="flex items-center m-2 cursor-pointer" onClick={() => setModal(true)}>
                                <PermMediaIcon htmlColor="tomato" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-semibold">Photo</span>
                            </div>
                            <div className="flex items-center m-2 cursor-pointer" onClick={() => setModal(true)}>
                                <VideoCameraBackIcon htmlColor="tomato" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-semibold">Video</span>
                            </div>
                            {/* <div className="flex items-center m-2 cursor-pointer">
                                <LabelIcon htmlColor="blue" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-medium">Tag</span>
                            </div> */}
                            {/* <div className="flex items-center m-2 cursor-pointer">
                                <LocationOnIcon htmlColor="green" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-medium">Location</span>
                            </div> */}
                            {/* <div className="flex items-center m-2 cursor-pointer">
                                <EmojiEmotionsIcon htmlColor="goldenrod" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-medium">Feelings</span>
                            </div> */}

                        </div>
                        <button onClick={() => setModal(true)} className="border-none p-1.5 px-3 rounded bg-green-600 font-medium mr-5 cursor-pointer text-white">Post</button>
                    </div>
                </div>
            </div>
            {Loading && <LinearProgress color="secondary" />}
        </div>
    );
}