import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import EventTicketBody from '@/components/appComponents/EventTicketBody';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {useUser} from '../../../context/UserContext'

const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function TicketsScreen() {


    const {userDetails} = useUser()

    const [events, setEvents] = useState([])
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [loadingEventsError, setLoadingEventsError] = useState<string>('')


    const handleGetBookedEvents = async () => {

        try {

            setLoadingEvents(true)
            setLoadingEventsError('')
      
            const { data, errors } = await client.models.EventTicket.list({
      
              filter: {
                userEmail: {
                  beginsWith: userDetails?.username
                }
              }
            });
      
            setEvents(data)
            
      
            setLoadingEvents(false)
      
          } catch(e) {
      
            setLoadingEventsError(e?.message)
            setLoadingEvents(false)
      
          }

    }


    useEffect(()=> {

        handleGetBookedEvents()

    },[])

    const renderEvents = ({item}) => {
                return(
                    <EventTicketBody item={item} screenType="tickets" />
                )
            }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.headerTextBody}>
                <ThemedText type='subtitle'>I'm going!</ThemedText>
            </ThemedView>
            {loadingEvents ? 
            <ThemedView>
                <ActivityIndicator />
            </ThemedView>
            :<ThemedView >
                {events.length > 0 ? 
                <FlatList 
                    contentContainerStyle={{paddingBottom: 150}}
                    data={events}
                    renderItem={renderEvents}
                    keyExtractor={(item)=> item.id} 
                    showsVerticalScrollIndicator={false}/>
                    :
                    <ThemedView>
                        <ThemedText>No booked events</ThemedText>
                    </ThemedView>}
            </ThemedView>}
            {loadingEventsError ? <ThemedView><ThemedText>{loadingEventsError}</ThemedText></ThemedView>: null}
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
        marginTop: 10,
        marginBottom: 5
    }
  
  
  
  
});
