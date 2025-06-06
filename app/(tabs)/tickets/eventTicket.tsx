import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';
import BookedTicketBody from '@/components/appComponents/BookedTicketBody';
import { useLocalSearchParams } from 'expo-router';
import EventHeader from '@/components/appComponents/EventHeader';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height






export default function EventTicketScreen() {

    const { screenType, id } = useLocalSearchParams();


    const [eventTicket, setEventTicket] = useState()
    const [loadingEventTicket, setLoadingEventTicket] = useState(true)
    const [loadingEventTicketError, setLoadingEventTicketError] = useState<string>('')


    const handleGetEventTicket = async () => {

        try {
            setLoadingEventTicketError('')
            setLoadingEventTicket(true)

            const { data, errors } = await client.models.EventTicket.get({
                id: id,
                });

                setEventTicket(data)
                setLoadingEventTicket(false)

        } catch (e) {

            setLoadingEventTicketError(e?.message)
            setLoadingEventTicket(false)

        }

        

    }


    useEffect(()=> {

        handleGetEventTicket()

    },[])


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <EventHeader item={eventTicket} screenType={screenType}/>
            <ThemedView>
                {loadingEventTicket ? <ActivityIndicator />: 
                <ThemedView>
                    {loadingEventTicketError ? 
                    <ThemedView></ThemedView>:
                    <ThemedView>
                        <ThemedView style={styles.eventDetailsComponent}>
                            <ThemedText type='subtitle'>{eventTicket.eventName}</ThemedText>
                            <ThemedText>{eventTicket.eventAddress}</ThemedText>
                        </ThemedView>
                        <BookedTicketBody item={eventTicket}/>
                    </ThemedView>}
                </ThemedView>}
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
    eventDetailsComponent: {
        width: windowWidth * 0.95,
        marginTop: 10
      },
  
  
  
  
});
