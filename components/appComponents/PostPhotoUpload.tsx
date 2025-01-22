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





export default function PostPhotoUpload({mainImage, image2, image3, image4, handlePickImage, imageRatioModal, handleOpenImageRatioModal, setImageRatioModal, 
    mainImageAspectRatio, image2AspectRatio, image3AspectRatio, image4AspectRatio, setMainImage, setImage4, setImage2, setImage3, handleRemoveImage, mainImageError
 }: 
    {mainImage: string, image2: string, image3: string, image4: string, handlePickImage: (item: string) => void, imageRatioModal: boolean, 
        setImageRatioModal: Dispatch<SetStateAction<boolean>>, handleOpenImageRatioModal: (item: string) => void, mainImageAspectRatio: string,
    image2AspectRatio: string, image3AspectRatio: string, image4AspectRatio: string, setMainImage: Dispatch<SetStateAction<string>>, 
    setImage4: Dispatch<SetStateAction<string>>, setImage2: Dispatch<SetStateAction<string>>, setImage3: Dispatch<SetStateAction<string>>, mainImageError: boolean,
handleRemoveImage: (item: string) => void}) {

    


    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            {mainImage ?
                <ThemedView>
                    {mainImageAspectRatio === 'a' ? 
                    <ImageBackground style={styles.mainImage} borderRadius={10} source={{uri: mainImage}}>
                        <View style={styles.closeSection}>
                            <View></View>
                            <ThemedView>
                                <TouchableOpacity onPress={()=> handleRemoveImage('mainImage')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                            </ThemedView>
                            
                        </View>
                    </ImageBackground>: null}
                    {mainImageAspectRatio === 'b' ? 
                    <ImageBackground style={styles.mainImage} source={{uri: mainImage}} borderRadius={10}  blurRadius={10} resizeMode='cover'> 
                        <View style={styles.closeSection}>
                            <View></View>
                            <ThemedView>
                                <TouchableOpacity onPress={()=> handleRemoveImage('mainImage')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                            </ThemedView>
                            
                        </View> 
                        <ImageBackground style={styles.eventImageRatioB} source={{uri: mainImage}} borderRadius={10} ></ImageBackground>
                    </ImageBackground>: null}
                    {mainImageAspectRatio === 'c' ? 
                    <ImageBackground style={styles.mainImage} source={{uri: mainImage}} borderRadius={10}  blurRadius={10} resizeMode='cover'>
                        <View style={styles.closeSection}>
                            <View></View>
                            <ThemedView>
                                <TouchableOpacity onPress={()=> handleRemoveImage('mainImage')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                            </ThemedView>
                            
                        </View>
                        <ImageBackground style={styles.eventImageRatioC} source={{uri: mainImage}} borderRadius={10} ></ImageBackground>
                    </ImageBackground>: null}
                </ThemedView> 
                : 
                <TouchableOpacity onPress={()=>handleOpenImageRatioModal('mainImage')} style={styles.imagePickerA}>
                    <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Main Image</ThemedText>
                    <ThemedText style={styles.imageDetailsText}>(required)</ThemedText>
                </TouchableOpacity>}
                {mainImageError ? <ThemedText>Main Image required</ThemedText>: <ThemedText></ThemedText>}
            {image2 ? 
                <ThemedView>
                {image2AspectRatio === 'a' ? <ImageBackground style={styles.mainImage} borderRadius={10} source={{uri:image2}}>
                <View style={styles.closeSection}>
                    <View></View>
                    <ThemedView>
                        <TouchableOpacity onPress={()=> handleRemoveImage('Image2')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                    </ThemedView>
                    
                </View>
                </ImageBackground>: null}
                {image2AspectRatio === 'b' ? 
                <ImageBackground style={styles.mainImage} source={{uri: image2}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                    <View style={styles.closeSection}>
                        <View></View>
                        <ThemedView>
                            <TouchableOpacity onPress={()=> handleRemoveImage('Image2')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                        </ThemedView>
                        
                    </View>  
                    <ImageBackground style={styles.eventImageRatioB} source={{uri: image2}} borderRadius={10} ></ImageBackground>
                </ImageBackground>: null}
                {image2AspectRatio === 'c' ? 
                <ImageBackground style={styles.mainImage} source={{uri: image2}} borderRadius={10}  blurRadius={10} resizeMode='cover'>
                    <View style={styles.closeSection}>
                        <View></View>
                        <ThemedView>
                            <TouchableOpacity onPress={()=> handleRemoveImage('Image2')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                        </ThemedView>
                        
                    </View>
                    <ImageBackground style={styles.eventImageRatioC} source={{uri: image2}} borderRadius={10} ></ImageBackground>
                </ImageBackground>: null}
                </ThemedView> : 
                <TouchableOpacity onPress={()=>handleOpenImageRatioModal('Image2')} style={styles.imagePickerA}>
                    <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Image 2</ThemedText>
                    <ThemedText style={styles.imageDetailsText}>(optional)</ThemedText>
                </TouchableOpacity>}
            {image3 ? 
                <ThemedView>
                {image3AspectRatio === 'a' ? <ImageBackground style={styles.mainImage} borderRadius={10} source={{uri:image3}}>
                <View style={styles.closeSection}>
                    <View></View>
                    <ThemedView>
                        <TouchableOpacity onPress={()=> handleRemoveImage('Image3')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                    </ThemedView>
                    
                </View>
                </ImageBackground>: null}
                {image3AspectRatio === 'b' ? 
                <ImageBackground style={styles.mainImage} source={{uri: image3}}  blurRadius={10} borderRadius={10} resizeMode='cover'> 
                    <View style={styles.closeSection}>
                        <View></View>
                        <ThemedView>
                            <TouchableOpacity onPress={()=> handleRemoveImage('Image3')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                        </ThemedView>
                        
                    </View> 
                    <ImageBackground style={styles.eventImageRatioB} source={{uri: image3}} borderRadius={10} ></ImageBackground>
                </ImageBackground>: null}
                {image3AspectRatio === 'c' ? 
                <ImageBackground style={styles.mainImage} source={{uri: image3}} borderRadius={10} blurRadius={10} resizeMode='cover'>
                    <View style={styles.closeSection}>
                        <View></View>
                        <ThemedView>
                            <TouchableOpacity onPress={()=> handleRemoveImage('Image3')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                        </ThemedView>
                        
                    </View>
                    <ImageBackground style={styles.eventImageRatioC} source={{uri: image3}} borderRadius={10} ></ImageBackground>
                </ImageBackground>: null}
                </ThemedView>
                : 
                <TouchableOpacity onPress={()=>handleOpenImageRatioModal('Image3')} style={styles.imagePickerA}>
                    <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Image 3</ThemedText>
                    <ThemedText style={styles.imageDetailsText}>(optional)</ThemedText>
                </TouchableOpacity>
            }
            {image4 ? 
                <ThemedView>
                {image4AspectRatio === 'a' ? <ImageBackground style={styles.mainImage} source={{uri:image4}}>
                <View style={styles.closeSection}>
                    <View></View>
                    <ThemedView>
                        <TouchableOpacity onPress={()=> handleRemoveImage('Image4')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                    </ThemedView>
                    
                </View>
                </ImageBackground>: null}
                {image4AspectRatio === 'b' ? 
                <ImageBackground style={styles.mainImage} source={{uri: image4}}  blurRadius={10} resizeMode='cover'>
                    <View style={styles.closeSection}>
                        <View></View>
                        <ThemedView>
                            <TouchableOpacity onPress={()=> handleRemoveImage('Image4')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                        </ThemedView>
                        
                    </View>  
                    <ImageBackground style={styles.eventImageRatioB} source={{uri: image4}} borderRadius={10} ></ImageBackground>
                </ImageBackground>: null}
                {image4AspectRatio === 'c' ? 
                <ImageBackground style={styles.mainImage} source={{uri: image4}}  blurRadius={10} resizeMode='cover'>
                    <View style={styles.closeSection}>
                        <View></View>
                        <ThemedView>
                            <TouchableOpacity onPress={()=> handleRemoveImage('Image4')}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>
                        </ThemedView>
                        
                    </View>
                    <ImageBackground style={styles.eventImageRatioC} source={{uri: image4}} borderRadius={10} ></ImageBackground>
                </ImageBackground>: null}
                </ThemedView>
                : 
                <TouchableOpacity onPress={()=>handleOpenImageRatioModal('Image4')} style={styles.imagePickerA}>
                    <ThemedText style={{borderWidth: 1, borderColor: 'white'}}>Image 4</ThemedText>
                    <ThemedText style={styles.imageDetailsText}>(optional)</ThemedText>
                </TouchableOpacity>
            }
            
            {imageRatioModal ? 
            <ThemedView style={styles.aspectRatioModal}>
                <ThemedView style={styles.closeSection}>
                    <View>
                        <ThemedText type='default'>Select Image Aspect Ratio</ThemedText>
                    </View>
                    <TouchableOpacity onPress={()=> setImageRatioModal(false)}><AntDesign name='closesquareo' size={24} color={'black'} /></TouchableOpacity>
                </ThemedView>
                <TouchableOpacity style={styles.aspectRatioA} onPress={()=> handlePickImage('a')}>
                    <ThemedText>16:9</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.aspectRatioB} onPress={()=> handlePickImage('b')}>
                    <ThemedText>1:1</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.aspectRatioC} onPress={()=> handlePickImage('c')}>
                    <ThemedText>4:3</ThemedText>
                </TouchableOpacity>
            </ThemedView> : null}
            <TouchableOpacity onPress={()=> handleChangeBlob()}><ThemedText>convert</ThemedText></TouchableOpacity>
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