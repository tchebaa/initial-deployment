import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostDateTimeDuration({ageRestriction}: {ageRestriction: string []}) {

    const [eventDate, setEventDate] = useState<Date>(new Date)

    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [adultPrice, setAdultPrice] = useState<number>(0)
    const [adolescentPrice, setAdolescentPrice] = useState<number>(0)
    const [childPrice, setChildPrice] = useState<number>(0)
    const [ticketTitle, setTicketTitle] = useState<string>('')
    const [ticketNumber, setTicketNumber] = useState<number>(0)

    return (
        <ThemedView>
              
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  
   
})