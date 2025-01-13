import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import {useLocation} from '../context/LocationContext'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function LocationScreen() {


    const [locationPermission, setLocationPermission] = useState(false)
    
    const router = useRouter()

    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    async function getCurrentLocation() {
      
      let location = await Location.getCurrentPositionAsync({});
      
      setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
    }

    async function getLocationPermission() {
    
        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {

            setLocationPermission(false)
    
            return;
          }
          setLocationPermission(true)
      }

    async function checkPermissions () {

      const status = await Location.getForegroundPermissionsAsync()
      console.log(status)

    }

    useEffect(()=> {

    },[locationPermission])

    useEffect(()=> {

      getLocationPermission()
      
    },[])
    
  

  return (
    <SafeAreaView style={styles.container}>
        {locationPermission ? 
        <ThemedView style={styles.body}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" >Events in...</ThemedText>
               
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Location</ThemedText>
                
            </ThemedView>
            <ThemedView style={styles.locationContainer}>
              <MaterialIcons name='location-on' size={24} color={'#1184e8'} />
              <GooglePlacesAutocomplete
                placeholder='Search location' 
                nearbyPlacesAPI='GooglePlacesSearch'
                minLength={2}
                onPress={(data, details = null)=>{

                    console.log(details)
                    console.log(details.geometry.location.lat, details.geometry.location.lng)
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
                    }
                }}
                enablePoweredByContainer={false}
                query={{
                    key: 'AIzaSyCGzT9TA6GF716zU_JaSqprPUEaBoA9wgk',
                    language: 'en'
                }}/>
            </ThemedView>
            
            <ThemedView style={styles.locationContainer}>
              <ThemedView style={{marginRight: 5}}>
                  <MaterialIcons name='my-location' size={24} color={'#1184e8'} />
              </ThemedView>
              <TouchableOpacity>
                  <ThemedText style={styles.myLocationText}>My current location</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <Link href={"/(tabs)/home"}>
                <ThemedText >Skip</ThemedText>
              </Link>
            
            
            
            
        </ThemedView>:
        <ThemedView style={styles.body}>
          <ThemedText style={styles.locationHeaderText} type='boldSmallTitle'>Location is required to use this app</ThemedText>
          <TouchableOpacity style={styles.grantPermissionButton}>
            <ThemedText>Grant permission</ThemedText>
          </TouchableOpacity>
        </ThemedView>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? 20 : 0,
        marginTop:10,
        width: windowWidth,
        
        
    },
    body: {
        width: windowWidth,
        padding: 5,
        height: '100%',
        alignItems: 'center',
        
    },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width:"95%",
    marginTop: 40
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: '95%'
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    fontFamily:"PoppinsSemibold",
    width: '80%',
    
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginTop: 40,
    marginBottom: 20
  },
  myLocationText: {
    marginLeft: 5,
    color: 'gray'
  },
  locationHeaderText: {
    marginVertical: 40
  },
  grantPermissionButton: {
    borderWidth: 0.5,
    color: 'gray',
    padding: 5,
    borderRadius: 10
  }
  
  
});
