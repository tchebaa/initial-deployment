import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import * as Location from 'expo-location';

import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostLocationNameDetails({eventName, setEventName, eventDescription, setEventDescription, eventNameError, eventDescriptionError, address, 
    setAddress, coordinates, setCoordinates}: 
    {eventName: string, setEventName: Dispatch<SetStateAction<string>>, eventDescription: string, setEventDescription: Dispatch<SetStateAction<string>>, 
    eventNameError: boolean, eventDescriptionError: boolean, address: string, setAddress: Dispatch<SetStateAction<string>>, coordinates: {latitude: number, longitude:number} | null,
    setCoordinates: Dispatch<SetStateAction<{latitude: number, longitude:number} | null>>
}) {


    



    return (
        <ThemedView style={styles.container}>
            <ThemedView>
                <ThemedText type='defaultSemiBold'>Location</ThemedText>
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
                            
                            
                            width: '95%',
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
            </ThemedView>
            <ThemedView>
                <ThemedText type='defaultSemiBold'>Event name</ThemedText>
                <TextInput style={styles.inputContainer} placeholder='Event name' value={eventName} onChangeText={(e)=> setEventName(e)}/>
            </ThemedView>
            {eventNameError ? <ThemedText>Event name required</ThemedText>: <ThemedText></ThemedText>}
            <ThemedView>
                <ThemedText type='defaultSemiBold'>Event Description</ThemedText>
                <TextInput style={styles.descriptionTextAreaInput} multiline={true} placeholder='Event description' value={eventDescription} onChangeText={(e)=> setEventDescription(e)}/>
            </ThemedView>
            {eventNameError ? <ThemedText>Event description required</ThemedText>: <ThemedText></ThemedText>}
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        padding: 10,
        marginTop: 10
      },
      inputContainer: {
        borderWidth: 0.5,
        fontFamily:"default",
        width: '95%',
        marginTop: 10
      },
      descriptionTextAreaInput: {
        borderWidth: 0.5,
        fontFamily:"default",
        width: '95%',
        marginTop: 10
      }
   
})