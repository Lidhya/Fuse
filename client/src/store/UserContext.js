import {createContext , useState} from 'react'

export const UserContext= createContext()

function User({children})
{
    const user = JSON.parse(localStorage.getItem('user'));
    const [currentUser, setCurrentUser]=useState(user)

    return(
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default User;