
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import {Linking} from 'react-native'
import {useUser} from './UserContext'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { EventSubscription } from 'expo-notifications';
import { Link, useRouter } from 'expo-router';






interface INotificationContextValue {
    expoPushToken: string | null
    notification: Notifications.Notification | null
    error: Error | null
    setNotification?: (data: Notifications.Notification | null) => void
  
}





const NotificationContext = createContext<INotificationContextValue | undefined>(undefined);

   

export function useNotification () {
    return (useContext(NotificationContext))
}

type ChildrenProps = { children?: ReactNode };


export function NotificationProvider({children}: ChildrenProps) {

    const router = useRouter()

    const {userDetails, pushNotificationToken} = useUser()
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
    const [notification, setNotification] = useState<Notifications.Notification | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const notificationListener = useRef<EventSubscription>()
    const responseListener = useRef<EventSubscription>()


    useEffect(()=> {

        if(pushNotificationToken) {
            setExpoPushToken(pushNotificationToken)
        }

        /** 

          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                console.log(notification);
                setNotification(notification)
          });

          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

            const url = response.notification.request.content.data.url;
            const notificationType = response.notification.request.content.data.type;
            const id = response.notification.request.content.data.id
            const name = response.notification.request.content.data.name
            const address = response.notification.request.content.data.address

            if(notificationType === 'message') {

                router.navigate('/(tabs)/profile/chats', { conversationId: id, screenName: 'user',})

            }

            if(notificationType === 'booking') {
                router.navigate('/(tabs)/profile/eventBookings', {eventId: id, eventName: name, eventAddress: address})
            }

          });

          return () => {
            if(notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current)
            }

            if(responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current)
            }

          }
            */
    },[])





  return(
    <NotificationContext.Provider value={{expoPushToken, notification, error, setNotification}} >{children}</NotificationContext.Provider>
  )

}