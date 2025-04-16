import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useLikes} from '../../context/LikedContext'
import {type Schema} from "../../tchebaa-backend/amplify/data/resource"
import { generateClient } from 'aws-amplify/data';
import {useUser} from '../../context/UserContext';
import { Link, router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import {useLanguage} from '../../context/LanguageContext'


const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventHeader({item, screenType}: {screenType: string | string []}) {



    const {t, currentLanguageCode} = useLanguage()
    const {likedEvents, handleGetLikedEvents, loadingLikedEvents} = useLikes()
    const {userDetails} = useUser()
    const [loadingImageError, setLoadingImageError] = useState<string>('')
    const [loadingLikeUnlikeEvent, setLoadingLikeUnlikeEvent] = useState<boolean>(false)
    const colorScheme = useColorScheme();

    

    const handleLikeEvent = async () => {

      try {

        setLoadingLikeUnlikeEvent(true)

        const likedEvent = await client.models.LikedEvent.create({
                  email: item.email,
                  eventName: item.eventName,
                  eventDescription: item.eventDescription,
                  personType: item.personType,
                  companyEmail: item.companyEmail,
                  companyName: item.companyName,
                  personName: item.personName,
                  eventMainImage: item.eventMainImage,
                  eventImage2: item.eventImage2,
                  eventImage3: item.eventImage3,
                  eventImage4: item.eventImage4,
                  dateTimePriceList: item.dateTimePriceList,
                  eventAddress: item.eventAddress,
                  ageRestriction: item.ageRestriction,
                  categories: item.categories,
                  location: item.location,
                  eventId: item.id,
                  sponsored: item.sponsored,
                  userEmail: userDetails.username
              
          });

         

          handleGetLikedEvents()

          setLoadingLikeUnlikeEvent(false)

      } catch(e) {


        setLoadingLikeUnlikeEvent(false)

      }

    }


    
    const handleUnlikeEvent = async (id: string, screenType: string | string []) => {

  

      if(screenType === 'like') {
        try {

          setLoadingLikeUnlikeEvent(true)
  
          const unLikedEvent = await client.models.LikedEvent.delete({ 
                id: id
            });
  
            handleGetLikedEvents()
            setLoadingLikeUnlikeEvent(false)
  
        } catch(e) {
  
          setLoadingLikeUnlikeEvent(false)
  
        }

      } else {

        const newItem = likedEvents.find((likedItem) => likedItem.eventId === id)

      
      

      try {

        setLoadingLikeUnlikeEvent(true)

        const unLikedEvent = await client.models.LikedEvent.delete({ 
              id: newItem.id
          });

          handleGetLikedEvents()
          setLoadingLikeUnlikeEvent(false)

      } catch(e) {

        setLoadingLikeUnlikeEvent(false)

      }
        

      }

      
    }


    return (
        <ThemedView style={styles.container}>
              <TouchableOpacity onPress={()=> router.back()}>
                <AntDesign name='arrowleft' size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>
              </TouchableOpacity>
              {screenType === 'tickets' ? <ThemedView><ThemedText>{t('tickets')}</ThemedText></ThemedView> : 
              <View>
                {loadingLikeUnlikeEvent || loadingLikedEvents ? 
                <ThemedView><ActivityIndicator/></ThemedView>
                :
                <ThemedView>
                  {screenType === 'like' ? 
                  <ThemedView><ThemedText><AntDesign name='heart' size={20} color="#ce2029"/></ThemedText></ThemedView>
                  :
                  <ThemedView>
                    {likedEvents.some((likedItem) => likedItem.eventId === item.id) ? 
                    <TouchableOpacity onPress={()=> handleUnlikeEvent(item.id, screenType)}><AntDesign name='heart' size={20} color="#ce2029"/></TouchableOpacity> : 
                    <TouchableOpacity onPress={()=> handleLikeEvent()}><AntDesign name='hearto' size={20} color={ colorScheme === 'dark' ? "white" : "black"}/></TouchableOpacity> }
                  </ThemedView>}
                </ThemedView>}
              </View>}
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: windowWidth,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  }
   
})