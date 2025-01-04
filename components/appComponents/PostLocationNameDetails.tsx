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





export default function PostLocationNameDetails({eventName, setEventName, eventDescription, setEventDescription, eventNameError, eventDescriptionError}: {eventName: string, setEventName: Dispatch<SetStateAction<string>>,
    eventDescription: string, setEventDescription: Dispatch<SetStateAction<string>>, eventNameError: boolean, eventDescriptionError: boolean
}) {


    



    return (
        <ThemedView style={styles.container}>
            <ThemedView>
                <ThemedText type='defaultSemiBold'>Location</ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText type='defaultSemiBold'>Event name</ThemedText>
                <TextInput style={styles.inputContainer} placeholder='Event name' value={eventName} onChangeText={(e)=> setEventName(e)}/>
            </ThemedView>
            {eventNameError ? <ThemedText>Event name required</ThemedText>: <ThemedText></ThemedText>}
            <ThemedView>
                <ThemedText type='defaultSemiBold'>Event Description</ThemedText>
                <TextInput style={styles.descriptionTextAreaInput} multiline={true} placeholder='Event description' value={eventDescription} onChangeText={(e)=> setEventDescription(e)}/>
            </ThemedView>
            {eventNameError ? <ThemedText>Event description required</ThemedText>: <ThemedText></ThemedText>}
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        padding: 10,
        marginTop: 10
      },
      inputContainer: {
        borderWidth: 0.5,
        fontFamily:"PoppinsSemibold",
        width: '95%',
        marginTop: 10
      },
      descriptionTextAreaInput: {
        borderWidth: 0.5,
        fontFamily:"PoppinsSemibold",
        width: '95%',
        marginTop: 10
      }
   
})