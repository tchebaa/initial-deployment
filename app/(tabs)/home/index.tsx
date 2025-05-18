import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';
import moment from 'moment';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {useLocation} from '../../../context/LocationContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import {useLanguage} from '../../../context/LanguageContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import {useUser} from '../../../context/UserContext'





const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }


async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        
        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }




export default function HomeScreen() {


    const colorScheme = useColorScheme();
    const {t, currentLanguageCode} = useLanguage()


    const {userDetails, pushNotificationToken, setPushNotificationToken, onlineUserDetails, setOnlineUserDetails} = useUser()
    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')
    const [events, setEvents] = useState([])
    const [startDate, setStartDate] = useState<string>(moment(new Date()).format().toString())


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );



    useEffect(()=> {
    
                registerForPushNotificationsAsync()
                .then(token => {setExpoPushToken(token ?? ''); setPushNotificationToken(token ?? ''); console.log(token ?? '', 'home')})
                .catch((error: any) => setExpoPushToken(`${error}`));
    
    
            },[])
    

    const handleGetEvents = async () => {

        try {

            setErrorLoadingEvents('')
            setLoadingEvents(true)
    
            const { data, errors } = await client.queries.searchEventsWithFilter({
                   
            startDate: startDate,
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude
                
            });

            
  
            setEvents(data)
            setLoadingEvents(false)
            

            
            
  

        } catch(e) {

            setErrorLoadingEvents(e.message)
            

        }


    }

    const handleOnlineUserAnalytics = async () => {
        try {

            const onlineUser = await client.models.OnlineUser.create({
                email: userDetails?.username,
                locationAddress: userAddress,
                location:{
                  type: "Point",
                  coordinates: [Number(userLocation?.longitude), Number(userLocation?.latitude)]
              }
            })

        
            
        } catch (e) {

        }
    }

    useEffect(()=> {
        handleOnlineUserAnalytics()
    },[])

    useEffect(()=> {

        handleGetEvents()

    },[userLocation])

    const renderSponsoredEvents = ({item}) => {
            return(
                <EventBody item={item} screenType="home" />
            )
        }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <Link href={'/(tabs)/search'} asChild style={[ colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'},styles.searchButton]}>
            
                <TouchableOpacity style={[ colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'},styles.searchButton]}>
                    <ThemedText >{t('search.events')}</ThemedText>
                    <AntDesign size={24} name="search1" color={'#1184e8'} />
                </TouchableOpacity>
            
            </Link>
            
            <ThemedView>
                {errorLoadingEvents ?

                <TouchableOpacity style={styles.errorButton} onPress={()=> handleGetEvents()}>
                    <ThemedText>{`${errorLoadingEvents}...${t('press.to.retry')}`}
                    </ThemedText>
                </TouchableOpacity>
                : null}
            </ThemedView>
            <ThemedView >
            {loadingEvents ? <ActivityIndicator/> :
            <ThemedView>
                {events.length > 0 ? 
                <FlatList 
                contentContainerStyle={{paddingBottom: 150}}
                data={events}
                renderItem={renderSponsoredEvents}
                keyExtractor={(item)=> item.id} 
                showsVerticalScrollIndicator={false}/>:
                <ThemedView>
                    <ThemedText style={styles.noEventsBody}>{t('no.events.near.you')}</ThemedText>
                    <TouchableOpacity style={styles.errorButton} onPress={()=> handleGetEvents()}>
                        <ThemedText>{t('press.to.retry')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>}
            </ThemedView>
            }
            </ThemedView>
        </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? 20 : 0,
        marginTop:10,
        width: windowWidth,
        
        
    },
    body: {
        width: windowWidth,
        padding: 5,
        height: '100%',
        alignItems: 'center',
        
    },
    searchButton: {
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '90%',
        borderRadius: 20,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    errorButton: {
        marginVertical: 5
    },
    noEventsBody: {
        marginVertical: 10
    },
    filterModal: {
        position: 'absolute',
        zIndex: 20
    },
    
  
  
  
  
});
