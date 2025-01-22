import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import moment from 'moment';
import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventTicketBody({item, screenType}: {screenType: string | string []}) {

   


    return (
        <ThemedView>
            
              <Link href={{pathname: '/(tabs)/tickets/event', params: {screenType: 'tickets', id: item._id}}} asChild>
                <TouchableOpacity  style={styles.eventBody2}>
                      {item.eventMainImage.aspectRatio === 'a'  ? 
                      <ImageBackground style={styles.eventImage2} source={{uri: item.eventMainImage.url}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                          <View style={styles.eventforeground}>
                            <View style={styles.eventImageBody}>
                                <ImageBackground style={styles.eventImageRatioA} source={{uri: item.eventMainImage.url}} borderRadius={5} ></ImageBackground>
                            </View>
                            
                            <View style={styles.eventDetailsContainer}>
                                <View style={styles.eventDetailsBody}>
                                    <View style={styles.detailsBackground}></View>
                                    <View style={styles.detailsBodyText}>
                                        <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={2}>{item.eventName}</ThemedText>
                                        <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                        <ThemedText>4 Tickets</ThemedText>
                                        <ThemedText>{moment("2025-01-13T00:00:00.000Z").format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                        
                                    </View>
                                    
                                </View>
                            </View>
                                
                          </View>
                          
                      </ImageBackground> : null}
                      {item.eventMainImage.aspectRatio === 'b'  ? 
                      <ImageBackground style={styles.eventImage2} source={{uri: item.eventMainImage.url}} borderRadius={10} blurRadius={10} resizeMode='cover' >
                          <View style={styles.eventforeground}>
                            <View style={styles.eventImageBody}>
                                <ImageBackground style={styles.eventImageRatioB} source={{uri: item.eventMainImage.url}} borderRadius={5} ></ImageBackground>
                            </View>
                            
                            <View style={styles.eventDetailsContainer}>

                                <View style={styles.eventDetailsBody}>
                                    <View style={styles.detailsBackground}></View>
                                    <View style={styles.detailsBodyText}>
                                        <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={2}>{item.eventName}</ThemedText>
                                        <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                        <ThemedText>4 Tickets</ThemedText>
                                        <ThemedText>{moment("2025-01-13T00:00:00.000Z").format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                    </View>
                                    
                                </View>
                            </View>
                                
                          </View>
                          
                      </ImageBackground> : null}
                      {item.eventMainImage.aspectRatio === 'c'  ? 
                      <ImageBackground style={styles.eventImage2} source={{uri: item.eventMainImage.url}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                        
                        <View style={styles.eventforeground}>
                            <View style={styles.eventImageBody}>
                                <ImageBackground style={styles.eventImageRatioC} source={{uri: item.eventMainImage.url}} borderRadius={5} ></ImageBackground>
                            </View>
                            
                            <View style={styles.eventDetailsContainer}>
                                <View style={styles.eventDetailsBody}>
                                    <View style={styles.detailsBackground}></View>
                                    <View style={styles.detailsBodyText}>
                                        <ThemedText style={styles.eventNameText} type='boldSmallTitle' numberOfLines={2}>{item.eventName}</ThemedText>
                                        <ThemedText style={styles.eventAddressText}>{item.eventAddress}</ThemedText>
                                        <ThemedText>4 Tickets</ThemedText>
                                        <ThemedText>{moment("2025-01-13T00:00:00.000Z").format('MMMM Do YYYY, h:mm a')}</ThemedText>
                                    </View>
                                    
                                </View>
                            </View>
                                
                          </View>
                      </ImageBackground> : null}
                      
                  </TouchableOpacity>
                </Link>

            
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  eventImage: {
    width: windowWidth * 0.95,
    height: 200,
  
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 0.5,
   
    borderColor: 'gray',
    alignItems: 'center'
    
    
  },
  eventImage2: {
    width: windowWidth * 0.95,
    height: 200,
  
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray'
    
  },
  
  eventImageRatioA: {
    width: 140,
    height: 80,
    marginLeft: 20,
    
  },
  eventImageRatioB: {
    width: 140,
    height: 140,
    marginLeft: 20,
    
    
  },
  
  eventImageRatioC: {
    width: 100,
    height: 160,
    marginLeft: 20,
   
    
  },
  
  eventBody: {
    
    
    borderRadius: 10,
    
  
    
  },
  eventBody2: {
   flexDirection: 'row',
   
   justifyContent: 'space-between' ,
   
   width: windowWidth * 0.95,
   marginBottom: 10
  },
 
  headerBody: {
    flexDirection: 'column',
    width: windowWidth ,
   
    alignItems: 'center'
  },
  
 
  eventNameText: {
    fontWeight: '600',
    fontSize: 15,
    flexWrap: 'wrap'
  },
  
  eventHeaderText: {
    fontWeight: '700'
  },
  eventDetailsBody: {
    
    
    
    
    borderColor: 'gray',
    width: '90%',
    
    height: '100%'
    
  },
  eventDetailsBody2: {
    
    
    margin: 5,
    
    borderColor: 'gray',
    width: '95%'
  },
  
  eventAddressText: {
    marginTop: 3,
    flexWrap: 'wrap'
  },
  
  detailsBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.85,
    
    borderWidth: 0.5,
    borderColor: 'gray',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  detailsBodyText:{
    padding: 10
  },
  
  eventforeground: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: '100%'
  },
  eventDetailsContainer: {
   
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    
    width: '60%',
   
  },
  eventImageBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '40%'
  }
 
   
})