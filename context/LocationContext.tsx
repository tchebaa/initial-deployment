
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';





interface IEventContextValue {
    userLocation?:{latitude: number, longitude: number} | null
    userAddress?: string
    loadingAddress: boolean
    loadingLocation: boolean
    setLoadingAddress: (data: boolean) => void
    setUserLocation:(data:{latitude: number, longitude: number}) => void
    setUserAddress:(data:string) => void,
  
}


const initialList: IEventContextValue = {
    userAddress: '',
    userLocation: null,
    loadingLocation: true,
    loadingAddress: false,
    setLoadingAddress(data) {},
    setUserLocation: (data) => {},
    setUserAddress:(data) => {},
    
  }



const LocationContext = createContext<IEventContextValue>(initialList);

   

export function useLocation () {
    return (useContext(LocationContext))
}

type ChildrenProps = { children?: ReactNode };


export function LocationProvider({children}: ChildrenProps) {

  const [userAddress, setUserAddress] = useState<string>('')
  const [userLocation, setUserLocation] = useState<{latitude: number , longitude: number} | null >(null)
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true)
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false)

  const handleChangeLocation = async () => {

    try{

      const locationString = JSON.stringify(userLocation)

      await AsyncStorage.setItem('locationString', locationString);

    } catch(e) {

    }

  }

  const handleGetLocation = async () => {

    setLoadingLocation(true)

    try {

      const value = await AsyncStorage.getItem('locationString');

      if (value !== null) {

        const parsedValue = JSON.parse(value)

        setUserLocation(parsedValue)
        setLoadingLocation(false)
        // value previously stored
      } else {
        setLoadingLocation(false)
      }

    } catch(e) {

      setLoadingLocation(false)

    }
  }

  useEffect(()=> {

    handleGetLocation()

  },[])

  useEffect(()=> {
    if(userLocation && !loadingLocation) {
        getUserAddress()
        handleChangeLocation()

        //await AsyncStorage.setItem('location', item);     

    }
  },[userLocation, loadingLocation])
 


  async function getLocationPermission() {

    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setUserAddress('Permission to access location was denied');

        return;
      }
  }

  async function getUserAddress() {

    try {
        let street
        let district
        let city
        let country

        //Pick<LocationGeocodedLocation, "latitude" | "longitude">

        setLoadingAddress(true)

        if (userLocation?.latitude !== undefined && userLocation?.longitude !== undefined) {
          const description = await Location.reverseGeocodeAsync({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          });

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
        
        setUserAddress(street + district + city + country)
        setLoadingAddress(false)
        
          // Use description here
        }

        //const description = await Location.reverseGeocodeAsync({latitude: userLocation?.latitude, longitude: userLocation.longitude}) 

        

    } catch(error) {
        console.log(error)
        setUserAddress('Error getting description')
        setLoadingAddress(false)
    }
  }




  return(
    <LocationContext.Provider value={{userAddress, setUserAddress, userLocation, setUserLocation, loadingAddress, setLoadingAddress, loadingLocation}} >{children}</LocationContext.Provider>
  )

}