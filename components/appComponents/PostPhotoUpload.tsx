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





export default function PostPhotoUpload({mainImage, image2, image3, image4, handlePickImage, imageRatioModal, handleOpenImageRatioModal, setImageRatioModal }: 
    {mainImage: string, image2: string, image3: string, image4: string, handlePickImage: (item: string) => void, imageRatioModal: boolean, 
        setImageRatioModal: Dispatch<SetStateAction<boolean>>, handleOpenImageRatioModal: (item: string) => void}) {



    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={()=>handleOpenImageRatioModal('mainImage')} style={styles.imagePickerA}>
                <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Main Image</ThemedText>
                <ThemedText style={styles.imageDetailsText}>(required)</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleOpenImageRatioModal('Image2')} style={styles.imagePickerA}>
                <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Image 2</ThemedText>
                <ThemedText style={styles.imageDetailsText}>(optional)</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleOpenImageRatioModal('Image3')} style={styles.imagePickerA}>
                <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Image 3</ThemedText>
                <ThemedText style={styles.imageDetailsText}>(optional)</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleOpenImageRatioModal('Image4')} style={styles.imagePickerA}>
                <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Image 4</ThemedText>
                <ThemedText style={styles.imageDetailsText}>(optional)</ThemedText>
            </TouchableOpacity>
            {imageRatioModal ? 
            <ThemedView style={styles.aspectRatioModal}>
                <ThemedView style={styles.closeSection}>
                    <View>
                        <ThemedText type='default'>Select Image Aspect Ratio</ThemedText>
                    </View>
                    <TouchableOpacity onPress={()=> setImageRatioModal(false)}><AntDesign name='closesquareo' size={24} color={'black'} /></TouchableOpacity>
                </ThemedView>
                <TouchableOpacity style={styles.aspectRatioA}>
                    <ThemedText>16:9</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.aspectRatioB}>
                    <ThemedText>1:1</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.aspectRatioC}>
                    <ThemedText>4:3</ThemedText>
                </TouchableOpacity>
            </ThemedView> : null}
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
        marginTop: 10,
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
        marginTop: 10
      },
      imageDetailsText: {
        color: 'gray'
      }
   
})