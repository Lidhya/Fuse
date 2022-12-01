import {createContext , useState} from 'react'
import Axios from '../axios'

export const UserContext= createContext()

function User({children})
{
    const user = JSON.parse(localStorage.getItem('user'))||null;
    const token = JSON.parse(localStorage.getItem('token'))||null;
    const [currentUser, setCurrentUser]=useState(user)

    const config = {
        headers: { Authorization: `Bearer ${token}` },      
    };    
    
    const logout=()=>{      
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setCurrentUser('')
        window.location.reload()
 }

    const updateCurrentUser=()=>{
        Axios.get(`/user/get/${currentUser._id}`, config).then(({data})=>{
            localStorage.setItem('user', JSON.stringify(data))
            setCurrentUser(data)
        }).catch((error)=>console.log(error))
    }

    return(
        <UserContext.Provider value={{currentUser, setCurrentUser, logout, token, config, updateCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default User;