import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import Axios from '../axios'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CircularProgress from '@mui/material/CircularProgress';
import { errorHandler } from './javascripts/errorHandler'


const Posts = ({ userId }) => {
  const { currentUser, config, logout } = useContext(UserContext)

  const { isLoading, error, data } = useQuery(["posts"], () =>
    Axios.get(`/post/timeline/${currentUser._id}`, config).then(({ data }) => {
      const sortedData = data.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return sortedData;
    }).catch((error) => {
      if (!error.response.data?.auth) return logout();
      errorHandler()
      return error.data
    })

  );

  return (
    <div className="posts text-center">
      {error
        ? "Something went wrong!"
        : isLoading
          ? <CircularProgress color="secondary" />
          : data.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
};

export default Posts;