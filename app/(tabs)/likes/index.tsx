import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import EventBody from '@/components/appComponents/EventBody';
import moment from 'moment';
import {useLocation} from '../../../context/LocationContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function LikesScreen() {

    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()
    
        const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
        const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')
        const [events, setEvents] = useState([])
        const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())



    const handleGetEvents = async () => {
        
                try {
    
                    setLoadingEvents(true)
        
                    const { data, errors } = await client.queries.searchEventsWithFilter({
                           
                    startDate: startDate,
                    latitude: userLocation?.latitude,
                    longitude: userLocation?.longitude
                    
                        
                    });
    
                    setEvents(data)
                    setLoadingEvents(false)
                    
        
                } catch(e) {
    
                    setLoadingEvents(e?.message)
                    
        
                }
        
                
            }
        
    
            useEffect(()=> {
    
                handleGetEvents()
    
            },[])

    

     const renderEvents = ({item}) => {
                return(
                    <EventBody item={item} screenType="like" />
                )
            }
    


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.headerTextBody}>
                <ThemedText type='subtitle'>Let's go.</ThemedText>
            </ThemedView>
            
        <ThemedView >
            {!loadingEvents ? 
            <FlatList 
                contentContainerStyle={{paddingBottom: 150}}
                data={events}
                renderItem={renderEvents}
                keyExtractor={(item)=> item.id} 
                showsVerticalScrollIndicator={false}/>
                :
                <ThemedView><ActivityIndicator /></ThemedView>}
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
    headerTextBody: {
        width: '95%',
        marginTop: 10
    }
  
  
  
  
});
