import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import blank_profile from "../assets/empty profile/blank_profile.png"
import Axios from '../axios'
import Conversations from './Conversations';
import { errorHandler } from './javascripts/errorHandler'
import CircularProgress from '@mui/material/CircularProgress';



function RightBar() {
   const { currentUser, config, logout, updateCurrentUser } = useContext(UserContext)
   const [suggestions, setSuggestion] = useState([])
   const [conversations, setConversations] = useState([]);
   const queryClient = useQueryClient()

   const { isLoading } = useQuery(["suggestions"], () => {
      return Axios.get(`/user/suggestions/${currentUser._id}`, config).then(({ data }) => {
         const slicedData = data.slice(0, 5)
         setSuggestion(slicedData)
         return slicedData;
      }).catch(({ response }) => {
         if (!response?.data?.auth) return logout();
         errorHandler()
      })
   }
   );

   useEffect(() => {
      try {
         Axios.get(`/conversations/${currentUser?._id}`, config)
            .then(({ data }) => {
               setConversations(data);
            }).catch((error) => errorHandler())
      } catch (err) { errorHandler() }
   }, [currentUser._id]);


   const handleFollow = (userId) => {
      Axios.put(`/user/follow-unfollow/${userId}`, { currentUser: currentUser._id }, config)
         .then(({ data }) => {
            console.log(data);
            updateCurrentUser()
            queryClient.invalidateQueries({ queryKey: ["suggestions"] })
         }).catch((error) => errorHandler())
   }

   return (
      <aside className="fixed w-1/5 " aria-label="Sidebar">
         <div className="overflow-y-auto py-4 px-3  rounded-lg shadow-md bg-gray-900">
            {isLoading && <CircularProgress color="secondary" />}
            {suggestions.length > 0 && <ul className="space-y-2 ">
               <li>
                  <p className=" items-center  p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                     <span className="font-semibold">Suggestions for you</span>
                  </p>
               </li>
               {suggestions && suggestions.map((user) => (
                  <li key={user?._id}>
                     <div className="flex gap-1 items-center flex-wrap justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                        <div className='flex items-center justify-start'>
                           <img src={user?.profilePicture ? user.profilePicture : blank_profile} alt={user?.username} className="w-10 h-10 rounded-full object-cover" />
                           <Link to={`/profile/${user?._id}`}> <span className="flex-1 ml-3 whitespace-nowrap">{user?.fname + ' ' + user?.lname}</span></Link>
                        </div>
                        <button onClick={() => handleFollow(user?._id)} className='m-1 border border-white text-sm p-1 rounded-md  hover:bg-gray-100 dark:hover:bg-gray-700'>Follow</button>
                     </div>
                  </li>
               ))}
            </ul>}
            <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
               <li>
                  <p className="flex items-center  p-2 text-base font-normal text-white">
                     <span className=" font-semibold">Messages</span>
                  </p>
               </li>
               <li className='overflow-y-scroll over max-h-60'>
                  {conversations && conversations.map((convo) => (
                     <Link to={'/messenger'} key={convo._id} className='dark:hover:bg-gray-700 dark:text-white group'>
                        <Conversations conversation={convo} />
                     </Link>
                  ))}</li>
            </ul>
         </div>
      </aside>

   )
}

export default RightBar