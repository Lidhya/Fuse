import React, { useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import blank_profile from "../assets/empty profile/blank_profile.png";
import { UserContext } from '../context/UserContext';
import { errorHandler } from './javascripts/errorHandler';
import { Link } from 'react-router-dom';
import Axios from "../axios";


function Suggestion({user}) {
  const queryClient = useQueryClient();
  const { currentUser, updateCurrentUser } = useContext(UserContext);


    const handleFollow = (userId) => {
        try {
          Axios.put(`/user/follow-unfollow/${userId}`, {
            currentUser: currentUser._id,
          })
            .then(({ data }) => {
              updateCurrentUser();
              queryClient.invalidateQueries({ queryKey: ["suggestions"] });
            })
            .catch((error) => errorHandler());
        } catch (error) {
          errorHandler();
        }
      };

  return (
    <li key={user?._id}>
    <div className="flex gap-1 items-center flex-wrap justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
      <div className="flex items-center justify-start">
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : blank_profile
          }
          alt={user?.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link to={`/profile/${user?._id}`}>
          {" "}
          <span className="flex-1 ml-3 whitespace-nowrap">
            {user?.fname + " " + user?.lname}
          </span>
        </Link>
      </div>
      <button
        onClick={() => handleFollow(user?._id)}
        className="m-1 border border-white text-sm p-1 rounded-md  hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Follow
      </button>
    </div>
  </li>
  )
}

export default Suggestion