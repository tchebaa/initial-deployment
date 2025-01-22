import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useLikes} from '../../context/LikedContext';
import {useUser} from '../../context/UserContext';
import {type Schema} from "../../tchebaa-backend/amplify/data/resource"
import { generateClient } from 'aws-amplify/data';
import { Link } from 'expo-router';


const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventManageBody({item, screenType}: {screenType: string}) {


    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [loadingImageError, setLoadingImageError] = useState<string>('')
    const [mainImageUrl, setMainImageUrl] = useState<string>('')
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [eventName, setEventName] = useState<string>('')
    const [eventId, setEventId] = useState<string>('')
    const [eventAddress, setEventAddress] = useState<string>('')
    

    



    const handleGetImageUrl = async () => {

      try {

        setLoadingImage(true)

        const linkToStorageFile = await getUrl({
          path: item.eventMainImage.url,
          options: {
            useAccelerateEndpoint: true
          }
      })

      setMainImageUrl(linkToStorageFile.url.toString())

      setLoadingImage(false)

      } catch(e) {

      }

      
   

    }

    useEffect(()=> {
      

      handleGetImageUrl()
      

      
    },[])


    const handleOpenDeleteModal = (eventName: string, eventId: string, eventAddress: string) => {


        setEventName(eventName)
        setEventId(eventId)
        setEventAddress(eventAddress)
        setDeleteModal(true)



    }



    return (
        <ThemedView style={styles.body}>
              {deleteModal ? 
                <ThemedView style={styles.signOutModal}>
                    <ThemedText>Are you sure you want to delete this event?</ThemedText>
                    <ThemedText>{eventName}</ThemedText>
                    <ThemedText>{eventAddress}</ThemedText>
                    <ThemedText>{eventId}</ThemedText>
                    
                    <ThemedView style={styles.signOutOptionBody}>
                        <TouchableOpacity style={styles.declineSignOutButton} onPress={()=> setDeleteModal(false)}>
                            <ThemedText type='defaultSemiBold'>No</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptSignOutButton}>
                            <ThemedText type='defaultSemiBold' style={styles.acceptSignOutText}>Yes</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>: null}
                <TouchableOpacity  style={styles.eventBody}>
                    {item.eventMainImage.aspectRatio === 'a'  ? 
                    <View>
                      {!loadingImage ? 
                      <ImageBackground style={styles.eventImage} source={{uri: mainImageUrl}} borderRadius={10} resizeMode='cover'>
                      </ImageBackground>:
                      <View style={styles.eventImage}><ActivityIndicator/></View>} 
                    </View>: null}
                    
                    {item.eventMainImage.aspectRatio === 'b'  ? 
                    <View>
                      {!loadingImage ? 
                      <ImageBackground style={styles.eventImage} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                          <ImageBackground style={styles.eventImageRatioB} source={{uri: mainImageUrl}} borderRadius={10} ></ImageBackground>
                      </ImageBackground>:
                      <View style={styles.eventImage}><ActivityIndicator/></View>}
                    </View> : null}
                    {item.eventMainImage.aspectRatio === 'c'  ? 
                    <View>
                    {!loadingImage ? 
                    <ImageBackground style={styles.eventImage} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                      
                        <ImageBackground style={styles.eventImageRatioC} source={{uri: mainImageUrl}} borderRadius={10} ></ImageBackground>
                        
                    </ImageBackground>:
                    <View style={styles.eventImage}><ActivityIndicator /></View>}
                    </View> : null}
                    
                    <View style={styles.eventDetailsSearchBody}>
                          <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={1}>{item.eventName}</ThemedText>
                          <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                          <TouchableOpacity style={styles.bookingsButton}><ThemedText>View Bookings</ThemedText></TouchableOpacity>
                          <ThemedView style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.bookingsButton} onPress={()=> handleOpenDeleteModal(item.eventName, item.id, item.eventAddress)}><ThemedText>delete</ThemedText></TouchableOpacity>
                            <Link href={{pathname: '/(tabs)/profile/postEvent' , params: {screenName: screenType, id: item.id}}} asChild>
                                <TouchableOpacity style={styles.editButton}><ThemedText>edit</ThemedText></TouchableOpacity>
                            </Link>
                          </ThemedView>
                      </View>
                
                </TouchableOpacity>
                
               
            
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center'
  },
  eventImage: {
    width: windowWidth * 0.95,
    height: 200,
  
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 0.5,
   
    borderColor: 'gray',
    alignItems: 'center'
    
    
  },
  eventImage2: {
    width: windowWidth * 0.4,
    height: 200,
  
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center'
    
    
  },
  eventImageLoading: {

    width: windowWidth * 0.4,
    height: 200,
  
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray'

  },
  eventImageRatioB: {
    width: 180,
    height: 180,
    position: 'absolute',
    marginTop: 10
  },
  eventImageRatioAHome1: {
    width: 140,
    height: 80,
    position: 'absolute',
    marginTop: 60
  },
  eventImageRatioBHome1: {
    width: 140,
    height: 140,
    position: 'absolute',
    marginTop: 40
  },
  eventImageRatioC: {
    width: 120,
    height: 180,
    position: 'absolute',
    marginTop: 10
  },
  eventImageRatioCHome1: {
    width: 100,
    height: 160,
    position: 'absolute',
    marginTop: 20
  },
  eventListBody: {
    flexDirection: 'column',

    paddingVertical: 0,
    paddingRight: 10,
    alignItems: 'center',
   
    
    
  },
  eventBody: {
    
    
    borderRadius: 10,
    marginVertical: 5,
  
    
  },
  eventBody2: {
   flexDirection: 'row',
   
   justifyContent: 'space-between' ,
   
   width: windowWidth * 0.95,
   marginBottom: 10
  },
 eventComponent: {
    marginTop: 5,
    borderWidth: 0,
    marginBottom: 100
    
  },
  headerBody: {
    flexDirection: 'column',
    width: windowWidth ,
   
    alignItems: 'center'
  },
  headerInnerBody: {
    width: windowWidth * 0.95,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center'
  } ,
 
  eventNameText: {
    fontWeight: '600',
    fontSize: 15,
    flexWrap: 'wrap'
  },
  
  eventHeaderText: {
    fontWeight: '700'
  },
  eventDetailsBody: {
    
    
    margin: 5,
    
    borderColor: 'gray',
    width: '95%'
  },
  eventDetailsBody2: {
    
    
    margin: 5,
    
    borderColor: 'gray',
    width: '95%'
  },
  eventDetailsSearchBody: {
    padding: 5,
    
    margin: 5,
    borderRadius: 5,
    
  },
  eventDetailsSearchBody2: {
    padding: 8,
    
   
    borderRadius: 5,
    width: windowWidth * 0.55,
    
    
    
  },
  eventAddressText: {
    marginTop: 3,
    flexWrap: 'wrap'
  },
  imageBackgroundHeader: {
    flexDirection: 'row',
    padding:10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  imageBackgroundHeader2: {
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  likeButton: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'gray'
  },
  unlikeButton: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: 'gray'
  },
  detailsBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.85,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'gray'
  },
  detailsBodyText:{
    padding: 10
  },
  imageBackgroundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    width: '100%'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  editButton: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  deleteButton: {


    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10

  },
  bookingsButton: {

    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10

  },
  signOutBody: {
    marginTop:30
  },
  signOutModal: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 100,
    width: '90%', 
    zIndex: 20
  },
  signOutOptionBody:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  declineSignOutButton: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10
  },
  acceptSignOutButton: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderColor: 'red'
  },
  acceptSignOutText: {
    color: 'red'
  }
 
   
})