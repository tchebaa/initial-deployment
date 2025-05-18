import {useRef, useState} from 'react'
import 'react-native-gesture-handler';
import 'expo-dev-client';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {LikeProvider} from '../context/LikedContext'
import {LocationProvider} from '../context/LocationContext'
import {NotificationProvider} from '../context/NotificationContext'
import {UserProvider} from '../context/UserContext'
import {LanguageProvider} from '../context/LanguageContext'
import {AdminProvider} from '../context/TchebaaAdminContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-get-random-values';
import {Amplify} from 'aws-amplify'
import { useRouter} from 'expo-router';
import { EventSubscription } from 'expo-notifications';
import {Linking} from 'react-native'


import outputs from '../amplify_outputs.json'

import '../i18n.config'




Amplify.configure(outputs)


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();








export default function RootLayout() {

  const colorScheme = useColorScheme();
  const notificationListener = useRef<EventSubscription>()
  const responseListener = useRef<EventSubscription>()
  const newNotification = "notification"

  

  const router = useRouter()

  /** 
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
*/
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsSemibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    Playwrite: require('../assets/fonts/PlaywriteNLGuides-Regular.ttf')

  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  /** 

  useEffect(() => {
   

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
*/

  function redirect(notification: Notifications.Notification) {
    const url = notification.request.content.data?.url;
    const notificationType = notification.request.content.data.type;
    const id = notification.request.content.data.id
    const name = notification.request.content.data.name
    const address = notification.request.content.data.address
    
    if (notificationType === 'message') {

      router.navigate({pathname: '/(tabs)/profile/chats', params: { conversationId: id, screenName: 'user'}})
      //router.push(url);
    }

    if (notificationType === 'booking') {
      router.navigate({pathname: '/(tabs)/profile/eventBookings', params: {eventId: id, eventName: name, eventAddress: address}})
      //router.push(url);
    }
  }

  useEffect(()=> {


    let isMounted = true

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                    console.log(notification);
                    //setNotification(notification)
        });


        Notifications.getLastNotificationResponseAsync()
        .then(response => {
          if (!isMounted || !response?.notification) {
            return;
          }
          redirect(response?.notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

          redirect(response.notification)

        });

        return () => {

          isMounted = false

          if(notificationListener.current) {
              Notifications.removeNotificationSubscription(notificationListener.current)
          }

          if(responseListener.current) {
              Notifications.removeNotificationSubscription(responseListener.current)
          }
    
        }

  },[])



  if (!loaded) {
    return null;
  }

  return (
    <AdminProvider>
      <LanguageProvider>
        <UserProvider>
          <LocationProvider>
            <LikeProvider>
              <NotificationProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="signUp" options={{ headerShown: false }}/>
                    <Stack.Screen name="locationScreen" options={{ headerShown: false }}/> 
                    <Stack.Screen name="confirmAccount" options={{ headerShown: false }}/> 
                    <Stack.Screen name="forgotPassword" options={{ headerShown: false }}/>   
                  </Stack>
                  <StatusBar style="auto" /> 
                </ThemeProvider>
              </NotificationProvider>
            </LikeProvider>
          </LocationProvider>
        </UserProvider>
      </LanguageProvider>
    </AdminProvider>
  );
}
