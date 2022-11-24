import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from '../axios'
import moment from 'moment';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import blank_profile from "../assets/empty profile/blank_profile.png"
import Comments from "./Comments";
import { UserContext } from "../context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import Comments from "../comments/Comments";

const Post = ({post}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [video, setVideo] = useState(false);
  const [postId, setPostId] = useState(post._id);
  const [userInfo, setUserInfo] = useState({});
  const { config, currentUser, logout}=useContext(UserContext)

  const { userId, _id, key, url, description, comments, likes, createdAt }=post

// Access the client
const queryClient = useQueryClient()

// Mutations
const mutation = useMutation(() => {
    return  Axios.put(`/post/like/${currentUser._id}`,{postId:_id}, config).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error.message);
    })
},
    {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

useEffect(()=>{
  Axios.get(`/user/get/${userId}`, config).then((response)=>{
    setUserInfo(response.data)
  }).catch((error)=>{
    if (!error.response.data?.auth) return logout();
    console.log(error.data.message);
  })

  if(url){
  const  extension = key.substring(key.lastIndexOf('.') + 1);
  (extension==='mp4')? setVideo(true):setVideo(false)
  }
},[])

const handleLike=()=>{
  mutation.mutate()
}

  return (
      <div className="px-5 md:px-14 mb-12">
        <div className="bg-white shadow-md p-8 rounded-lg ">
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <img src={userInfo?.profilePicture? userInfo.profilePicture : blank_profile} alt="profile" width={40} height={40} className='rounded-full' />
              <div className="flex flex-col">
                <Link
                  to={`/profile/1234tyui`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="font-bold">{userInfo && userInfo.fname + ' ' + userInfo.lname}</span>
                </Link>
                <span className="text-xs">{moment(createdAt).fromNow()}</span>
              </div>
            </div>
            <MoreHorizIcon />
          </div>
          <div className="my-5">
           <p className="text-start">{description}</p>
           {url && (video ? <video controls className=' w-full' src={url}></video>:<img src={url} alt="post" className="w-full h-full object-cover mt-5" />) }
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-3 cursor-pointer text-sm" onClick={handleLike}>
              {likes.includes(currentUser._id) ? <FavoriteOutlinedIcon  htmlColor="#7e22ce"/> : <FavoriteBorderOutlinedIcon  />}
              {likes.length >0 && likes.length}
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-sm" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              {comments.length >0 && comments.length}
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-sm">
              <SendOutlinedIcon />
            </div>
          </div>
          {commentOpen && <Comments postId={_id} />}
        </div>
      </div>
  )
};

export default Post;