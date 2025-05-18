
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();



interface IUserContextValue {
    userDetails?:{username: string , userId: string} | null
    pushNotificationToken?: string | null | undefined
    loadingOnlineUserDetails: boolean
    changedStatus: boolean
    setChangedStatus?: (data: boolean) => void
    onlineUserDetails?: {email: string, postEventLimit: number, pushNotificationToken: string, name: string, id: string, pushNotificationEnabled: boolean} | null
    setPushNotificationToken?: (data: string | null | undefined) => void
    setOnlineUserDetails?: (data: {email: string, postLimit: number, pushNotificationToken: string, name: string} | null) => void
    setUserDetails:(data:{username: string, userId: string} | null) => void
  
}


const initialUser: IUserContextValue = {
    userDetails: null,
    onlineUserDetails: null,
    loadingOnlineUserDetails: true,
    pushNotificationToken: null,
    changedStatus: false,
    setChangedStatus: (data) => {},
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
    const [onlineUserDetails, setOnlineUserDetails] = useState<{email: string, postEventLimit: number, pushNotificationToken: string, name: string, id:string, pushNotificationEnabled: boolean} | null>(null)
    const [loadingOnlineUserDetails, setLoadingOnlineUserDetails]= useState<boolean>(false)
    const [loadingOnlineUserDetailsError, setLoadingOnlineUserDetailsError]= useState<boolean>(false)
    const [pushNotificationToken, setPushNotificationToken] = useState<string | null | undefined>(null)
    const [changedStatus, setChangedStatus] = useState<boolean>(false)

  

  


    const handleGetOnlineUser = async () => {

      setLoadingOnlineUserDetails(true)

        try{

          setLoadingOnlineUserDetailsError(false)

          const { data, errors } = await client.models.User.list({

            filter: {
              email: {
                beginsWith: userDetails?.username
              }
            }
          });

          if (data[0]) {
            const sanitizedUser = {
                email: data[0].email ?? "", // default to empty string
                postEventLimit: data[0].postEventLimit ?? 0, // default to 0
                pushNotificationToken: data[0].pushNotificationToken ?? "",
                name: data[0].name ?? "",
                id: data[0].id,
                pushNotificationEnabled: data[0].pushNotificationEnabled ?? false,
                createdAt: data[0].createdAt,
                updatedAt: data[0].updatedAt
            };

            setOnlineUserDetails(sanitizedUser);
            setLoadingOnlineUserDetails(false)


            }


        } catch(e) {
          setLoadingOnlineUserDetailsError(true)

        }
      
    }


    const handleUpdatePushNotification = async () => {

      try{

        if(onlineUserDetails?.id){
            
            const { data, errors } = await client.models.User.update({
          id: onlineUserDetails.id,
          pushNotificationToken: pushNotificationToken
        });
      }

      } catch {

      }

    }


    useEffect(()=> {

      if(userDetails) {
        
        handleGetOnlineUser()

      } else {
        setLoadingOnlineUserDetails(false)
        setLoadingOnlineUserDetailsError(false)
      }

    },[userDetails, pushNotificationToken, changedStatus])


    useEffect(()=> {

      if(onlineUserDetails && pushNotificationToken) {

        handleUpdatePushNotification()

      }

    },[pushNotificationToken, onlineUserDetails])


  return(
    <UserContext.Provider value={{userDetails, setUserDetails, pushNotificationToken, setPushNotificationToken, loadingOnlineUserDetails, onlineUserDetails, changedStatus, setChangedStatus}} >{children}</UserContext.Provider>
  )

}