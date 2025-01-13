import {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Feather } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
//import MapViewDirections from 'react-native-maps-directions';
import MapBox, {MapView, Camera, ShapeSource, PointAnnotation, SymbolLayer, Images, MarkerView, LineLayer} from '@rnmapbox/maps'
import moment from 'moment';
import { Link, router } from 'expo-router';
import {featureCollection, geometry, point} from '@turf/helpers'
import pin from '../../assets/images/location-pin.png'
import PinImage from '../../assets/images/location-pin.png'
import axios from 'axios';
import LocationComponent from './LocationComponent';
import { Directions } from 'react-native-gesture-handler';

const DEFAULT_IMAGE = Image.resolveAssetSource(PinImage).uri;


const accessToken = 'pk.eyJ1IjoiZm9uZG9sc2tpIiwiYSI6ImNtNXF0bDduNzAzbnIycXF1YXU5Z2NncDkifQ.MiUz8KNM1fPd5nr-EuQYig'

MapBox.setAccessToken(accessToken)



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventScreenBody({item, screenType}) {


  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [mapReady, setMapReady] = useState(false);
  const [showMarker, setShowMarker] = useState<boolean>(false)
	const [forceReload, setForceReload] = useState(0);
  const [showFullMap, setShowFullMap] = useState<boolean>(false)

  const [sortedDates, setSortedDates] = useState<{adultPrice: number, adolescentPrice: number, childPrice: number, eventDate: string, eventEndDate: string, eventHours: number, eventDays: number, eventMinutes: number, ticketTitle: string}[]>([])
  const [loadSortingDates, setLoadSortingDates] = useState<boolean>(true)
  const [eventIndex, setEventIndex] = useState<number | null>()

  const [openDirection, setOpenDirections] = useState<boolean>(false)


  const [likedEvents, setLikedEvents] = useState([])
  const [bookingModal, setBookingModal] = useState<boolean>(false)
  const [adultNumber, setAdultNumber] = useState<number>(0)
  const [adolescentNumber, setAdolescentNumber] = useState<number>(0)
  const [childNumber, setChildNumber] = useState<number>(0)
  const [chosenDateDetails, setChosenDateDetails] = 
  useState<{adultPrice: number, childPrice: number, adolescentPrice: number, eventDate: Date, eventDays: number, eventHours: number, eventMinutes: number}>({adultPrice: 0, childPrice: 0, adolescentPrice: 0, eventDate: new Date(), eventDays: 0, eventMinutes: 0, eventHours:0})

  const [eventDate, setEventDate] = useState<Date | null>()

  const mapRef = useRef(null)
  const cameraRef = useRef(null)


  const [mapRegion, setMapRegion] = useState({
    latitude: Number(item.location.coordinates[1].$numberDecimal),
    longitude: Number(item.location.coordinates[0].$numberDecimal),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005, 
  })

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


  <ShapeSource shape={featureCollection([point([Number(item.location.coordinates[0].$numberDecimal), Number(item.location.coordinates[1].$numberDecimal)])])}>
    <SymbolLayer id='pin' style={{iconImage: 'pin'}}>
      <Images images={{pin}}/>
    </SymbolLayer>
  </ShapeSource>


	*/

  useEffect(()=> {

    

  },[])


  useEffect(()=> {

    setLoadSortingDates(true)

    const sortedTimelines = item.dateTimePrice.sort(function(a,b){
      return b.eventDate - a.eventDate
    })

    console.log(sortedTimelines, sortedTimelines.length)
    setSortedDates(sortedTimelines)
    setLoadSortingDates(false)

  },[])

  const handleSelectDate = (index:number, item: {adultPrice: number, childPrice: number, adolescentPrice: number, eventDate: Date, eventDays: number, eventHours: number, eventMinutes: number} ) => {

    setEventIndex(index)
    setEventDate(item.eventDate)
    setChosenDateDetails({adultPrice: item.adultPrice, adolescentPrice: item.adolescentPrice, 
      childPrice: item.childPrice, eventDays: item.eventDays, eventHours: item.eventHours, eventMinutes: item.eventMinutes, eventDate: item.eventDate})

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

    const response = await fetch('https://api.mapbox.com/driving/v5/mapbox/walking/39.63086668045429%2C-4.002112679088917%3B39.6262996484521%2C-4.007546436874143?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiZm9uZG9sc2tpIiwiYSI6ImNtNXF0bDduNzAzbnIycXF1YXU5Z2NncDkifQ.MiUz8KNM1fPd5nr-EuQYig')

    const json = await response.json()

    console.log(json.routes[0].geometry.coordinates)

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
                    {!openDirection ? <TouchableOpacity style={styles.directionsButton} onPress={()=> setOpenDirections(!openDirection)}><ThemedView style={styles.directionIconContainer}><MaterialIcons name='directions' size={24} color={'black'} /></ThemedView></TouchableOpacity>
                    : <TouchableOpacity style={styles.directionsButton} onPress={()=> setOpenDirections(!openDirection)}><ThemedView style={styles.openDirectionIconContainer}><MaterialIcons name='directions' size={24} color={'black'} /></ThemedView></TouchableOpacity>}
                    <TouchableOpacity style={styles.closeMapButton} onPress={()=> setShowFullMap(false)}><ThemedView><AntDesign name='closesquareo' size={24} color={'black'} /></ThemedView></TouchableOpacity>
                  </View>
                  
              </View>
              {openDirection ? 
              <ThemedView style={styles.directionLocationSection}>
                  <ThemedText type='defaultSemiBold'>Directions from</ThemedText>
                  <LocationComponent />
              </ThemedView>: null}
              
            </View>
            
            <MapView style={styles.fullMapStyle}>
              <Camera centerCoordinate={[Number(item.location.coordinates[0].$numberDecimal), Number(item.location.coordinates[1].$numberDecimal)]} zoomLevel={15}/> 
              <PointAnnotation id='pin' coordinate={[Number(item.location.coordinates[0].$numberDecimal), Number(item.location.coordinates[1].$numberDecimal)]}>
                
              </PointAnnotation>
              <ShapeSource id='line' lineMetrics shape={{type: 'Feature', geometry:{type: "LineString", coordinates:[[39.630851, -4.002132], [39.631032, -4.002276], [39.630863, -4.002478], [39.630402, -4.002941], [39.629684, -4.003671], [39.629281, -4.004084], [39.629145, -4.004218], [39.628957, -4.004441], [39.628819, -4.004759], [39.628767, -4.004854], [39.628654, -4.005321], [39.628485, -4.005811], [39.628257, -4.006671], [39.628052, -4.007328], [39.627861, -4.007936], [39.626991, -4.007683], [39.626666, -4.007588], [39.626477, -4.007531], [39.626308, -4.0075]]}}}>
                <LineLayer id='exampleline' style={{lineWidth: 7, lineColor: '#1184e8'}} />
              </ShapeSource> 
            </MapView>
          </View>
          : null}
          {bookingModal ? 
          <View>
          {screenType === 'home' || screenType === 'like' || screenType === 'search' ?
                <View style={styles.bookingView}>
                  <ThemedView style={styles.ticketBookingSection}>
                    <View style={styles.closeBookingSection}>
                      <View><ThemedText></ThemedText></View>
                      <TouchableOpacity onPress={()=> setBookingModal(false)}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                    </View>
                    <ThemedView>
                      <ThemedText></ThemedText>
                    </ThemedView>
                    <View style={styles.ageGroupPrice}>
                      <View style={styles.ageGroupSection}>
                        <ThemedText type='defaultSemiBold'>Adult</ThemedText>
                        <Text style={styles.ageGroupDetails}>+18</Text>
                      </View>
                      <View style={styles.addMinusSection}>
                        {adultNumber === 0 ? <TouchableOpacity><Feather name="minus-square" size={24} color="gray" /></TouchableOpacity>: <TouchableOpacity onPress={()=> handleMinusTicket('adult')}><Feather name="minus-square" size={24} color="black" /></TouchableOpacity>}
                        <ThemedView style={styles.peopleNumberSection}>
                          <ThemedText >{adultNumber}</ThemedText>
                        </ThemedView>
                        
                        <TouchableOpacity onPress={()=> handleAddTicket('adult')}><AntDesign name="plussquareo" size={24} color="black" /></TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.ageGroupPrice}>
                      <View style={styles.ageGroupSection}>
                        <ThemedText type='defaultSemiBold'>Adolescent</ThemedText>
                        <Text style={styles.ageGroupDetails}>13 - 17</Text>
                      </View>
                      <View style={styles.addMinusSection}>
                        {adolescentNumber === 0 ? <TouchableOpacity><Feather name="minus-square" size={24} color="gray" /></TouchableOpacity>: <TouchableOpacity onPress={()=> handleMinusTicket('adolescent')}><Feather name="minus-square" size={24} color="black" /></TouchableOpacity>}
                        <ThemedView style={styles.peopleNumberSection}>
                          <ThemedText >{adolescentNumber}</ThemedText>
                        </ThemedView>
                        <TouchableOpacity onPress={()=> handleAddTicket('adolescent')}><AntDesign name="plussquareo" size={24} color="black" /></TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.ageGroupPrice}>
                      <View style={styles.ageGroupSection}>
                        <ThemedText type='defaultSemiBold'>Child</ThemedText>
                        <Text style={styles.ageGroupDetails}>0 - 12</Text>
                      </View>
                      <View style={styles.addMinusSection}>
                        {childNumber === 0 ? <TouchableOpacity><Feather name="minus-square" size={24} color="gray" /></TouchableOpacity>: <TouchableOpacity onPress={()=> handleMinusTicket('child')}><Feather name="minus-square" size={24} color="black" /></TouchableOpacity>}
                        <ThemedView style={styles.peopleNumberSection}>
                          <ThemedText >{childNumber}</ThemedText>
                        </ThemedView>
                        <TouchableOpacity onPress={()=> handleAddTicket('child')}><AntDesign name="plussquareo" size={24} color="black" /></TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.ageGroupFinalPrice}>
                      <ThemedText>Adult price</ThemedText>
                      {chosenDateDetails.adultPrice === 0 ? 
                      <ThemedText>Free</ThemedText>:
                      <ThemedView style={styles.finalPriceSection}>
                        <ThemedText>{adultNumber}</ThemedText>
                        <ThemedText><AntDesign name="close" size={16} color="black" /></ThemedText>
                        <ThemedText>{chosenDateDetails.adultPrice}</ThemedText>
                      </ThemedView>}
                    </View>
                    <View style={styles.ageGroupFinalPrice}>
                      <ThemedText>Adolescent price</ThemedText>
                      {chosenDateDetails.adolescentPrice === 0 ? 
                      <ThemedText>Free</ThemedText>:
                      <ThemedView style={styles.finalPriceSection}>
                        <ThemedText>{adolescentNumber}</ThemedText>
                        <ThemedText><AntDesign name="close" size={16} color="black" /></ThemedText>
                        <ThemedText>{chosenDateDetails.adolescentPrice}</ThemedText>
                      </ThemedView>}
                    </View>
                    <View style={styles.ageGroupFinalPrice}>
                      <ThemedText>Child price</ThemedText>
                      {chosenDateDetails.childPrice === 0 ? 
                      <ThemedText>Free</ThemedText>:
                      <ThemedView style={styles.finalPriceSection}>
                        <ThemedText>{childNumber}</ThemedText>
                        <ThemedText><AntDesign name="close" size={16} color="black" /></ThemedText>
                        <ThemedText>{chosenDateDetails.childPrice}</ThemedText>
                      </ThemedView>}
                    </View>
                    <View style={styles.ageGroupFinalPrice}>
                      <ThemedText type='defaultSemiBold'>Total</ThemedText>
                      <ThemedText>{(adultNumber * chosenDateDetails.adultPrice) + (adolescentNumber * chosenDateDetails.adolescentPrice) + (childNumber * chosenDateDetails.childPrice )}</ThemedText>
                    </View>
                    <ThemedText>Book</ThemedText>
                  </ThemedView>
                </View>
                : null}
                </View>: null}
                <ScrollView showsVerticalScrollIndicator={false}>
                      {item.eventMainImage.aspectRatio === 'a'  ? 
                    <ImageBackground style={styles.eventImage} source={{uri: item.eventMainImage.url}} resizeMode='cover'>
                        <View style={styles.imageBackgroundHeader}>
                            <View><SimpleLineIcons name="badge" size={16} color="#FF4D00" /></View>
                            
                            
                        </View>
                    </ImageBackground> : null}
                    {item.eventMainImage.aspectRatio === 'b'  ? 
                    <ImageBackground style={styles.eventImage} source={{uri: item.eventMainImage.url}}  blurRadius={10} resizeMode='cover'>
                    
                        <View style={styles.imageBackgroundHeader}>
                        <View><SimpleLineIcons name="badge" size={16} color="#FF4D00" /></View>
                        </View>
                        <ImageBackground style={styles.eventImageRatioB} source={{uri: item.eventMainImage.url}} borderRadius={10} ></ImageBackground>
                    </ImageBackground> : null}
                    {item.eventMainImage.aspectRatio === 'c'  ? 

                    <ImageBackground style={styles.eventImage} source={{uri: item.eventMainImage.url}}  blurRadius={10} resizeMode='cover'>
                    
                        <View style={styles.imageBackgroundHeader}>
                        <View><SimpleLineIcons name="badge" size={16} color="#FF4D00" /></View>
                            
                        </View>
                        <ImageBackground style={styles.eventImageRatioC} source={{uri: item.eventMainImage.url}} borderRadius={10} ></ImageBackground>
                    </ImageBackground> : null}
                    <ThemedView style={styles.eventBody}>
                        <ThemedText type='subtitle'>{item.eventName}</ThemedText>
                        <View style={styles.locationBody}>
                            <ThemedText type='defaultSemiBold'>Location</ThemedText>
                            <View style={styles.locationSection}>
                                <MaterialIcons name='location-on' size={16} color={'#1184e8'} />
                                <ThemedText>{item.address}</ThemedText>
                            </View>
                        </View>
                        
                        <View style={styles.descriptionBody}>
                            <ThemedText type='defaultSemiBold'>About this event</ThemedText>
                            <ThemedText style={styles.eventDescription}>{item.eventDescription}</ThemedText>
                        </View>
                        <ThemedView>
                            <View style={styles.mapButtonBody}>
                            <View></View>
                            <TouchableOpacity style={styles.showMapModalButton} onPress={()=> setShowFullMap(true)}>
                              <ThemedView>
                                <MaterialIcons name="zoom-out-map" size={24} color="black" />
                              </ThemedView>
                              
                            </TouchableOpacity>
                          </View>
                          <MapView style={styles.mapStyle}>
                            <Camera centerCoordinate={[Number(item.location.coordinates[0].$numberDecimal), Number(item.location.coordinates[1].$numberDecimal)]} zoomLevel={15}/> 
                            <PointAnnotation id='pin' coordinate={[Number(item.location.coordinates[0].$numberDecimal), Number(item.location.coordinates[1].$numberDecimal)]}>
                              
                            </PointAnnotation>
                          </MapView>
                            
                        </ThemedView>
                        
                    </ThemedView>
                    
            </ScrollView>
            <ThemedView style={styles.dateSelectionComponent}>
              <ThemedText>Choose date:</ThemedText>
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
                              <TouchableOpacity style={styles.selectedDate}>
                                <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                <ThemedText style={styles.ongoingText}>ongoing</ThemedText>
                              </TouchableOpacity>:
                              <TouchableOpacity style={styles.unselectedDate} onPress={() => handleSelectDate(i, item)}>
                                <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                <ThemedText style={styles.ongoingText}>ongoing</ThemedText>
                              </TouchableOpacity>}
                          </ThemedView>:
                          <ThemedView>
                            {eventIndex === i ? 
                            <TouchableOpacity style={styles.selectedDate}>
                              <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                            </TouchableOpacity>:
                            <TouchableOpacity style={styles.unselectedDate} onPress={() => handleSelectDate(i, item)}>
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
                  <ThemedText>Book</ThemedText>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.unselectedBookButton}>
                  <ThemedText>Book</ThemedText>
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
    width: '100%',
    height: 200,
  
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 0.5,
   
    borderColor: 'gray',
    alignItems: 'center'
    
    
  },
  imageBackgroundHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
    padding: 10
    
   
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
    marginTop: 10
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
    width: '90%'
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
    borderWidth: 1,
    borderColor: 'white'
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
}

})