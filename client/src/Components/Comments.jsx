import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Axios from '../axios'
import moment from 'moment';
import { errorHandler } from './javascripts/errorHandler'
/* ---------------------------------- icons --------------------------------- */
import blank_profile from "../assets/empty profile/blank_profile.png"
import LinearProgress from '@mui/material/LinearProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Comments = ({ postId }) => {
  const { currentUser, config } = useContext(UserContext);
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { _id, fname, profilePicture } = currentUser

  const { isLoading, error, data } = useQuery(['comments'], () => {
    return Axios.get(`/comments/${postId}`, config)
      .then(({ data }) => {
        data.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return data
      })
      .catch((error) => {
        errorHandler()
        return error;
      })
  })

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (commentData) => {
      return Axios.post(`/comments/${postId}`, commentData, config).then((response) => {
        return response;
      }).catch((error) => errorHandler())
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['comments'] })
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      },
    })

  const comment = {
    authorId: _id,
    comment: newComment
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment) return setErrorMessage('comment is required')
    setErrorMessage('')
    setNewComment('')
    mutation.mutate(comment)
  }

  const handleDelete = (commentId) => {
    Axios.put(`/comments/delete/${postId}`, { commentId: commentId }, config)
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
        queryClient.invalidateQueries({ queryKey: ['posts'] })
        return res?.data
      })
      .catch((error) => {
        errorHandler()
        return error;
      })
  }

  return (
    <div className="comments">
      <div className="flex items-center flex-wrap justify-between gap-5 my-5">
        <img src={profilePicture ? profilePicture : blank_profile} alt={fname} className="w-10 h-10 rounded-full object-cover" />
        <input className="flex-1 p-2.5 border-2 border-solid border-gray-300 rounded-md focus:outline-none" value={newComment} onChange={(e) => setNewComment(e.target.value)} name='comment' type="text" placeholder="write a comment" />
        <button onClick={handleCommentSubmit} className="bg-purple-400 text-white p-2.5 cursor-pointer rounded">Send</button>
        <p className='text-red-400 text-xs text-start px-2.5'>{errorMessage && errorMessage}</p>
      </div>
      {isLoading && <LinearProgress color="secondary" />}
      {data?.map((comment, index) => (
        <div className="my-8 flex justify-between items-center gap-5" key={comment._id}>
          <img src={comment.profilePicture ? comment.profilePicture : blank_profile} alt={comment.fname} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 flex flex-col gap-1 items-start">
            <span className="font-semibold">{comment.fname + ' ' + comment.lname}</span>
            <p className="text-gray-500">{comment.comment}</p>
          </div>
          <span className=" text-gray-600 text-xs self-center font-semibold">{moment(comment.createdAt).fromNow()}</span>
          <DeleteOutlineIcon onClick={() => handleDelete(comment._id)} />
        </div>
      ))}
    </div>
  );
};

export default Comments;