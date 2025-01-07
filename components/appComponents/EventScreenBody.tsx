import {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { Link, router } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventScreenBody({item, screenType}) {


  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [mapReady, setMapReady] = useState(false);
	const [forceReload, setForceReload] = useState(0);

  const mapRef = useRef(null)


  const [mapRegion, setMapRegion] = useState({
    latitude: Number(item.location.coordinates[1].$numberDecimal),
    longitude: Number(item.location.coordinates[0].$numberDecimal),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005, 
  })


  useEffect(()=> {

    if(mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 1000)
    }

  },[mapRef, mapRegion])



	useEffect(() => {
		const timer = setTimeout(() => {
			if (!mapReady) {
				console.warn('Map was not ready within 1 second. Forcing re-render.');
				setForceReload((prev) => prev + 1);
			}
		}, 2000);

		return () => clearTimeout(timer);
	}, [mapReady]);
	


    return (
        <ThemedView style={styles.container}>
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
                    <TouchableOpacity onPress={()=> setShowModalMap(false)}>
                      <ThemedView>
                        <AntDesign name='close' size={24} color={'black'} />
                      </ThemedView>
                      
                    </TouchableOpacity>
                  </View>
                    <MapView key={forceReload} style={styles.mapStyle} ref={mapRef} initialRegion={mapRegion} >
                    
                    <Marker coordinate={{latitude:Number(item.location.coordinates[1].$numberDecimal), longitude:Number(item.location.coordinates[0].$numberDecimal)}}
                    ></Marker>
                  </MapView>
                </ThemedView>
                
            </ThemedView>
            {showModalMap ? 
            <ThemedView style={styles.mapModal}>
              <View style={styles.mapButtonBody}>
                <View></View>
                <TouchableOpacity onPress={()=> setShowModalMap(false)}>
                  <ThemedView>
                    <AntDesign name='close' size={24} color={'black'} />
                  </ThemedView>
                  
                </TouchableOpacity>
              </View>
              <MapView style={styles.mapModalStyle}  initialRegion={mapRegion} ></MapView>
              
              <Marker  coordinate={{latitude:Number(item.location.coordinates[1].$numberDecimal), longitude:Number(item.location.coordinates[0].$numberDecimal)}}
                 ></Marker>
            </ThemedView>: null}
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
   width: windowWidth,
   marginBottom: 100
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
    height: 500
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
  
})