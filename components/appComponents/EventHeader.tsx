import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link, router } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function EventHeader({item}) {

    const [likedEvents, setLikedEvents] = useState([])


    return (
        <ThemedView style={styles.container}>
              <Pressable onPress={()=> router.back()}>
                <AntDesign name='arrowleft' size={24}/>
              </Pressable>
              <Pressable>
                {likedEvents.includes(item) ? <AntDesign name='heart' size={20} color="#ce2029"/> : <AntDesign name='hearto' size={20}/> }
              </Pressable>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: windowWidth,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  }
   
})