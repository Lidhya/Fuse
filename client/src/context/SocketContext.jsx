import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from './UserContext'
import socketio from "socket.io-client";


export const SocketContext = createContext()

function Socket({ children }) {
    const socketConnection=useRef(null)
    socketConnection.current= socketio.connect("ws://localhost:8000");
    const { currentUser } = useContext(UserContext)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(socketConnection.current)

    useEffect(() => {
        if (currentUser?.fname) {
            socket.emit("addUser", currentUser._id);
            socket.on("getUsers", (users) => {
                setOnlineUsers(
                    currentUser.followings?.filter((f) => users.some((u) => u.userId === f))
                );
            });
        }else{
            socketConnection.current=null
        }
    }, [currentUser]);

    return (
        <SocketContext.Provider value={ { socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket