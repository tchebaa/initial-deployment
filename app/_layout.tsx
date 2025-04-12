import {useRef} from 'react'
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
import {UserProvider} from '../context/UserContext'
import {LanguageProvider} from '../context/LanguageContext'
import {AdminProvider} from '../context/TchebaaAdminContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-get-random-values';
import {Amplify} from 'aws-amplify'
import { router } from 'expo-router';

import outputs from '../amplify_outputs.json'

import '../i18n.config'

Amplify.configure(outputs)

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}



export default function RootLayout() {

  const colorScheme = useColorScheme();

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

  if (!loaded) {
    return null;
  }

  return (
    <AdminProvider>
      <LanguageProvider>
        <UserProvider>
          <LocationProvider>
            <LikeProvider>
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
            </LikeProvider>
          </LocationProvider>
        </UserProvider>
      </LanguageProvider>
    </AdminProvider>
  );
}
