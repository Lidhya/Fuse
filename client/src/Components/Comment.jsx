import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Axios from "../axios";
import blank_profile from "../assets/empty profile/blank_profile.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { errorHandler } from "./javascripts/errorHandler";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

function Comment({ postId, comment }) {
  const { currentUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    try {
      Axios.get(`/user/get/${comment.authorId}`)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          errorHandler();
        });
    } catch (error) {
      errorHandler();
    }
  }, [comment.authorId]);

  const queryClient = useQueryClient();

  const handleDelete = (commentId) => {
    Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this`,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
      }).then((result) => {
        if (result.isConfirmed) {
            try {
                Axios.put(`/comments/delete/${postId}`, { commentId: commentId })
                  .then((res) => {
                    queryClient.invalidateQueries({ queryKey: ["posts"] });
                  })
                  .catch((error) => {
                    errorHandler();
                  });
              } catch (error) {
                errorHandler();
              }
        } else return;
      });
   
  };

  return (
    <div className="my-8 flex justify-between items-center gap-5">
      <img
        src={userInfo.profilePicture ? userInfo.profilePicture : blank_profile}
        alt={userInfo.fname}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 flex flex-col gap-1 items-start">
        <span className="font-semibold">
          {userInfo.fname + " " + userInfo.lname}
        </span>
        <p className="text-gray-500">{comment.comment}</p>
      </div>
      <span className=" text-gray-600 text-xs self-center font-semibold">
        {moment(comment.createdAt).fromNow()}
      </span>
      {currentUser._id === comment.authorId && (
        <DeleteOutlineIcon onClick={() => handleDelete(comment._id)} />
      )}
    </div>
  );
}

export default Comment;
