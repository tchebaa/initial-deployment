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

const client = generateClient<Schema>();




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function EventScreen() {

        type Nullable<T> = T | null;

      interface TicketPrice {
    adultPrice: number;
    adolescentPrice: number;
    childPrice: number;
    ticketTitle: string;
    ticketNumber: number;
  }
  
  interface DateTimePrice {
    eventDate: string;
    eventDays: number;
    eventHours: number;
    eventMinutes: number;
    eventEndDate: string;
    ticketPriceArray: TicketPrice[];
  }
  
   interface EventImage {
    aspectRatio: string;
    url: string;
  }
  
  interface Location {
    type: string;
    coordinates: number[];
  }
  
interface Event {
    id: string;
    eventName: string;
    eventDescription: string;
    email: string;
    site: boolean;
    personType: boolean;
    companyEmail: string;
    companyName: string;
    personName: string;
    sponsored: boolean;
    eventMainImage: EventImage;
    eventImage2: EventImage;
    eventImage3: EventImage;
    eventImage4: EventImage;
    dateTimePriceList: DateTimePrice[];
    ageRestriction: string[];
    categories: string[];
    eventAddress: string;
    location: Location;
  }


    type SearchParamType = {
        id: number;
        description: string;
        age: number;
        name: string;
      };


    const { screenType, id } = useLocalSearchParams();

    const [event, setEvent] = useState<Event | null>(null)
    const [loadingEvent, setLoadingEvent] = useState(true)
    const [loadingEventError, setLoadingEventError] = useState<string>('')
        
        
            const handleGetEvent = async () => {
        
                    
            try {

                function sanitizeTicketArray(arr: Nullable<{
                    adultPrice: Nullable<number>;
                    adolescentPrice: Nullable<number>;
                    childPrice: Nullable<number>;
                    ticketTitle: Nullable<string>;
                    ticketNumber: Nullable<number>;
                    }>[] | null | undefined) {
                    return (arr ?? [])
                        .filter((ticket): ticket is {
                        adultPrice: number;
                        adolescentPrice: number;
                        childPrice: number;
                        ticketTitle: string;
                        ticketNumber: number;
                        } =>
                        ticket !== null &&
                        ticket.ticketNumber !== null &&
                        ticket.ticketTitle !== null &&
                        ticket.adultPrice !== null &&
                        ticket.adolescentPrice !== null &&
                        ticket.childPrice !== null
                        );
                    }

                setLoadingEvent(true)


                if(id) {

                    const { data, errors } = await client.models.Event.get({
                    id: Array.isArray(id) ? id[0] : id,
                  });

                  if(data) {


                    setEvent({
                    id: data.id,
                    eventName: data.eventName ?? "",
                    eventDescription: data.eventDescription ?? "",
                    email: data.email ?? "",
                    personType: data.personType ?? false,
                    site: data.site ?? false,
                    companyEmail: data.companyEmail ?? "",
                    companyName: data.companyName ?? "",
                    personName: data.personName ?? "",
                    eventMainImage: {
                       
                        aspectRatio: data.eventMainImage?.aspectRatio ?? "",
                        url: data.eventMainImage?.url ?? "",
                    },
                    eventImage2: {
                       
                        aspectRatio: data.eventImage2?.aspectRatio ?? "",
                        url: data.eventImage2?.url ?? "",
                    },
                    eventImage3: {
                       
                        aspectRatio: data.eventImage3?.aspectRatio ?? "",
                        url: data.eventImage3?.url ?? "",
                    },
                    eventImage4: {
                       
                        aspectRatio: data.eventImage4?.aspectRatio ?? "",
                        url: data.eventImage4?.url ?? "",
                    },
                    dateTimePriceList: (data.dateTimePriceList ?? [])
                        .filter((dt): dt is NonNullable<typeof dt> => dt !== null)
                        .map(dt => ({
                        eventDate: dt.eventDate ?? '',
                        eventDays: dt.eventDays ?? 0,
                        eventHours: dt.eventHours ?? 0,
                        eventMinutes: dt.eventMinutes ?? 0,
                        eventEndDate: dt.eventEndDate ?? '',
                        ticketPriceArray: sanitizeTicketArray(dt?.ticketPriceArray),
                        })),
                    eventAddress: data.eventAddress ?? "",
                    ageRestriction: (data.ageRestriction ?? []).filter(
                        (age): age is string => age !== null
                    ),
                    location: data.location && data.location.type && Array.isArray(data.location.coordinates)
                    ? {
                        type: data.location.type ?? 'Point',
                        coordinates: data.location.coordinates.filter((c): c is number => c !== null)
                        }
                    : {
                        type: 'Point',
                        coordinates: [0, 0]
                        },
                    categories: (data.categories ?? []).filter((c): c is string => c !== null),
                    sponsored: data.sponsored ?? false,
                   
                });
                  setLoadingEvent(false)

                  }

                }
    
                


                  

                  
    
            } catch (e) {

                 const error = e as Error;

                setLoadingEventError(error.message)
    
            }
                
        
            }
    
            useEffect(()=> {
    
                handleGetEvent()
    
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
