
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';

import * as Location from 'expo-location';





interface IEventContextValue {
    userLocation?:{latitude: number, longitude: number} | null
    userAddress?: string
    loadingAddress: boolean
    setLoadingAddress: (data: boolean) => void
    setUserLocation:(data:{latitude: number, longitude: number}) => void
    setUserAddress:(data:string) => void,
  
}


const initialList: IEventContextValue = {
    userAddress: '',
    userLocation: null,
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
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null >(null)
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false)

  

  useEffect(()=> {
    if(userLocation) {

        getUserAddress()
        

    }
  },[userLocation])


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

        

        const description = await Location.reverseGeocodeAsync({latitude: userLocation.latitude, longitude: userLocation.longitude}) 

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

    } catch(error) {
        console.log(error)
        setUserAddress('Error getting description')
        setLoadingAddress(false)
    }
  }




  return(
    <LocationContext.Provider value={{userAddress, setUserAddress, userLocation, setUserLocation, loadingAddress, setLoadingAddress}} >{children}</LocationContext.Provider>
  )

}