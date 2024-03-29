import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "../axios";
import moment from "moment";
import Modal from "react-modal";
import { errorHandler } from "./javascripts/errorHandler";
import Comments from "./Comments";
import Swal from "sweetalert2";
/* ---------------------------- icons and images ---------------------------- */
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import blank_profile from "../assets/empty profile/blank_profile.png";
import CloseIcon from "@mui/icons-material/Close";
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35rem",
    backgroundColor: "#fffff",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
};

const Post = ({ post, profileUpdate }) => {
  const { userId, _id, key, url, description, comments, likes, createdAt } =
    post;
  const [commentOpen, setCommentOpen] = useState(false);
  const [video, setVideo] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [drop, setDrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useContext(UserContext);

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    () => {
      return Axios.put(`/post/like/${currentUser._id}`, { postId: _id })
        .then((response) => {
          profileUpdate && profileUpdate();
        })
        .catch((error) => errorHandler());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );

  useEffect(() => {
    try {
      Axios.get(`/user/get/${userId}`)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          errorHandler();
        });
    } catch (error) {
      errorHandler();
    }
    if (url) {
      const extension = key.substring(key.lastIndexOf(".") + 1);
      extension === "mp4" ? setVideo(true) : setVideo(false);
    }
  }, [key, url, userId]);

  useEffect(() => {
    setNewDescription("");
    setErrorMessage("");
  }, [edit]);

  const handleLike = () => {
    mutation.mutate();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setDrop("");
    newDescription ? setEdit(false) : setErrorMessage("No changes are made");
    if (newDescription) {
      const updatedValue = {
        userId: currentUser._id,
        newDescription: newDescription,
      };

      try {
        Axios.put(`/post/update/${_id}`, updatedValue)
          .then((response) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            profileUpdate && profileUpdate();
          })
          .catch((error) => errorHandler());
      } catch (error) {
        errorHandler();
      }
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDrop("");
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`/post/delete/${_id}`)
          .then((response) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
            profileUpdate && profileUpdate();
          })
          .catch((error) => errorHandler());
      } else return;
    });
    return;
  };

  return (
    <div className="px-5 md:px-14 mb-12">
      <div className="bg-white shadow-md p-8 rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <img
              src={
                userInfo?.profilePicture
                  ? userInfo.profilePicture
                  : blank_profile
              }
              alt={userInfo?.username}
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col">
              <Link
                to={`/profile/${userInfo._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-bold">
                  {userInfo && userInfo.fname + " " + userInfo.lname}
                </span>
              </Link>
              <span className="text-xs text-start">
                {moment(createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className="relative">
            {currentUser._id === userId && (
              <MoreHorizIcon onClick={() => setDrop(!drop)} />
            )}
            {drop && (
              <div
                id="dropdown"
                className="right-1 absolute z-1   bg-gray-600 rounded divide-y divide-gray-100 shadow"
              >
                <ul
                  className="py-1  text-sm text-white "
                  aria-labelledby="dropdownDefault"
                >
                  <li className="">
                    <button
                      onClick={() => setEdit(!edit)}
                      className="text-center align w-32 hover:bg-gray-500 py-2 "
                    >
                      Edit
                    </button>
                  </li>
                  <li className="">
                    <button
                      onClick={handleDelete}
                      className="text-center align w-32 hover:bg-gray-500  py-2 "
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="my-5">
          <p className="text-start">{description && description}</p>
          {url &&
            (video ? (
              <video
                controls
                className=" w-full h-full -z-10 mt-5"
                src={url}
              ></video>
            ) : (
              <img
                src={url}
                alt="post"
                className="w-full h-full object-cover mt-5"
              />
            ))}
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div
            className="flex items-center gap-3 cursor-pointer text-sm"
            onClick={handleLike}
          >
            {likes.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon htmlColor="#7e22ce" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {likes.length > 0 && likes.length}
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer text-sm"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            {comments.length > 0 && comments.length}
          </div>
          {/* <div className="flex items-center gap-3 cursor-pointer text-sm">
            <SendOutlinedIcon />
          </div> */}
        </div>
        {commentOpen && <Comments postId={_id} comments={comments} />}
      </div>
      <Modal
        isOpen={edit}
        onRequestClose={() => {
          setEdit(false);
        }}
        style={customStyles}
      >
        <div className="text-end">
          <CloseIcon
            onClick={() => {
              setEdit(false);
            }}
          />
        </div>
        <div className="flex flex-col justify-between  h-5/6 mb-2">
          {errorMessage && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {" "}
              {errorMessage}
            </div>
          )}
          <div className="flex mb-4">
            <img
              className="w-12 h-12 rounded-full object-cover mr-2.5"
              src={
                currentUser.profilePicture
                  ? currentUser.profilePicture
                  : blank_profile
              }
              alt="post"
            />
            <input
              placeholder={description ? description : "Write something"}
              className="border rounded-xl w-4/5 focus:outline-none p-2"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div>
            {url &&
              (video ? (
                <video className="w-full " src={url}></video>
              ) : (
                <img src={url} alt="post" />
              ))}
          </div>
          <div className="mb-2">
            <hr className="my-3" />
            <div className="flex flex-wrap  justify-between">
              <button
                onClick={handleEdit}
                className="border-none p-1.5 px-3 rounded bg-green-600 font-medium mr-5 cursor-pointer text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Post;
