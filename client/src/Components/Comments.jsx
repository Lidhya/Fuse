import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Axios from "../axios";
import { errorHandler } from "./javascripts/errorHandler";
/* ---------------------------------- icons --------------------------------- */
import blank_profile from "../assets/empty profile/blank_profile.png";
import Comment from "./Comment";

const Comments = ({ postId, comments }) => {
  const { currentUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { _id, fname, profilePicture } = currentUser;

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (commentData) => {
      return Axios.post(`/comments/${postId}`, commentData)
        .then((response) => { })
        .catch((error) => errorHandler());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    }
  );

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      authorId: _id,
      comment: newComment,
    };
    if (!newComment) return setErrorMessage("comment is required");
    mutation.mutate(comment);
    setErrorMessage("");
    setNewComment("");
  };

  return (
    <div className="comments">
      <div className="flex items-center flex-wrap justify-between gap-5 my-5">
        <img
          src={profilePicture ? profilePicture : blank_profile}
          alt={fname}
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          className="flex-1 p-2.5 border-2 border-solid border-gray-300 rounded-md focus:outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          name="comment"
          type="text"
          placeholder="write a comment"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-purple-400 text-white p-2.5 cursor-pointer rounded"
        >
          Send
        </button>
        <p className="text-red-400 text-xs text-start px-2.5">
          {errorMessage && errorMessage}
        </p>
      </div>
      {comments?.map((comment) => (
        <Comment key={comment._id} postId={postId} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
