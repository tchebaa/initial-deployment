import {useEffect, useState, Dispatch, SetStateAction} from 'react';
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

const accessToken = 'pk.eyJ1IjoiZm9uZG9sc2tpIiwiYSI6ImNtNXF0bDduNzAzbnIycXF1YXU5Z2NncDkifQ.MiUz8KNM1fPd5nr-EuQYig'

MapBox.setAccessToken(accessToken)




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostLocationNameDetails({eventName, setEventName, eventDescription, setEventDescription, eventNameError, eventDescriptionError, address, 
    setAddress, coordinates, setCoordinates}: 
    {eventName: string, setEventName: Dispatch<SetStateAction<string>>, eventDescription: string, setEventDescription: Dispatch<SetStateAction<string>>, 
    eventNameError: boolean, eventDescriptionError: boolean, address: string, setAddress: Dispatch<SetStateAction<string>>, coordinates: {latitude: number, longitude:number} | null,
    setCoordinates: Dispatch<SetStateAction<{latitude: number, longitude:number} | null>>
}) {

  const [showMap, setShowMap] = useState<boolean>(false)

    



    return (
        <ThemedView >
            {showMap ? 
            <ThemedView style={styles.mapSection}>
                <MapView style={styles.mapStyle}>
                  <Camera centerCoordinate={[Number(39.6309814), Number(-4.004131699999999)]} zoomLevel={15}/>
                  <PointAnnotation id='pin' draggable coordinate={[Number(39.6309814), Number(-4.004131699999999)]} onDragEnd={(event)=> console.log(event)}/>

                </MapView>
                <View style={styles.placesComponent}>
                <View style={styles.closeMapSection}>
                    <View></View>
                    <TouchableOpacity onPress={()=> setShowMap(false)}><ThemedView><AntDesign name='closesquareo' size={24} color={'black'} /></ThemedView></TouchableOpacity>
                </View>
                    <GooglePlacesAutocomplete
                        placeholder='Location' 
                        nearbyPlacesAPI='GooglePlacesSearch'
                        minLength={2}
                        onPress={(data, details = null)=>{
        
                            console.log(details)
                            if(details){
                                console.log(details.geometry.location.lat, details.geometry.location.lng)
                                setCoordinates({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng})
                                getUserAddress({latitude:Number(details.geometry.location.lat), longitude: Number(details.geometry.location.lng)})
                            }
                            

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
                                    
                            
                                } catch(error) {
                                    setAddress('Error getting description')
                                    
                                }
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
                      </View>
            </ThemedView>
            : null}
            <ThemedView style={styles.container}>
              <ThemedText type='defaultSemiBold'>Location</ThemedText>
                <TouchableOpacity style={styles.pickLocationButton} onPress={()=> setShowMap(true)}>
                  <MaterialIcons name='location-on' size={16} color={'#1184e8'} />
                    <ThemedText style={styles.pickLocationText}>Pick Location</ThemedText>
                    
                </TouchableOpacity>
                <ThemedView>
                    <ThemedText type='defaultSemiBold'>Event name</ThemedText>
                    <TextInput style={styles.inputContainer} placeholder='Event name' value={eventName} onChangeText={(e)=> setEventName(e)}/>
                </ThemedView>
                {eventNameError ? <ThemedText>Event name required</ThemedText>: <ThemedText></ThemedText>}
                <ThemedView>
                    <ThemedText type='defaultSemiBold'>Event Description</ThemedText>
                    <TextInput style={styles.descriptionTextAreaInput} multiline={true} numberOfLines={10} placeholder='Event description' value={eventDescription} onChangeText={(e)=> setEventDescription(e)}/>
                </ThemedView>
                {eventNameError ? <ThemedText>Event description required</ThemedText>: <ThemedText></ThemedText>}
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
      }
   
})