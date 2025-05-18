import {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable, Platform, Linking  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Feather } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
//import MapViewDirections from 'react-native-maps-directions';
import MapBox, {MapView, Camera, ShapeSource, PointAnnotation, SymbolLayer, Images, MarkerView, LineLayer} from '@rnmapbox/maps'
import moment from 'moment';
import { Link, useRouter } from 'expo-router';
import {featureCollection, geometry, point} from '@turf/helpers'
import axios from 'axios';
import LocationComponent from './LocationComponent';
import LocationDirection from './LocationDirection';
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useUser} from '../../context/UserContext';
import {type Schema} from "../../tchebaa-backend/amplify/data/resource"
import { generateClient } from 'aws-amplify/data';
import {useLanguage} from '../../context/LanguageContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import pin from '../../assets/images/location-pin.png'
import PinImage from '../../assets/images/location-pin.png'
//import {MAPBOX_ACCESS_TOKEN} from "@env"



const client = generateClient<Schema>();

const DEFAULT_IMAGE = Image.resolveAssetSource(PinImage).uri;


const accessToken = process.env.MAPBOX_ACCESS_TOKEN

MapBox.setAccessToken(accessToken)



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventScreenBody({item, screenType}: {screenType: string | string []}) {

  const colorScheme = useColorScheme();
  const {t} = useLanguage()
  const {userDetails} = useUser()

  const router = useRouter()

  const [loadingImage, setLoadingImage] = useState<boolean>(true)
  const [loadingImage2, setLoadingImage2] = useState<boolean>(true)
  const [loadingImage3, setLoadingImage3] = useState<boolean>(true)
  const [loadingImage4, setLoadingImage4] = useState<boolean>(true)
  const [mainImageUrl, setMainImageUrl] = useState<string>('')
  const [eventImage2Url, setEventImage2Url] = useState<string>('')
  const [eventImage3Url, setEventImage3Url] = useState<string>('')
  const [eventImage4Url, setEventImage4Url] = useState<string>('')
  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [mapReady, setMapReady] = useState(false);
  const [showMarker, setShowMarker] = useState<boolean>(false)
	const [forceReload, setForceReload] = useState(0);
  const [showFullMap, setShowFullMap] = useState<boolean>(false)
  const [loadingBooking, setLoadingBooking] = useState<boolean>(false)
  const [bookingError, setBookingError] = useState<string>('')

  const [sortedDates, setSortedDates] = useState<{adultPrice: number, adolescentPrice: number, childPrice: number, eventDate: string, eventEndDate: string, eventHours: number, eventDays: number, eventMinutes: number, ticketTitle: string}[]>([])
  const [loadSortingDates, setLoadSortingDates] = useState<boolean>(true)
  const [eventIndex, setEventIndex] = useState<number | null>()

  const [openDirection, setOpenDirections] = useState<boolean>(false)

  const [originDirection, setOriginDirection] = useState<{latitude: number, longitude: number} | null>(null)
  const [loadingDirections, setLoadingDirections] = useState<boolean>(false)
  const [loadingDirectionsError, setLoadingDirectionsError] = useState<string>('')
  const [lineCoordinates, setLineCoordinates] = useState< [number] []>([])


  
  const [bookingModal, setBookingModal] = useState<boolean>(false)
  const [checkOutModal, setCheckOutModal] = useState<boolean>(false)
  const [extraImagesModal, setExtraImagesModal] = useState<boolean>(false)


  const [adultNumber, setAdultNumber] = useState<number>(0)
  const [adolescentNumber, setAdolescentNumber] = useState<number>(0)
  const [childNumber, setChildNumber] = useState<number>(0)

  const [ticketPriceArray, setTicketPriceArray] = useState<{adultPrice: number, adolescentPrice: number, childPrice: number, ticketTitle: string, ticketNumber: number} [] >([])
  const [eventDate, setEventDate] = useState<Date | null| string>('')
  const [eventEndDate, setEventEndDate] = useState<Date | null| string>('')
  const [eventDays, setEventHours] = useState<number | null>(0)
  const [eventHours, setEventDays] = useState<number | null>(0)
  const [eventMinutes, setEventMinutes] = useState<number | null>(0)

  const [eventTotalPrice, setEventTotalPrice] = useState<number>(0)

  const mapRef = useRef(null)
  const cameraRef = useRef(null)



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

  const handleGetImage2Url = async () => {

    if(item.eventImage2.url.length > 1) {


      try {

        setLoadingImage2(true)
  
        const linkToStorageFile = await getUrl({
          path: item.eventImage2.url,
          options: {
            useAccelerateEndpoint: true
          }
      })
  
      setEventImage2Url(linkToStorageFile.url.toString())
  
      setLoadingImage2(false)
  
      } catch(e) {
  
        setLoadingImage2(false)
  
      }


    } else {
      setLoadingImage2(false)
    }

  }


  const handleGetImage3Url = async () => {

    if(item.eventImage3.url.length > 1) {


      try {

        setLoadingImage3(true)
  
        const linkToStorageFile = await getUrl({
          path: item.eventImage3.url,
          options: {
            useAccelerateEndpoint: true
          }
      })
  
      setEventImage3Url(linkToStorageFile.url.toString())
  
      setLoadingImage3(false)
  
      } catch(e) {
  
        setLoadingImage3(false)
  
      }


    } else {
      setLoadingImage3(false)
    }

  }



  const handleGetImage4Url = async () => {


    if(item.eventImage4.url.length > 1) {


      try {

        

        setLoadingImage4(true)

   
  
        const linkToStorageFile = await getUrl({
          path: item.eventImage4.url,
          options: {
            useAccelerateEndpoint: true
          }
      })


      
  
      setEventImage4Url(linkToStorageFile.url.toString())
  
      setLoadingImage4(false)
  
      } catch(e) {

       
  
        setLoadingImage4(false)

       
        
  
      }


    } else {
      setLoadingImage4(false)
    }

  }

  useEffect(()=> {
    handleGetImageUrl()
    handleGetImage2Url()
    handleGetImage3Url()
    handleGetImage4Url()
  },[])

  
/** 
  useEffect(()=> {

    if(mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 1000)
    }

  },[mapRef])



	useEffect(() => {
     
		const timer = setTimeout(() => {
			if (!mapReady) {
				console.warn('Map was not ready within 1 second. Forcing re-render.');
				setForceReload((prev) => prev + 1);
        
			}
		}, 2000);

		return () => clearTimeout(timer);
    

    

	}, [mapReady]);



	*/

  


  useEffect(()=> {

    setLoadSortingDates(true)


      const sortedTimelines = item.dateTimePriceList.sort(function(a,b){
        return moment(b.eventDate).format() - moment(a.eventDate).format()
      })
  
      
      setSortedDates(sortedTimelines)
      setLoadSortingDates(false)

   
    

  },[])






  const handleSelectDate = (index:number, eventDate: string, eventEndDate: string, eventDays :number, eventHours: number, eventMinutes: number, ticketPriceArrayList:[{adultPrice: number, adolescentPrice: number, childPrice: number, ticketTitle: string, ticketNumber: number}] ) => {

    setEventIndex(index)
    setEventDate(eventDate)
    setEventEndDate(eventEndDate)
    setEventDays(eventDays)
    setEventHours(eventHours)
    setEventMinutes(eventMinutes)
    setTicketPriceArray(ticketPriceArrayList)
    

  }


  const handleOpenCheckoutModal = (eventTotalPrice: number) => {

    setEventTotalPrice(eventTotalPrice)
    setCheckOutModal(true)

  }

  const handleBookEvent = async () => {

    try {

      //setLoadingLikeUnlikeEvent(true)
      setBookingError('')
      setLoadingBooking(true)

      const bookedEvent = await client.models.EventTicket.create({
                eventName: item.eventName,
                eventDescription: item.eventDescription,
                eventMainImage: item.eventMainImage,
                eventAddress: item.eventAddress,
                ageRestriction: item.ageRestriction,
                eventDate: eventDate,
                eventEndDate: eventEndDate,
                location: item.location,
                eventId: item.id,
                userEmail: userDetails?.username,
                adultNumber: adultNumber,
                adolescentNumber: adolescentNumber,
                childNumber: childNumber,
                totalTicketNumber: adultNumber + adolescentNumber + childNumber,
                eventTotalPrice: eventTotalPrice,
                organizerEmail: item.email,
                ticketsStatus: 'booked',
                refunded: false
            
        });

       setLoadingBooking(false)
       
       router.push("/(tabs)/tickets")

       // handleGetLikedEvents()
      //  setLoadingLikeUnlikeEvent(false)

    } catch(e) {

      setBookingError(e?.message)
      setLoadingBooking(false)
     // setLoadingLikeUnlikeEvent(false)

    }

  }


  const handleAddTicket = (item: string) => {

    if(item === 'adult') {
      setAdultNumber(adultNumber => adultNumber + 1)
    }  
    if(item === 'adolescent') {
      setAdolescentNumber(adolescentNumber => adolescentNumber + 1)
    }
    if(item === 'child') {
      setChildNumber(childNumber => childNumber + 1)
    }
  }

  const handleMinusTicket = (item: string) => {

    if(item === 'adult') {
      setAdultNumber(adultNumber => adultNumber - 1)
    }  
    if(item === 'adolescent') {
      setAdolescentNumber(adolescentNumber => adolescentNumber - 1)
    }
    if(item === 'child') {
      setChildNumber(childNumber => childNumber - 1)
    }
  }

  /**
   * 
   * draggable onDragEnd={(item)=> console.log(item)} 
   * 
   * https://api.mapbox.com/directions/v5/mapbox/driving/39.63086668045429%2C-4.002112679088917%3B-4.007758337560851%2C39.6270886341?alternatives=true&annotations=distance%2Cduration&geometries=polyline&language=en&overview=full&steps=true&access_token=sk.eyJ1IjoiZm9uZG9sc2tpIiwiYSI6ImNtNXF0cmNvdTA0YXcycXBjeWQ3ZXFtd3gifQ.nbkTp8UjrnFVrAnKyt-C9w
   */

  //shape={{type: 'Point', coordinates:[Number(item.location.coordinates[1].$numberDecimal), Number(item.location.coordinates[0].$numberDecimal)]}}

  const getDirections = async () => {

  

    try {

      setLoadingDirectionsError('')
      setLoadingDirections(true)

      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${Number(item.location.coordinates[0])}%2C${Number(item.location.coordinates[1])}%3B${Number(originDirection?.longitude)}%2C${originDirection?.latitude}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiZm9uZG9sc2tpIiwiYSI6ImNtNXF0bDduNzAzbnIycXF1YXU5Z2NncDkifQ.MiUz8KNM1fPd5nr-EuQYig`)

 

    const json = await response.json()

    setLineCoordinates(json.routes[0].geometry.coordinates)
    setLoadingDirections(false)

    cameraRef.current.fitBounds([Number(item.location.coordinates[0]), Number(item.location.coordinates[1])],[Number(originDirection?.longitude), Number(originDirection?.latitude)])
    
    

    } catch (error) {

      
      setLoadingDirectionsError(t('error.getting.directions'))
      setLoadingDirections(false)

    }

    

  }

  const openExternalMap = () => {
    
    const scheme = Platform.select({
      ios: `maps://?q=${item.eventAddress}&ll=${Number(item.location.coordinates[1])},${Number(item.location.coordinates[0])}`,
      android: `geo:${Number(item.location.coordinates[1])},${Number(item.location.coordinates[0])}?q=${Number(item.location.coordinates[1])},${Number(item.location.coordinates[0])}(${item.eventAddress})`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch(err =>
        console.error('Error opening map: ', err),
    )}
  }

  useEffect(()=> {
    //getDirections()
  },[])


    return (
        <ThemedView style={styles.container}>
         {showFullMap ?
          <View style={styles.mapModalFull}>
            <View style={styles.mapFunctionSection}>
              <View style={styles.closeMapSection}>
                  <View></View>
                  <View style={styles.closeMapDirectionSection}>
                    {!openDirection ? <TouchableOpacity style={styles.directionsButton} onPress={()=> setOpenDirections(!openDirection)}><ThemedView style={styles.directionIconContainer}><MaterialIcons name='directions' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedView></TouchableOpacity>
                    : <TouchableOpacity style={styles.directionsButton} onPress={()=> setOpenDirections(!openDirection)}><ThemedView style={styles.openDirectionIconContainer}><MaterialIcons name='directions' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedView></TouchableOpacity>}
                    <TouchableOpacity style={styles.closeMapButton} onPress={()=> setShowFullMap(false)}><ThemedView><AntDesign name='closesquareo' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedView></TouchableOpacity>
                  </View>
                  
              </View>
              {openDirection ? 
              <ThemedView style={styles.directionLocationSection}>
                  <ThemedText type='defaultSemiBold'>{t('directions.from')}</ThemedText>
                  <LocationDirection originDirection={originDirection} getDirections={getDirections} setOriginDirection={setOriginDirection} loadingDirections={loadingDirections} 
                  setLoadingDirections={setLoadingDirections} loadingDirectionsError={loadingDirectionsError} openExternalMap={openExternalMap}/>
              </ThemedView>: null}
              
            </View>
            
            <MapView style={styles.fullMapStyle}>
              { screenType === "post" ? <Camera ref={cameraRef} centerCoordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]} zoomLevel={15}/> 
              : <Camera ref={cameraRef} centerCoordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]} zoomLevel={15}/> }
              { screenType === "post" ?
              <PointAnnotation id='pin' coordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]}>
                
                </PointAnnotation> :
                <PointAnnotation id='pin' coordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]}>
                
              </PointAnnotation>}
              {originDirection ? 
              <PointAnnotation id='pin' coordinate={[Number(originDirection.longitude), Number(originDirection.latitude)]}>
                
              </PointAnnotation>: null}
              {lineCoordinates.length > 1 && loadingDirections === false ? 
              <ShapeSource id='line' lineMetrics shape={{type: 'Feature', geometry:{type: "LineString", coordinates:lineCoordinates}}}>
                <LineLayer id='exampleline' style={{lineWidth: 7, lineColor: '#1184e8'}} />
              </ShapeSource> : null}
            </MapView>
          </View>
          : null}
          {extraImagesModal ? 
          <ThemedView style={styles.extraImagesModal}>
            <View style={styles.extraImagesCloseSection}>
                <View></View>
                <TouchableOpacity onPress={()=> setExtraImagesModal(false)}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>
            </View>
            {!loadingImage2 ? 
                  <View>
                      {item.eventImage2.aspectRatio === 'a'  ? 
                      <View>
                        { item.eventImage2.url.length > 1 || eventImage2Url.length > 1 ? 
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage2.url : eventImage2Url}} resizeMode='cover'>
                            
                        </ImageBackground>: null} 
                      </View>
                      : null}
                      
                      {item.eventImage2.aspectRatio === 'b'  ? 
                      <View>
                        {  item.eventImage2.url.length > 1 || eventImage2Url.length > 1 ?  
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage2.url : eventImage2Url}}  blurRadius={10} resizeMode='cover'>
                          
                              <ImageBackground style={styles.eventImageRatioB} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage2.url : eventImage2Url}} borderRadius={10} ></ImageBackground>
                          </ImageBackground>: null }
                      </View> 
                      : null}
                      {item.eventImage2.aspectRatio === 'c'  ? 
                      <View>
                        { item.eventImage2.url.length > 1 || eventImage2Url.length > 1 ?  
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage2.url : eventImage2Url}}  blurRadius={10} resizeMode='cover'>
                            <ImageBackground style={styles.eventImageRatioC} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage2.url : mainImageUrl}} borderRadius={10} ></ImageBackground>
                        </ImageBackground>: null}
                      </View> : null}
                    </View>: 
                    <View style={styles.eventImageLoading}>
                      <ActivityIndicator/>
                    </View>}


                    {!loadingImage3 ? 
                  <View>
                      {item.eventImage3.aspectRatio === 'a'  ? 
                      <View>
                        { item.eventImage3.url.length > 1 || eventImage3Url.length > 1 ? 

                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage3.url : eventImage3Url}} resizeMode='cover'>
                            
                        </ImageBackground>: null}
                      </View> : null}
                      {item.eventImage3.aspectRatio === 'b'  ? 
                      <View>
                        {item.eventImage3.url.length > 1 || eventImage3Url.length > 1 ? 
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage3.url : eventImage3Url}}  blurRadius={10} resizeMode='cover'>
                        
                            <ImageBackground style={styles.eventImageRatioB} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage3.url : eventImage3Url}} borderRadius={10} ></ImageBackground>
                        </ImageBackground>: null}
                      </View> : null}
                      {item.eventImage3.aspectRatio === 'c'  ? 
                      <View>
                        { item.eventImage3.url.length > 1 || eventImage3Url.length > 1 ? 
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage3.url : eventImage3Url}}  blurRadius={10} resizeMode='cover'>
                            <ImageBackground style={styles.eventImageRatioC} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage3.url : eventImage3Url}} borderRadius={10} ></ImageBackground>
                        </ImageBackground> : null}
                      </View> : null}
                    </View>: 
                    <View style={styles.eventImageLoading}>
                      <ActivityIndicator/>
                    </View>}

                    {!loadingImage4 ? 
                  <View>
                      {item.eventImage4.aspectRatio === 'a'  ? 
                      <View>
                        {item.eventImage4.url.length > 1 || eventImage4Url.length > 1 ? 
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage4.url : eventImage4Url}} resizeMode='cover'>
                            
                        </ImageBackground>: null}
                      </View> : null}
                      {item.eventImage4.aspectRatio === 'b'  ? 
                      <View>
                        {item.eventImage4.url.length > 1 || eventImage4Url.length > 1 ? 
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage4.url : eventImage4Url}}  blurRadius={10} resizeMode='cover'>
                        
                            <ImageBackground style={styles.eventImageRatioB} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage4.url : eventImage4Url}} borderRadius={10} ></ImageBackground>
                        </ImageBackground>: null}
                      </View> : null}
                      {item.eventImage4.aspectRatio === 'c'  ? 
                      <View>
                        {item.eventImage4.url.length > 1 || eventImage4Url.length > 1 ? 
                        <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage4.url : eventImage4Url}}  blurRadius={10} resizeMode='cover'>
                            <ImageBackground style={styles.eventImageRatioC} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventImage4.url : eventImage4Url}} borderRadius={10} ></ImageBackground>
                        </ImageBackground>: null}
                      </View> : null}
                    </View>: 
                    <View style={styles.eventImageLoading}>
                      <ActivityIndicator/>
                    </View>}

          </ThemedView>
          : null}
          {bookingModal ? 
          <View>
          {screenType === 'home' || screenType === 'like' || screenType === 'search' || 'post' || "manage" ?
          <View>
                {checkOutModal ? 
                <ThemedView style={styles.checkoutModal}>
                    <View style={styles.closeBookingSection}>
                      <View></View>
                      <TouchableOpacity onPress={()=> setCheckOutModal(false)}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>
                    </View>
                    <ThemedView style={styles.checkoutSection}>
                        <ThemedView style={styles.totalPriceSection}>
                          <ThemedText>{t('price.total')}</ThemedText>
                          <ThemedText>{eventTotalPrice}</ThemedText>
                        </ThemedView>
                        <ThemedView>
                          {loadingBooking ? 
                          <ThemedView>
                            <ActivityIndicator/>
                            <ThemedText>{t('booking')}</ThemedText>
                          </ThemedView>:
                          <TouchableOpacity style={styles.checkoutButton} onPress={()=> handleBookEvent()}>
                            <ThemedText>{t('checkout')}</ThemedText>
                          </TouchableOpacity>}
                          {bookingError ? <ThemedView><ThemedText>{bookingError}</ThemedText></ThemedView>: null}
                        </ThemedView>
                    </ThemedView>
                    
                  
                </ThemedView>: null}
                {ticketPriceArray.length > 0 ? 
                <View>
                  <View style={styles.closeBookingSection}>
                        
                    <TouchableOpacity onPress={()=> setBookingModal(false)}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>
                  </View>
                <ScrollView horizontal contentContainerStyle={{paddingRight: 500}}>
                <View style={styles.ticketPriceArrayContainer}>
                    {ticketPriceArray.map((item, i)=> {
                      return(
                        <View  key={i}>
                            <ThemedView style={styles.ticketBookingSection}>
                              
                              <ThemedView>
                                <ThemedText type='subtitle'>{item.ticketTitle}</ThemedText>
                              </ThemedView>
                              <View style={styles.ageGroupPrice}>
                                <View style={styles.ageGroupSection}>
                                  <ThemedText type='defaultSemiBold'>{t('adult')}</ThemedText>
                                  <Text style={styles.ageGroupDetails}>+18</Text>
                                </View>
                                <View style={styles.addMinusSection}>
                                  {adultNumber === 0 ? <TouchableOpacity><Feather name="minus-square" size={24} color="gray" /></TouchableOpacity>: <TouchableOpacity onPress={()=> handleMinusTicket('adult')}><Feather name="minus-square" size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>}
                                  <ThemedView style={styles.peopleNumberSection}>
                                    <ThemedText >{adultNumber}</ThemedText>
                                  </ThemedView>
                                  
                                  <TouchableOpacity onPress={()=> handleAddTicket('adult')}><AntDesign name="plussquareo" size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.ageGroupPrice}>
                                <View style={styles.ageGroupSection}>
                                  <ThemedText type='defaultSemiBold'>{t('adolescent')}</ThemedText>
                                  <Text style={styles.ageGroupDetails}>13 - 17</Text>
                                </View>
                                <View style={styles.addMinusSection}>
                                  {adolescentNumber === 0 ? <TouchableOpacity><Feather name="minus-square" size={24} color="gray" /></TouchableOpacity>: <TouchableOpacity onPress={()=> handleMinusTicket('adolescent')}><Feather name="minus-square" size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>}
                                  <ThemedView style={styles.peopleNumberSection}>
                                    <ThemedText >{adolescentNumber}</ThemedText>
                                  </ThemedView>
                                  <TouchableOpacity onPress={()=> handleAddTicket('adolescent')}><AntDesign name="plussquareo" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/></TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.ageGroupPrice}>
                                <View style={styles.ageGroupSection}>
                                  <ThemedText type='defaultSemiBold'>{t('child')}</ThemedText>
                                  <Text style={styles.ageGroupDetails}>0 - 12</Text>
                                </View>
                                <View style={styles.addMinusSection}>
                                  {childNumber === 0 ? <TouchableOpacity><Feather name="minus-square" size={24} color="gray" /></TouchableOpacity>: <TouchableOpacity onPress={()=> handleMinusTicket('child')}><Feather name="minus-square" size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>}
                                  <ThemedView style={styles.peopleNumberSection}>
                                    <ThemedText >{childNumber}</ThemedText>
                                  </ThemedView>
                                  <TouchableOpacity onPress={()=> handleAddTicket('child')}><AntDesign name="plussquareo" size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.ageGroupFinalPrice}>
                                <ThemedText>{t('adult.price')}</ThemedText>
                                {item.adultPrice === 0 ? 
                                <ThemedText>{t('free')}</ThemedText>:
                                <ThemedView style={styles.finalPriceSection}>
                                  <ThemedText>{adultNumber}</ThemedText>
                                  <ThemedText><AntDesign name="close" size={16} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedText>
                                  <ThemedText>{item.adultPrice}</ThemedText>
                                </ThemedView>}
                              </View>
                              <View style={styles.ageGroupFinalPrice}>
                                <ThemedText>{t('adolescent.price')}</ThemedText>
                                {item.adolescentPrice === 0 ? 
                                <ThemedText>{t('free')}</ThemedText>:
                                <ThemedView style={styles.finalPriceSection}>
                                  <ThemedText>{adolescentNumber}</ThemedText>
                                  <ThemedText><AntDesign name="close" size={16} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedText>
                                  <ThemedText>{item.adolescentPrice}</ThemedText>
                                </ThemedView>}
                              </View>
                              <View style={styles.ageGroupFinalPrice}>
                                <ThemedText>{t('child.price')}</ThemedText>
                                {item.childPrice === 0 ? 
                                <ThemedText>{t('free')}</ThemedText>:
                                <ThemedView style={styles.finalPriceSection}>
                                  <ThemedText>{childNumber}</ThemedText>
                                  <ThemedText><AntDesign name="close" size={16} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedText>
                                  <ThemedText>{item.childPrice}</ThemedText>
                                </ThemedView>}
                              </View>
                              <View style={styles.ageGroupFinalPrice}>
                                <ThemedText type='defaultSemiBold'>{t('total.tickets')}</ThemedText>
                                <ThemedText>{(adultNumber) + (adolescentNumber) + (childNumber )}</ThemedText>
                              </View>
                              <ThemedView style={styles.finalBookingButtonSection}>
                                {adultNumber > 0 || adolescentNumber > 0 || childNumber > 0 ? 
                                <TouchableOpacity style={styles.bookButtonActive} onPress={()=> handleOpenCheckoutModal(Number((adultNumber * item.adultPrice) + (adolescentNumber * item.adolescentPrice) + (childNumber * item.childPrice )))}>
                                  <ThemedText style={styles.bookingTextActive}>{t('book')}</ThemedText>
                                </TouchableOpacity>:
                                <TouchableOpacity style={styles.bookButton}>
                                  <ThemedText style={styles.bookingText}>{t('book')}</ThemedText>
                                </TouchableOpacity>}
                                
                              </ThemedView>
                              
                            </ThemedView>
                    </View>
                      )
                    })}
                     
                </View>
                </ScrollView>
                </View>
              : null}
              
                </View>
                : null}
                </View>: null}
                <ScrollView showsVerticalScrollIndicator={false}>
                  {!loadingImage ? 
                  <View>
                      {item.eventMainImage.aspectRatio === 'a'  ? 
                      <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventMainImage.url : mainImageUrl}} resizeMode='cover'>
                          <View style={styles.imageBackgroundHeader}>
                              <View>{item.sponsored ? <SimpleLineIcons name="badge" size={16} color="#FF4D00" />: null}</View>
                                <View>{item.eventImage2.url.length > 1 || item.eventImage3.url.length > 1 || item.eventImage3.url.length > 1 ? 
                                <TouchableOpacity onPress={()=> setExtraImagesModal(true)}>
                                  <MaterialIcons name="photo-library" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                                </TouchableOpacity>
                                  : null}
                              </View>
                              
                          </View>
                      </ImageBackground> : null}
                      {item.eventMainImage.aspectRatio === 'b'  ? 
                      <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventMainImage.url : mainImageUrl}}  blurRadius={10} resizeMode='cover'>
                      
                          <View style={styles.imageBackgroundHeader}>
                            <View>{item.sponsored ? <SimpleLineIcons name="badge" size={16} color="#FF4D00" />: null}</View>
                            <View>{item.eventImage2.url.length > 1 || item.eventImage3.url.length > 1 || item.eventImage3.url.length > 1 ? 
                              <TouchableOpacity onPress={()=> setExtraImagesModal(true)}>
                                <MaterialIcons name="photo-library" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                              </TouchableOpacity>
                                : null}
                              </View>
                          </View>
                          <ImageBackground style={styles.eventImageRatioB} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventMainImage.url : mainImageUrl}} borderRadius={10} ></ImageBackground>
                      </ImageBackground> : null}
                      {item.eventMainImage.aspectRatio === 'c'  ? 

                      <ImageBackground style={styles.eventImage} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventMainImage.url : mainImageUrl}}  blurRadius={10} resizeMode='cover'>
                      
                          <View style={styles.imageBackgroundHeader}>
                          <View>{item.sponsored ? <SimpleLineIcons name="badge" size={16} color="#FF4D00" />: null}</View>
                              <View>{item.eventImage2.url.length > 1 || item.eventImage3.url.length > 1 || item.eventImage3.url.length > 1 ? 
                              <TouchableOpacity onPress={()=> setExtraImagesModal(true)}>
                                <MaterialIcons name="photo-library" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                              </TouchableOpacity>
                                : null}
                              </View>
                          </View>
                          <ImageBackground style={styles.eventImageRatioC} source={{uri: screenType === "post" || screenType === 'manage' ? item.eventMainImage.url : mainImageUrl}} borderRadius={10} ></ImageBackground>
                      </ImageBackground> : null}
                    </View>: 
                    <View style={styles.eventImageLoading}>
                      <ActivityIndicator/>
                    </View>}
                    <ThemedView style={styles.eventBody}>
                        <ThemedText type='subtitle'>{item.eventName}</ThemedText>
                        <View style={styles.locationBody}>
                            <ThemedText type='defaultSemiBold'>{t('location')}</ThemedText>
                            <View style={styles.locationSection}>
                                <MaterialIcons name='location-on' size={16} color={'#1184e8'} />
                                <ThemedText>{item.eventAddress}</ThemedText>
                            </View>
                        </View>
                        
                        <View style={styles.descriptionBody}>
                            <ThemedText type='defaultSemiBold'>{t('about.this.event')}</ThemedText>
                            <ThemedText style={styles.eventDescription}>{item.eventDescription}</ThemedText>
                        </View>
                        <ThemedView>
                            <View style={styles.mapButtonBody}>
                            <View></View>
                            <TouchableOpacity style={styles.showMapModalButton} onPress={()=> setShowFullMap(true)}>
                              <ThemedView>
                                <MaterialIcons name="zoom-out-map" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                              </ThemedView>
                              
                            </TouchableOpacity>
                          </View>
                          <MapView style={styles.mapStyle}>
                            {screenType === "post" ?
                             <Camera centerCoordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]} zoomLevel={15}/>
                             : <Camera centerCoordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]} zoomLevel={15}/> }
                            {screenType === "post" ? 
                            <PointAnnotation id='pin' coordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]}>
                              
                            </PointAnnotation>:
                            <PointAnnotation id='pin' coordinate={[Number(item.location.coordinates[0]), Number(item.location.coordinates[1])]}>
                              
                            </PointAnnotation>}
                          </MapView>
                            
                        </ThemedView>
                        
                    </ThemedView>
                    
            </ScrollView>
            <ThemedView style={styles.dateSelectionComponent}>
              <ThemedText>{t('choose.date')}:</ThemedText>
              <ThemedView>
                {!loadSortingDates ? 
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <ThemedView style={styles.sortedDatesList}>{sortedDates.map((item, i)=> {
                    return(
                      <ThemedView key={i}>
                        
                        {moment(item.eventEndDate).format() < moment(new Date()).format() ? 
                        null : 
                        <ThemedView>
                          {moment(item.eventDate).format() < moment(new Date()).format() ? 
                          <ThemedView>
                            {eventIndex === i ? 
                              <TouchableOpacity style={styles.selectedDate} onPress={()=> console.log(ticketPriceArray)}>
                                <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                <ThemedText style={styles.ongoingText}>{t('ongoing')}</ThemedText>
                              </TouchableOpacity>:
                              <TouchableOpacity style={styles.unselectedDate} onPress={() => handleSelectDate(i, item.eventDate,item.eventEndDate, item.eventDays, item.eventHours, item.eventMinutes, item.ticketPriceArray)}>
                                <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                <ThemedText style={styles.ongoingText}>{t('ongoing')}</ThemedText>
                              </TouchableOpacity>}
                          </ThemedView>:
                          <ThemedView>
                            {eventIndex === i ? 
                            <TouchableOpacity style={styles.selectedDate} onPress={()=> console.log(ticketPriceArray)}>
                              <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                            </TouchableOpacity>:
                            <TouchableOpacity style={styles.unselectedDate} onPress={() => handleSelectDate(i, item.eventDate, item.eventEndDate, item.eventDays, item.eventHours, item.eventMinutes, item.ticketPriceArray)}>
                              <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                            </TouchableOpacity>
                            }
                          </ThemedView> }
                        </ThemedView>}
                      </ThemedView>
                    )
                  })}</ThemedView>
                </ScrollView>
                : null}
              </ThemedView>
              <View style={styles.dateBookComponent}>
                <View></View>
                {eventDate ? 
                <TouchableOpacity style={styles.selectedBookButton} onPress={()=> setBookingModal(true)}>
                  <ThemedText>{t('book')}</ThemedText>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.unselectedBookButton}>
                  <ThemedText>{t('book')}</ThemedText>
                </TouchableOpacity>
                }
              </View>
              
            </ThemedView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
   width: windowWidth,
   
  },
  eventImage: {
    width: windowWidth,
    height: 200,
  
    
    flexDirection: 'column',
    justifyContent: 'space-between',
    
    alignItems: 'center',
    marginBottom: 5
    
    
  },
  eventImageLoading: {

    width: '100%',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 0.5,
   
    borderColor: 'gray',
    alignItems: 'center'

  },
  imageBackgroundHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between'
    
   
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
  eventBody: {
    padding: 10
  },
  eventNameText: {
    flexWrap: 'wrap'
  },
  locationSection: {
    flexDirection: 'row',

    marginTop: 10
  },
  descriptionBody: {
    marginVertical: 10
  },
  locationBody: {
    marginTop: 10
  },
  eventDescription: {
    marginTop: 10
  },
  mapStyle: {
    width: '100%',
    height: 500,
    marginBottom: 200
  },
  mapModal: {
    width: windowWidth,
    height: windowHeight
  },
  mapModalStyle: {
    width: '100%',
    height: '100%',
    
  },
  mapButtonBody: {
    position: 'absolute',
    zIndex: 20,
    width: windowWidth * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  showMapModalButton: {
    borderWidth: 1
  },
  ticketBookingSection: {
    
    borderWidth: 1,
    padding: 10,
    width: windowWidth * 0.8
  },
  bookingView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top: 100,
    zIndex: 20
  },
  closeBookingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5
  },
  dateSelectionComponent: {
    position:'absolute',
    bottom: 40,
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
},
dateBookComponent:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10
},
sortedDatesList: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
  marginBottom: 10
},
selectedDate: {
  borderWidth: 1,
  borderColor: '#1184e8',
  padding: 5,
  flexDirection: 'row',
  borderRadius: 10,
  marginHorizontal: 5
},
ongoingText: {
  color:"#FF4D00",
  fontSize: 12,
  marginTop: 1,
  marginLeft: 5
},
unselectedDate: {
  borderWidth: 1,
  borderColor: 'gray',
  padding: 5,
  flexDirection: 'row',
  borderRadius: 10,
  marginHorizontal: 5
},
selectedBookButton: {
  padding: 5,
  borderColor: '#1184e8',
  borderWidth: 1,
  borderRadius: 5
},
unselectedBookButton: {
  padding: 5,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5
},
ageGroupPrice: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '90%',
  marginTop: 10
},
addMinusSection: {
  flexDirection: 'row',
  alignItems: 'center'
},
ageGroupSection: {
  flexDirection: 'row',
  alignItems: 'center'
},
ageGroupDetails: {
  marginLeft: 5,
  color: 'gray'
},
ageGroupFinalPrice: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '90%',
  marginTop: 10
},
finalPriceSection: {
  flexDirection: 'row',
  alignItems: 'center'
},
peopleNumberSection: {
  borderWidth: 1,
  width: 40,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 5,
  padding: 1
},
mapModalFull: {
  position: 'fixed',
  width: windowWidth,
  height: windowHeight
},
fullMapStyle: {
  height: windowHeight,
  width: windowWidth,
  
},
closeMapView: {
  position: 'absolute',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
mapFunctionSection: {
  
  width: '100%',
  marginVertical: 10,
  position: 'absolute',
  zIndex: 20
},
closeMapSection: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10
},
closeMapButton: {
  marginRight: 5
},
directionLocationSection: {
  padding: 10
},
closeMapDirectionSection: {
  flexDirection: 'row',
  alignItems: 'center'
},
directionsButton: {
  marginRight: 20
},
directionIconContainer: {
  borderWidth: 1,
  borderColor: 'gray'
},
openDirectionIconContainer:{
  borderWidth: 1,
  borderColor: '#1184e8'
},
ticketPriceArrayContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  width: '90%'
},
finalBookingButtonSection: {
  marginVertical: 10,
  alignItems: 'center'
},
bookButton: {
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 10,
  borderColor: "gray"
},
bookingText: {
  color: 'gray'
},
bookButtonActive: {
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 10,
  borderColor: "#1184e8"
},
bookingTextActive: {
  color: "#1184e8"

},
checkoutModal: {
  width: windowWidth,
  borderWidth: 0.5,
  
  borderColor: 'gray',
  position: 'absolute',
  zIndex: 40,
  padding: 10,
  height: windowHeight,
  alignItems: 'center',
},
checkoutButton: {
  borderWidth: 0.5,
  paddingHorizontal: 10,
  alignItems: 'center',
  borderRadius: 10,
  marginVertical: 10,
  borderColor: '#1184e8'
},
extraImagesModal: {
  zIndex: 40,
  position: 'fixed',
  width: windowWidth,
  top: 0,
  left: 0,
  height: windowHeight,
  alignItems: 'center',
  flexDirection: 'column',

  
},
extraImagesCloseSection: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '90%',
  padding: 10
},
totalPriceSection: {
  flexDirection: 'row',
  justifyContent: 'space-between'
},
checkoutSection: {
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '80%',
  width: '95%'
}

})