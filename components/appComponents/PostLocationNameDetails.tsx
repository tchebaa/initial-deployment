import {useEffect, useState, Dispatch, SetStateAction, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import MapBox, {MapView, Camera, ShapeSource, PointAnnotation, SymbolLayer, Images, MarkerView, LineLayer} from '@rnmapbox/maps'
import * as Location from 'expo-location';
const pin = require('../../assets/images/location-pin.png')
import { Link } from 'expo-router';
import {useLocation} from '../../context/LocationContext'
import { geometry } from '@turf/helpers';
import {useLanguage} from '../../context/LanguageContext'
import { useColorScheme } from '@/hooks/useColorScheme';


const accessToken = 'pk.eyJ1IjoiZm9uZG9sc2tpIiwiYSI6ImNtNXF0bDduNzAzbnIycXF1YXU5Z2NncDkifQ.MiUz8KNM1fPd5nr-EuQYig'

MapBox.setAccessToken(accessToken)




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostLocationNameDetails({eventName, setEventName, eventDescription, setEventDescription, eventNameError, eventDescriptionError, address, 
    setAddress, coordinates, setCoordinates, eventAddressError}: 
    {eventName: string, setEventName: Dispatch<SetStateAction<string>>, eventDescription: string, setEventDescription: Dispatch<SetStateAction<string>>, eventAddressError: boolean,
    eventNameError: boolean, eventDescriptionError: boolean, address: string, setAddress: Dispatch<SetStateAction<string>>, coordinates: {latitude: number, longitude:number} | null,
    setCoordinates: Dispatch<SetStateAction<{latitude: number, longitude:number} | null>>
}) {

  const colorScheme = useColorScheme();
  const {t} = useLanguage()
  const [showMap, setShowMap] = useState<boolean>(false)
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false)

  const {userLocation} = useLocation()

  const [mapCoordinates, setMapCoordinates] = useState<{latitude: number , longitude: number} | null >(null)

  const cameraRef = useRef(null)


  useEffect(()=> {
    if(coordinates) {

      setMapCoordinates({latitude: coordinates.latitude, longitude: coordinates.longitude})

    } else {

      setMapCoordinates({latitude: userLocation.latitude, longitude: userLocation.longitude})

    }
    
  },[])

  useEffect(()=> {
    if(cameraRef.current) {
      
      cameraRef.current.setCamera({
        centerCoordinate: [Number(mapCoordinates?.longitude), Number(mapCoordinates?.latitude)]
      })
      console.log(Number(userLocation?.longitude), Number(userLocation?.latitude), 123)
      cameraRef.current.flyTo([Number(mapCoordinates?.longitude), Number(mapCoordinates?.latitude)])
    }
  },[cameraRef, mapCoordinates])


  async function getUserAddress({latitude, longitude}: {latitude: number, longitude: number}) {
                            
    try {
        let street
        let district
        let city
        let country

        //Pick<LocationGeocodedLocation, "latitude" | "longitude">


        const description = await Location.reverseGeocodeAsync({latitude: latitude, longitude: longitude}) 

        const newDescription = description[0]
        
        if(newDescription.hasOwnProperty('street')) {

              if(newDescription.street) {
                street = `${newDescription.street} `
              } else {
                street= ''
              }

            } else {
              street = ''
            } 

        if(newDescription.hasOwnProperty('district')) {

            if(newDescription.district) {
  
                  district = `${newDescription.district} `
      
                } else {
                  district = ''
                }

            } else {
              district = ''
            }
    
        if(newDescription.hasOwnProperty('city')) {

          if(newDescription.city) {

                city = `${newDescription.city} `
    
              } else {
                city = ''
              }
          } else {
            city = ''
          }

        if(newDescription.hasOwnProperty('country')) {

          if( newDescription.country ) {

                country = `${newDescription.country} `
    
              } else {
                country = ''
              }
            } else {
              country = ''
            }
        
          setAddress(street + district + city + country)
          setLoadingAddress(false)

    } catch(error) {
        setAddress(t('error.getting.description'))
        setLoadingAddress(false)
    }
  } 

  const getAddressByDrag = (longitude: number, latitude: number) => {

    setLoadingAddress(true)
    setCoordinates({latitude: latitude, longitude: longitude})
    setMapCoordinates({latitude: latitude, longitude: longitude})
    getUserAddress({latitude:Number(latitude), longitude: Number(longitude)})

  }


    return (
        <ThemedView >
            {showMap ? 
            <ThemedView style={styles.mapSection}>
                <MapView style={styles.mapStyle}>
                  <Camera ref={cameraRef} centerCoordinate={[Number(mapCoordinates?.longitude), Number(mapCoordinates?.latitude)]} zoomLevel={15}/>
                  <PointAnnotation id='pin' draggable coordinate={[Number(mapCoordinates?.longitude), Number(mapCoordinates?.latitude)]} onDragEnd={(event)=> getAddressByDrag(event.geometry.coordinates[0], event.geometry.coordinates[1])}/>

                </MapView>
                <View style={styles.placesComponent}>
                    <View style={styles.closeMapSection}>
                        <View></View>
                        <TouchableOpacity onPress={()=> setShowMap(false)}><ThemedView><AntDesign name='closesquareo' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></ThemedView></TouchableOpacity>
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder={t('location')}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        minLength={2}
                        onPress={(data, details = null)=>{
        
                          setLoadingAddress(true)
                            
                            if(details){
                                
                                setCoordinates({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng})
                                setMapCoordinates({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng})
                                getUserAddress({latitude:Number(details.geometry.location.lat), longitude: Number(details.geometry.location.lng)})
                            }
                            // setLocation({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng});
                            // setOpenContainer(!openContainer)
                            
                        }}
                    
                        fetchDetails={true}
                        debounce={400}
                        styles={{
                            container:{
                                flex:0,
                                
                                
                                width: '90%',
                                marginTop: 5
                            },
                            textInput: {
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontFamily:"default",
                            }
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: 'AIzaSyCGzT9TA6GF716zU_JaSqprPUEaBoA9wgk',
                            language: 'en'
                        }}/>
                        {loadingAddress ? 
                        <ThemedView style={styles.loadingLocationBody}>
                          <ThemedText>{t('loading.location')}</ThemedText>
                        <ActivityIndicator />
                        </ThemedView> : null}
                        {address && !loadingAddress ? 
                        <ThemedView style={styles.confirmAddressBody}>
                          <ThemedText numberOfLines={1}>{address}</ThemedText>
                          <TouchableOpacity style={styles.confirmButton} onPress={()=> setShowMap(false)}>
                            <ThemedText>{t('confirm')}</ThemedText>
                          </TouchableOpacity>
                        </ThemedView>: null}
                      </View>
            </ThemedView>
            : null}
            <ThemedView style={styles.container}>
              <ThemedText type='defaultSemiBold'>{t('location')}</ThemedText>
                <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'},styles.pickLocationButton]} onPress={()=> setShowMap(true)}>
                  <MaterialIcons name='location-on' size={16} color={'#1184e8'} />
                    <ThemedText style={styles.pickLocationText}>{t('pick.location')}</ThemedText>
                    
                </TouchableOpacity>
                <ThemedView>
                  <ThemedText>{address}</ThemedText>
                  {eventAddressError ? <ThemedText>{t('event.location.is.required')}</ThemedText>: <ThemedText></ThemedText>}
                </ThemedView>
                <ThemedView>
                    <ThemedText type='defaultSemiBold'>{t('event.name')}</ThemedText>
                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]} placeholder={t('event.name')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} value={eventName} onChangeText={(e)=> setEventName(e)}/>
                </ThemedView>
                {eventNameError ? <ThemedText>{t('event.name.required')}</ThemedText>: <ThemedText></ThemedText>}
                <ThemedView>
                    <ThemedText type='defaultSemiBold'>{t('event.description')}</ThemedText>
                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.descriptionTextAreaInput]} multiline={true} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} numberOfLines={10} placeholder={t('event.description')} value={eventDescription} onChangeText={(e)=> setEventDescription(e)}/>
                </ThemedView>
                {eventNameError ? <ThemedText>{t('event.description.required')}</ThemedText>: <ThemedText></ThemedText>}
            </ThemedView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        padding: 10
      },
      inputContainer: {
        borderWidth: 0.5,
        fontFamily:"default",
        width: '95%',
        marginTop: 10,
        padding: 10
      },
      descriptionTextAreaInput: {
        borderWidth: 0.5,
        fontFamily:"default",
        width: '95%',
        marginTop: 10,
        padding: 10,
        height: 200,
        textAlignVertical: 'top'
      },
      mapStyle: {
     
        width: windowWidth,
        height: windowHeight
      },
      mapSection: {
        position: 'fixed',
        
        alignItems: 'center',
        width: windowWidth
      },
      placesComponent: {
        position: 'absolute',
        width: windowWidth,
        alignItems: 'center'
      },
      closeMapSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginVertical: 10
      },
      closeMapButton: {

      },
      pickLocationButton: {
        width: '100%',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 5,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
      },
      pickLocationText: {
        marginLeft: 5
      },
      confirmAddressBody:{
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width:'90%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'gray'
      },
      confirmButton: {
        borderWidth: 0.5,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10
      },
      loadingLocationBody:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'gray'
      }
   
})