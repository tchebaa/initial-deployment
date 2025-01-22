import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EventScreenBody from './EventScreenBody';

import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostEventPreview({newScreenName, eventData}: {newScreenName: string}) {

    


    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <EventScreenBody item={eventData} screenType={newScreenName} />
            </ScrollView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
        alignItems: 'center',
        marginTop:5
    },
    mainImage:{
        width: windowWidth * 0.95,
        height: 200,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    imagePickerA: {
        width: windowWidth * 0.95,
        height: 200,
        borderWidth: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10,
        borderRadius: 10
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
      aspectRatioModal: {
        borderWidth: 1,
        borderColor: 'gray',
        position: 'absolute',
        marginTop: 100,
        zIndex: 20,
        padding: 5,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center'
        
      },
      aspectRatioB: {
        width: 100,
        height: 100,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      aspectRatioA: {
        width: 200,
        height: 110,
        borderWidth: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
      aspectRatioC: {
        width: 120,
        height: 180,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      closeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        position: 'absolute',
        top: 10
      },
      imageDetailsText: {
        color: 'gray'
      }
   
})