import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EventScreenBody from './EventScreenBody';

import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  



export default function PostEventPreview({newScreenName, eventData}: {newScreenName: string | string [], eventData: IEvent}) {

    


    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <EventScreenBody item={eventData} screenType={newScreenName} />
            </ScrollView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
        alignItems: 'center',
        marginTop:5
    },
    mainImage:{
        width: windowWidth * 0.95,
        height: 200,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    imagePickerA: {
        width: windowWidth * 0.95,
        height: 200,
        borderWidth: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10,
        borderRadius: 10
    },
    eventImageRatioB: {
        width: 180,
        height: 180,
        position: 'absolute',
        marginTop: 10
      },
      eventImageRatioC: {
        width: 120,
        height: 180,
        position: 'absolute',
        marginTop: 10
      },
      aspectRatioModal: {
        borderWidth: 1,
        borderColor: 'gray',
        position: 'absolute',
        marginTop: 100,
        zIndex: 20,
        padding: 5,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center'
        
      },
      aspectRatioB: {
        width: 100,
        height: 100,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      aspectRatioA: {
        width: 200,
        height: 110,
        borderWidth: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
      aspectRatioC: {
        width: 120,
        height: 180,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      closeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        position: 'absolute',
        top: 10
      },
      imageDetailsText: {
        color: 'gray'
      }
   
})