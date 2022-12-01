import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { UserContext } from './UserContext'


export const SocketContext = createContext()

function Socket({ children }) {
    // const user = JSON.parse(localStorage.getItem('user'))||null;
    let socketConnection=null
    const [socket, setSocket] = useState(socketConnection)
    const { currentUser } = useContext(UserContext)
    const [onlineUsers, setOnlineUsers] = useState([])


    useEffect(() => {
        if (currentUser?.fname) {
            socketConnection= io("ws://localhost:8000")
            setSocket(socketConnection)
            socketConnection?.emit("addUser", currentUser._id);
            socketConnection?.on("getUsers", (users) => {
                setOnlineUsers(
                    currentUser.followings?.filter((f) => users.some((u) => u.userId === f))
                );
            });
        }else{
            socketConnection=null
            setSocket('')
        }
    }, [currentUser]);


    return (
        <SocketContext.Provider value={{ socket, setSocket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket