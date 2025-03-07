import React ,{createContext, useState} from 'react';

export const userContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    }

    // function to remove user data
    const removeUser = () => {
        setUser(null);
    }

    return (
        <userContext.Provider value={{ 
            user, 
            updateUser, 
            removeUser 
        }}>
            {children}
        </userContext.Provider>
    )
}


export default UserProvider;
