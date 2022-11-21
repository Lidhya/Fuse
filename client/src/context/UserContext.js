import {createContext , useState} from 'react'

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
        setCurrentUser(null)
    }

    return(
        <UserContext.Provider value={{currentUser, setCurrentUser, logout, token, config}}>
            {children}
        </UserContext.Provider>
    )
}

export default User;