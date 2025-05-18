import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';

import { useLocalSearchParams } from 'expo-router';
import EventHeader from '@/components/appComponents/EventHeader';
import EventScreenBody from '@/components/appComponents/EventScreenBody';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import {useUser} from '../../../context/UserContext'
import {useLocation} from '../../../context/LocationContext'

const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height





export default function EventScreen() {

    type SearchParamType = {
        id: number;
        description: string;
        age: number;
        name: string;
      };

    const { screenType, id } = useLocalSearchParams();
    const {userDetails} = useUser()
    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    

    const [event, setEvent] = useState()
    const [loadingEvent, setLoadingEvent] = useState(true)
    const [loadingEventError, setLoadingEventError] = useState<string>('')
    
    
        const handleGetEvent = async () => {
    
            try {

                setLoadingEvent(true)
    
                const { data, errors } = await client.models.Event.get({
                    id: id,
                  });

                  setEvent(data)
                  setLoadingEvent(false)
                  
    
            } catch (e) {

                setLoadingEventError(e?.message)
    
            }
    
            
    
        }

        const handleUserEventViewed = async () => {

            try {

                const eventViewed = await client.models.EventViewed.create({
                    email: userDetails?.username,
                    eventId: id,
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

            handleGetEvent()
            handleUserEventViewed()

        },[])


  return (
    <SafeAreaView style={styles.container}>
        
       {!loadingEvent ? 
        <ThemedView style={styles.body}>
            <EventHeader item={event} screenType={screenType}/>
            <EventScreenBody item={event} screenType={screenType}/>
        </ThemedView>: 
        <ThemedView  style={styles.body}>
            <ActivityIndicator/>
        </ThemedView>}
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
    }
  
  
  
  
});
