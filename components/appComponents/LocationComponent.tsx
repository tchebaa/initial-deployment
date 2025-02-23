import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import {useLocation} from '../../context/LocationContext'
import {useLanguage} from '../../context/LanguageContext'
import { Link, router } from 'expo-router';
import * as Location from 'expo-location';
import { useColorScheme } from '@/hooks/useColorScheme';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function LocationComponent() {


    const colorScheme = useColorScheme();
    const {t} = useLanguage()

    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    async function getCurrentLocation() {
          
          let location = await Location.getCurrentPositionAsync({});
          
          setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        }

    return (
        <ThemedView style={styles.container}>
              <ThemedView style={styles.locationContainer}>
                <MaterialIcons name='location-on' size={24} color={'#1184e8'} />
                <GooglePlacesAutocomplete
                    placeholder={t('search.location')} 
                    nearbyPlacesAPI='GooglePlacesSearch'
                    minLength={2}
                    onPress={(data, details = null)=>{
    
                        console.log(details)
                        if(details){
                            console.log(details.geometry.location.lat, details.geometry.location.lng)
                        }
                        setUserLocation({latitude:details.geometry.location.lat, longitude: details.geometry.location.lng})
                        // setLocation({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng});
                        // setOpenContainer(!openContainer)
                        
                    }}
                    
                    fetchDetails={true}
                    debounce={400}
                    styles={{
                        container:{
                            flex:0,
                            marginTop: 5,
                            
                            width: '90%'
                        },
                        textInput: {
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                            fontFamily:"default",
                            backgroundColor: colorScheme === 'dark' ?  '#202020': 'white',
                            color: colorScheme === 'dark' ?  'white': 'black'
                        },
                        description: {
                          color: colorScheme === 'dark' ?  'white': 'black'
                        },
                        
                        separator: {
                          backgroundColor: colorScheme === 'dark' ?  'white': 'black'
                        },
                        row:{
                          backgroundColor: colorScheme === 'dark' ?  '#202020': 'white',
                        }
                    }}
                    textInputProps={{
                      placeholderTextColor: colorScheme === 'dark' ?  'white': 'black'
                    }}
                    enablePoweredByContainer={false}
                    query={{
                        key: 'AIzaSyCGzT9TA6GF716zU_JaSqprPUEaBoA9wgk',
                        language: 'en'
                    }}/>
                </ThemedView>
                
                <TouchableOpacity style={styles.locationContainer} onPress={()=> getCurrentLocation()}>
                  <ThemedView style={{marginRight: 5}}>
                      <MaterialIcons name='my-location' size={16} color={'#1184e8'} />
                  </ThemedView>
                  <ThemedText style={styles.myLocationText}>{t('my.current.location')}</ThemedText>            
                    
                </TouchableOpacity>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    
  },
  myLocationText: {
    marginLeft: 5,
    color: 'gray',
    marginVertical: 5
  }
   
})