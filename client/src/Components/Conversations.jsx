import React, { useContext, useEffect, useState } from 'react'
import blank_profile from "../assets/empty profile/blank_profile.png"
import { UserContext } from '../context/UserContext';
import Axios from '../axios'
import { errorHandler } from './javascripts/errorHandler'
import { SocketContext } from '../context/SocketContext';


function Conversations({ conversation, setCurrentChat }) {
    const [user, setUser] = useState(null);
    const { currentUser, config } = useContext(UserContext)
    const { onlineUsers} = useContext(SocketContext)
    
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id); 
        const getUser = async () => {
          try {
           Axios.get(`/user/get/${friendId}`, config)
           .then(({data})=>{
               setUser(data);
           })
               .catch((error) => errorHandler())
          } catch (err) {
            errorHandler()
          }
        };
        getUser();
      }, [currentUser, conversation]);

    return (
        <>
            <div key={user?._id} className='m-2 p-2  rounded-lg hover:bg-gray-700 '>
                <div className="flex items-center ">
                    <div className="inline-block relative shrink-0">
                        <img className="w-12 h-12 rounded-full" src={user?.profilePicture? user.profilePicture : blank_profile} alt="user" />
                       {onlineUsers?.includes(user?._id)? 
                       <span className='absolute  right-0 top-0 h-3 w-3 bg-green-500 border border-green-900 rounded-full'> </span>
                        :<span className="inline-flex absolute right-0 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full">
                            <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Message icon</span>
                        </span>}
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        <div className="text-sm font-semibold text-white ">{user?.fname+" "+user?.lname}</div>
                        {/* <div className="text-sm font-normal text-white">Hey how are you?</div>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-500">1 min ago</span> */}
                    </div>
                    {/* <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">2</span> */}
                </div>
            </div>
        </>
    )
}

export default Conversations