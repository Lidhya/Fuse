import React, { useContext, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../context/UserContext'
import no_notifications from "../assets/error/Notify-amico.png"
import Axios from '../axios'
import Notification from './Notification'
import { errorHandler } from './javascripts/errorHandler'


function Notifications() {
    const { config, currentUser } = useContext(UserContext)
    const [notifications, setNotifications] = useState([])

    const queryClient = useQueryClient()

    const getNotifications = () => {
        Axios.get(`/notifications/${currentUser._id}`, config)
            .then((response) => {
                const sortedData = response.data.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setNotifications(sortedData)
                return sortedData;
            }).catch((error) => errorHandler())
    }

    useEffect(() => {
        getNotifications()
        const updateStatus = () => {
            try {
                Axios.put(`/notifications/${currentUser._id}`, { isVisited: true }, config)
                    .then((response) => {
                        console.log(response);
                        queryClient.invalidateQueries({ queryKey: ['notifications'] })
                    }).catch((error) => errorHandler())
            } catch (error) {
                errorHandler()
            }
        }
        updateStatus()

    }, [])


    return (
        <div className=' md:px-14  my-3 w-96 md:w-full'>
            <h1 className='text-2xl  text-purple-700 font-thin mb-3'>Notifications</h1>
            {notifications.length > 0 ? notifications.map((notification, index) => (
                <Notification key={index} notification={notification} />
            ))
                : <div className='flex flex-col justify-center gap-2 items-center h-full'>
                    <span className="text-xl text-gray-400">
                        There are no notifications yet.
                    </span>
                    <img src={no_notifications} className='h-60 w-60' alt="No notifications" />
                </div>
            }

        </div>

    )
}

export default Notifications