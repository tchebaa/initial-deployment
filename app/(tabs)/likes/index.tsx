import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, ActivityIndicator, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import EventBody from '@/components/appComponents/EventBody';
import {useLikes} from "../../../context/LikedContext"
import moment from 'moment';
import {useLocation} from '../../../context/LocationContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import {useLanguage} from '../../../context/LanguageContext'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function LikesScreen() {



    const {t} = useLanguage()
    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()
    const {likedEvents, loadingLikedEvents} = useLikes()


    interface IEvent {
    eventName?: string;
    eventDescription?: string;
    id?: string;
    email?:string;
    userEmail?: string;
    eventId?:string;
    personType?: boolean;
    companyEmail?: string;
    companyName?:string;
    personName?: string;
    sponsored?: boolean;
    eventMainImage?:{ aspectRatio?: string; url?: string};
    eventImage2?:{ aspectRatio?: string; url?: string};
    eventImage3?:{ aspectRatio?: string; url?: string};
    eventImage4?:{ aspectRatio?: string; url?: string};
    dateTimePriceList?: { 
      eventDate?: string;
      eventDays?:number;
      eventHours?:number;
      eventMinutes?:number;
      eventEndDate?:string;
      ticketPriceArray?: {ticketNumber: number; ticketTitle: string; adultPrice: number; adolescentPrice: number; childPrice: number }[] | []

    }[] | [];
    ageRestriction?:string[] | [];
    location?: {type?:string;
      coordinates?: number [];

    };
    eventAddress?:string;
    categories?: string[];
   
  }
  

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

  interface BaseEvent {

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

interface Event extends BaseEvent {
  // Event-specific fields
}

interface LikedEvent extends BaseEvent {
  eventId: string; // LikedEvent-specific field
}
  

    

     const renderEvents = ({item}: {item: Event | LikedEvent | IEvent}) => {
                return(
                    <EventBody item={item} screenType="like" />
                )
            }
    


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.headerTextBody}>
                <ThemedText type='subtitle'>{t('lets.go')}</ThemedText>
            </ThemedView>
            
        <ThemedView >
            {!loadingLikedEvents ? 
            <View>
            {likedEvents!.length > 0 ?
            <FlatList 
                contentContainerStyle={{paddingBottom: 150}}
                data={likedEvents}
                renderItem={renderEvents}
                keyExtractor={(item, index) => item.id ? item.id : index.toString()} 
                showsVerticalScrollIndicator={false}/>
                :
                <ThemedView><ThemedText>{t('no.events.found')}</ThemedText></ThemedView>}
            </View>
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
