
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';



interface IUserContextValue {
    userDetails?:{username: string , userId: string} | null
    setUserDetails:(data:{username: string, userId: string} | null) => void
  
}


const initialUser: IUserContextValue = {
    userDetails: null,
    setUserDetails: (data) => {}  
    
  }



const UserContext = createContext<IUserContextValue>(initialUser);

   

export function useUser () {
    return (useContext(UserContext))
}

type ChildrenProps = { children?: ReactNode };


export function UserProvider({children}: ChildrenProps) {

    const [userDetails, setUserDetails] = useState<{username: string, userId: string} | null >(null)


  return(
    <UserContext.Provider value={{userDetails, setUserDetails}} >{children}</UserContext.Provider>
  )

}