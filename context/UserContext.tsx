
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();



interface IUserContextValue {
    userDetails?:{username: string , userId: string} | null
    pushNotificationToken?: string | null
    onlineUserDetails?: {email: string, postLimit: number, pushNotificationToken: string, name: string} | null
    setPushNotificationToken?: (data: string | null) => void
    setOnlineUserDetails?: (data: {email: string, postLimit: number, pushNotificationToken: string, name: string} | null) => void
    setUserDetails:(data:{username: string, userId: string} | null) => void
  
}


const initialUser: IUserContextValue = {
    userDetails: null,
    onlineUserDetails: null,
    pushNotificationToken: null,
    setPushNotificationToken: (data) => {},
    setOnlineUserDetails: (data) => {},
    setUserDetails: (data) => {}  
    
  }



const UserContext = createContext<IUserContextValue>(initialUser);

   

export function useUser () {
    return (useContext(UserContext))
}

type ChildrenProps = { children?: ReactNode };


export function UserProvider({children}: ChildrenProps) {

    const [userDetails, setUserDetails] = useState<{username: string, userId: string} | null >(null)
    const [onlineUserDetails, setOnlineUserDetails] = useState<{email: string, postLimit: number, pushNotificationToken: string, name: string} | null>(null)
    const [loadingUserDetails, setLoadingUserDetails]= useState<boolean>(false)
    const [pushNotificationToken, setPushNotificationToken] = useState<string | null>(null)

    const handleDisableNotification = () => {

    }

    const handleEnableNotification = () => {
      
    }

    useEffect(()=> {

      if(userDetails) {

        try{

        } catch(e) {

        }

      }

    },[userDetails])


  return(
    <UserContext.Provider value={{userDetails, setUserDetails}} >{children}</UserContext.Provider>
  )

}