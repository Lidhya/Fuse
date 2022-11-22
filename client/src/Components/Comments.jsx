import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
import User_1 from "../assets/Users/Profile-Pic-S.png"
import { UserContext } from "../context/UserContext";



const Comments = ({postId}) => {
   const { currentUser } = useContext(UserContext);

   const {isLoading, error, data}=useQuery(['comments'], ()=>{

   })
   
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="comments">
      <div className="flex items-center justify-between gap-5 my-5">
        <img src={User_1} alt="" className="w-10 h-10 rounded-full object-cover" />
        <input className="flex-1 p-2.5 border-2 border-solid border-gray-300 rounded-md focus:outline-none" type="text" placeholder="write a comment" />
        <button className="bg-blue-400 text-white p-2.5 cursor-pointer rounded">Send</button>
      </div>
      {comments.map((comment) => (
        <div className="my-8 flex justify-between gap-5">
          <img src={comment.profilePicture} alt="" className="w-10 h-10 rounded-full object-cover"/>
          <div className="flex-1 flex flex-col gap-1 items-start">
            <span className="font-semibold">{comment.name}</span>
            <p className="text-gray-500">{comment.desc}</p>
          </div>
          <span className=" text-gray-600 text-xs self-center font-semibold">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;