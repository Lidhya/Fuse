import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import Axios from '../axios'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CircularProgress from '@mui/material/CircularProgress';

const Posts = ({userId}) => {
    const {currentUser, config}=useContext(UserContext)
  const { isLoading, error, data } = useQuery(["posts"], () =>
  Axios.get(`/post/posts/${currentUser._id}`).then((res) => {
      return res.data;
    }).catch((error)=> (error.message))
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? <CircularProgress color="secondary" />
        : data.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
};

export default Posts;