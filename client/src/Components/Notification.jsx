import React, { useEffect, useState } from "react";
import moment from "moment";
import blank_profile from "../assets/empty profile/blank_profile.png";
import Axios from "../axios";
import { Link } from "react-router-dom";
import { errorHandler } from "./javascripts/errorHandler";

function Notification({ notification }) {
  const { emiterId, text, createdAt } = notification;
  // const { config } = useContext(UserContext)
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`/user/get/${emiterId}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        errorHandler();
      });
  }, [emiterId]);

  return (
    <div className="w-full h-full bg-white my-3 rounded-xl shadow-md border-gray-100  border-2">
      <div className=" flex flex-wrap justify-between items-center p-2.5">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full object-cover mr-2.5"
            src={user?.profilePicture ? user.profilePicture : blank_profile}
            alt={user?.username}
          />
          <Link to={`/profile/${user?._id}`} className="font-semibold">
            {user?.fname + " " + user?.lname}{" "}
            <span className="font-medium"> {text}</span>
          </Link>
        </div>
        <span className="text-xs ">{moment(createdAt).fromNow()}</span>
      </div>
    </div>
  );
}

export default Notification;
