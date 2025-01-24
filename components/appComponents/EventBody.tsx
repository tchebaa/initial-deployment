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





export default function EventBody({item, screenType}: {screenType: string}) {

    
    const {userDetails} = useUser()
    const {likedEvents, handleGetLikedEvents, loadingLikedEvents} = useLikes()

    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [loadingImageError, setLoadingImageError] = useState<string>('')
    const [loadingLikeUnlikeEvent, setLoadingLikeUnlikeEvent] = useState<boolean>(false)
    const [likeUnlikeError, setLikeUnlikeError] = useState<string>('')
    const [mainImageUrl, setMainImageUrl] = useState<string>('')

    



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

        setLoadingImage(false)

      }

      
   

    }

    useEffect(()=> {
      

      handleGetImageUrl()
      

      
    },[])


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
                  userEmail: userDetails?.username
              
          });

         

          handleGetLikedEvents()

          setLoadingLikeUnlikeEvent(false)

      } catch(e) {


        setLoadingLikeUnlikeEvent(false)

      }

    }


    const handleUnlikeEvent = async (id: string, screenType: string) => {

  

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

    

    useEffect(()=> {

    },[])


    return (
        <ThemedView style={styles.body}>
              {screenType === 'home' ?  
              <Link href={{pathname: '/(tabs)/home/event', params: {screenType: 'home', id: item.id}}} asChild>
                <TouchableOpacity  style={styles.eventBody2}>
                  {!loadingImage ? 
                   <View>
                      {item.eventMainImage.aspectRatio === 'a'  ? 
                      <ImageBackground style={styles.eventImage2} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                          <View style={styles.imageBackgroundBadge}>
                            <SimpleLineIcons name="badge" size={16} color="#FF4D00" />
                            <View>
                              
                            </View>
                          </View>
                          <ImageBackground style={styles.eventImageRatioAHome1} source={{uri: mainImageUrl}} borderRadius={5} ></ImageBackground>
                      </ImageBackground> : null}
                      {item.eventMainImage.aspectRatio === 'b'  ? 
                      <ImageBackground style={styles.eventImage2} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover' >
                          <View style={styles.imageBackgroundBadge}>
                            <SimpleLineIcons name="badge" size={16} color="#FF4D00" />
                            <View></View>
                          </View>
                          <ImageBackground style={styles.eventImageRatioBHome1} source={{uri: mainImageUrl}} borderRadius={5} ></ImageBackground>
                          
                      </ImageBackground> : null}
                      {item.eventMainImage.aspectRatio === 'c'  ? 
                      <ImageBackground style={styles.eventImage2} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                        
                          <View style={styles.imageBackgroundBadge}>
                              <SimpleLineIcons name="badge" size={16} color="#FF4D00" />
                              <View></View>
                            </View>
                          <ImageBackground style={styles.eventImageRatioCHome1} source={{uri: mainImageUrl}} borderRadius={5} ></ImageBackground>
                      </ImageBackground> : null}
                    </View>:
                    <View style={styles.eventImageLoading}>
                      <ActivityIndicator/>
                    </View>}
                          
                          <View style={styles.eventDetailsSearchBody2}>
                              <View style={styles.imageBackgroundHeader2}>
                                    <View></View>
                                    {loadingLikeUnlikeEvent || loadingLikedEvents ? 
                                    <View><ActivityIndicator /></View>:
                                    <View>
                                        {!likedEvents.some((likedItem) => likedItem.eventId === item.id) ? 
                                       
                                          <TouchableOpacity style={styles.likeButton} onPress={()=> handleLikeEvent()}>
                                          
                                              <AntDesign name="hearto" size={16} color="gray" />
                                                  
                                          </TouchableOpacity>
                                        :
                                        
                                          <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                                            <AntDesign name="heart" size={16} color="#ce2029" />
                                          </TouchableOpacity>
                                        }
                                    </View>}
                                    
                                </View>
                                
                                <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={2}>{item.eventName }</ThemedText>
                                <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                <HomeDateTimeCostSection eventTimelines={item.dateTimePriceList} option={'homeNear'} />
                                
                          </View>
                  
                  </TouchableOpacity>
                </Link>

                : 
                <Link href={{pathname: screenType === 'search' ? '/(tabs)/search/event' : '/(tabs)/likes/event' , params: {screenType: screenType ==='search' ? 'search' : 'like', id: screenType === 'like' ? item.eventId : item.id}}} asChild>
                <TouchableOpacity  style={styles.eventBody}>
                    {item.eventMainImage.aspectRatio === 'a'  ? 
                    <View>
                      {!loadingImage ? 
                      <ImageBackground style={styles.eventImage} source={{uri: mainImageUrl}} borderRadius={10} resizeMode='cover'>
                          <View style={styles.imageBackgroundHeader}>
                              <View><SimpleLineIcons name="badge" size={16} color="#FF4D00" /></View>
                              {loadingLikeUnlikeEvent || loadingLikedEvents ?
                              <View><ActivityIndicator /></View>
                               :
                               <View>
                                  {screenType === 'like' ?
                                  <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                                      <AntDesign name="heart" size={16} color="#ce2029" />
                                  </TouchableOpacity> 
                                  :
                                  <View>
                                    {!likedEvents.some((likedItem) => likedItem.eventId === item.id) ? 
                                    
                                      <TouchableOpacity style={styles.likeButton} onPress={()=> handleLikeEvent()}>
                                      
                                          <AntDesign name="hearto" size={16} color="gray" />
                                              
                                      </TouchableOpacity>
                                    :
                                    
                                      <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                                        <AntDesign name="heart" size={16} color="#ce2029" />
                                      </TouchableOpacity>
                                    }
                                  </View>}
                              </View>}
                              
                          </View>
                          {screenType === 'like' ? 
                         
                              <View style={styles.eventDetailsBody}>
                                  <View style={styles.detailsBackground}></View>
                                  <View style={styles.detailsBodyText}>
                                      <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={1}>{item.eventName}</ThemedText>
                                      <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                      <HomeDateTimeCostSection eventTimelines={item.dateTimePriceList} option={'homeNear'} />
                                  </View>
                                  
                              
                          </View>: null}
                      </ImageBackground>:
                      <View style={styles.eventImage}><ActivityIndicator/></View>} 
                    </View>: null}
                    
                    {item.eventMainImage.aspectRatio === 'b'  ? 
                    <View>
                      {!loadingImage ? 
                      <ImageBackground style={styles.eventImage} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                        
                          <View style={styles.imageBackgroundHeader}>
                            <View><SimpleLineIcons name="badge" size={16} color="#FF4D00" /></View>
                            {loadingLikeUnlikeEvent || loadingLikedEvents ? 
                            <View><ActivityIndicator /></View>:
                                <View>
                                  {screenType === 'like' ? 
                                  <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                                    <AntDesign name="heart" size={16} color="#ce2029" />
                                  </TouchableOpacity>
                                  :
                                  <View>
                                    {!likedEvents.some((likedItem) => likedItem.eventId === item.id) ? 
                                    
                                      <TouchableOpacity style={styles.likeButton} onPress={()=> handleLikeEvent()}>
                                      
                                          <AntDesign name="hearto" size={16} color="gray" />
                                              
                                      </TouchableOpacity>
                                    :
                                    
                                      <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                                        <AntDesign name="heart" size={16} color="#ce2029" />
                                      </TouchableOpacity>
                                  }
                                  </View>}
                              </View>}
                              
                          </View>
                          <ImageBackground style={styles.eventImageRatioB} source={{uri: mainImageUrl}} borderRadius={10} ></ImageBackground>
                          {screenType === 'like' ? 
                          
                              <View style={styles.eventDetailsBody}>
                                  <View style={styles.detailsBackground}></View>
                                  <View style={styles.detailsBodyText}>
                                      <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={1}>{item.eventName}</ThemedText>
                                      <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                      <HomeDateTimeCostSection eventTimelines={item.dateTimePriceList} option={'homeNear'} />
                                  </View>
                                  
                              
                          </View>: null}
                      </ImageBackground>:
                      <View style={styles.eventImage}><ActivityIndicator/></View>}
                    </View> : null}
                    {item.eventMainImage.aspectRatio === 'c'  ? 
                    <View>
                    {!loadingImage ? 
                    <ImageBackground style={styles.eventImage} source={{uri: mainImageUrl}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                      
                        <View style={styles.imageBackgroundHeader}>
                          <View><SimpleLineIcons name="badge" size={16} color="#FF4D00" /></View>
                          {loadingLikeUnlikeEvent || loadingLikedEvents ? 
                          <View><ActivityIndicator/></View>
                          :
                          <View>
                            {screenType === 'like' ? 
                            <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                              <AntDesign name="heart" size={16} color="#ce2029" />
                            </TouchableOpacity>
                            :
                            <View>
                              {!likedEvents.some((likedItem) => likedItem.eventId === item.id) ? 
                              
                                <TouchableOpacity style={styles.likeButton} onPress={()=> handleLikeEvent()}>
                                    <AntDesign name="hearto" size={16} color="gray" />   
                                </TouchableOpacity>
                              :
                              
                                <TouchableOpacity style={styles.unlikeButton} onPress={()=> handleUnlikeEvent(item.id, screenType)}>
                                  <AntDesign name="heart" size={16} color="#ce2029" />
                                </TouchableOpacity>
                              }
                            </View>}
                          </View>}
                        </View>
                        <ImageBackground style={styles.eventImageRatioC} source={{uri: mainImageUrl}} borderRadius={10} ></ImageBackground>
                        {screenType === 'like' ? 
                        
                            <View style={styles.eventDetailsBody}>
                                <View style={styles.detailsBackground}></View>
                                <View style={styles.detailsBodyText}>
                                    <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={1}>{item.eventName}</ThemedText>
                                    <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                    <HomeDateTimeCostSection eventTimelines={item.dateTimePriceList} option={'homeNear'} />
                                </View>
                                
                            </View>
                        : null}
                    </ImageBackground>:
                    <View style={styles.eventImage}><ActivityIndicator /></View>}
                    </View> : null}
                    {screenType === 'search' ? 
                    <View style={styles.eventDetailsSearchBody}>
                          <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={1}>{item.eventName}</ThemedText>
                          <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                          <HomeDateTimeCostSection eventTimelines={item.dateTimePriceList} option={'homeNear'} />
                      </View>: null}
                
                </TouchableOpacity>
                </Link>
                }
            
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
  }
 
   
})