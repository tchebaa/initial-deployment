import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostPhotoUpload({mainImage, image2, image3, image4, handlePickImage}: 
    {mainImage: string, image2: string, image3: string, image4: string, handlePickImage: (item: string) => void}) {



    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={()=>handlePickImage("mainImage")} style={styles.imagePickerA}>
                <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>pickImage</ThemedText>
            </TouchableOpacity>
            {mainImage ? <ImageBackground style={styles.mainImage} source={{uri: mainImage}}/>: null}
            {mainImage ? <ImageBackground style={styles.mainImage} source={{uri: mainImage}}  blurRadius={10} resizeMode='cover'>
                        
                            <ImageBackground style={styles.eventImageRatioB} source={{uri: mainImage}} borderRadius={10} ></ImageBackground>
                        </ImageBackground>: null}
            {mainImage ? <ImageBackground style={styles.mainImage} source={{uri: mainImage}}  blurRadius={10} resizeMode='cover'>
                        

                            <ImageBackground style={styles.eventImageRatioC} source={{uri: mainImage}} borderRadius={10} ></ImageBackground>
                        </ImageBackground>: null}
            </ScrollView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100
    },
    mainImage:{
        width: windowWidth * 0.95,
        height: 200,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePickerA: {
        width: windowWidth * 0.95,
        height: 200,
        borderWidth: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10
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
   
})