import { useQuery,useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import User_1 from "../assets/Users/Profile-Pic-S.png"
import { UserContext } from "../context/UserContext";
import blank_profile from "../assets/empty profile/blank_profile.png"
import Axios from '../axios'
import moment from 'moment';



const Comments = ({ postId }) => {
  const { currentUser, config, logout } = useContext(UserContext);
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [commentDetails,setcommentDetails]=useState([])

  const { isLoading, error, data } = useQuery(['comments'], () => {
    Axios.get(`/comments/all-comments/${postId}`, config)
    .then((res) =>{
      setcommentDetails(res.data)
      return res.data
    })
    .catch((error) => {
      console.log(error.data.message)
      return null;  
      })
  })
  
  const queryClient=useQueryClient();
  const mutation=useMutation(
    (commentData)=>{
      Axios.post(`/comments/add-comment/${postId}`, commentData, config).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    })

  const comment = {
    authorId: currentUser._id,
    comment: newComment
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment) return setErrorMessage('comment is required')
    setErrorMessage('')
    mutation.mutate(comment)
  }

  return (
    <div className="comments">
      <div className="flex items-center justify-between gap-5 my-5">
        <img src={User_1} alt="" className="w-10 h-10 rounded-full object-cover" />
        <input className="flex-1 p-2.5 border-2 border-solid border-gray-300 rounded-md focus:outline-none" value={newComment} onChange={(e) => setNewComment(e.target.value)} name='comment' type="text" placeholder="write a comment" />
        <p className='text-red-400 text-xs'>{errorMessage && errorMessage}</p>
        <button onClick={handleCommentSubmit} className="bg-blue-400 text-white p-2.5 cursor-pointer rounded">Send</button>
      </div>
      {commentDetails && commentDetails.map((comment, index) => (
        <div className="my-8 flex justify-between gap-5" key={index}>
          <img src={comment.profilePicture? comment.profilePicture : blank_profile} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 flex flex-col gap-1 items-start">
            <span className="font-semibold">{comment.fname + ' ' + comment.lname}</span>
            <p className="text-gray-500">{comment.comment}</p>
          </div>
          <span className=" text-gray-600 text-xs self-center font-semibold">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;