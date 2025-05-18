import {Dispatch, useEffect, useState, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable, Platform  } from 'react-native';
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
//import {GOOGLE_API_KEY} from'@env'




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function LocationDirection({originDirection, getDirections, setOriginDirection, loadingDirections, loadingDirectionsError, setLoadingDirections, openExternalMap}: 
    {originDirection: {latitude: number, longitude: number} | null, getDirections: () => void, 
    setOriginDirection: Dispatch<SetStateAction<{latitude: number, longitude:number} | null>>, loadingDirections: boolean, loadingDirectionsError: string,
    setLoadingDirections: Dispatch<SetStateAction<boolean>>, openExternalMap: () => void}) {


    const {t} = useLanguage()
    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    async function getCurrentLocation() {
          
          
          let location = await Location.getCurrentPositionAsync({});
          
          
          setOriginDirection({latitude: location.coords.latitude, longitude: location.coords.longitude});

          
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

                          
                          setOriginDirection({latitude:details.geometry.location.lat, longitude: details.geometry.location.lng})
                          
                        }
                        
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
                        }
                    }}
                    enablePoweredByContainer={false}
                    query={{
                        key: process.env.GOOGLE_API_KEY,
                        language: 'en'
                    }}/>
                </ThemedView>
                
                <TouchableOpacity style={styles.locationContainer} onPress={()=> getCurrentLocation()}>
                  <ThemedView style={{marginRight: 5}}>
                      <MaterialIcons name='my-location' size={16} color={'#1184e8'} />
                  </ThemedView>
                  <ThemedText style={styles.myLocationText}>{t('my.current.location')}</ThemedText>            
                    
                </TouchableOpacity>
                {originDirection ? 
                <ThemedView style={styles.getDirectionBody}>
                    <TouchableOpacity onPress={()=> getDirections()}>
                        <ThemedText>{t('get.directions')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>: null}
                {loadingDirections ? 
                <ThemedView>
                  <ThemedText>{t('loading.directions')}</ThemedText>
                  <ActivityIndicator />
                </ThemedView>: null}
                {loadingDirectionsError ? 
                <ThemedView><ThemedText>{loadingDirectionsError}</ThemedText></ThemedView>: 
                null}
                <ThemedView style={styles.externalMapBody}>
                  <View></View>
                  <TouchableOpacity style={styles.openMapsButton} onPress={()=> openExternalMap()}>
                    <ThemedText>{t('open.maps')}</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    
  },
  myLocationText: {
    marginLeft: 3,
    color: 'gray',
    marginVertical: 5
  },
  getDirectionBody: {
    borderWidth: 0.5,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'gray'
  },
  externalMapBody: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  openMapsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderRadius: 10
  }
   
})