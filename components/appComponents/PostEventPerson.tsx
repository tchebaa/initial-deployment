import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostEventPerson({personType, setPersonType, companyName, setCompanyName, companyEmail, setCompanyEmail, companyNameError, 
  companyEmailError, personName, setPersonName, personNameError}: 
    {personType: boolean, setPersonType: Dispatch<SetStateAction<boolean>>, companyName: string, setCompanyName: Dispatch<SetStateAction<string>>, companyEmail: string,
        setCompanyEmail: Dispatch<SetStateAction<string>>, companyNameError: boolean, companyEmailError: boolean, personName: string, setPersonName:Dispatch<SetStateAction<string>>,
        personNameError: boolean
    }) {



    return (
        <ThemedView style={styles.container}>

              {personType ? 
              <ThemedText>I am an..</ThemedText> 
              :
              <ThemedText>I am a..</ThemedText>
              }
              <ThemedView style={styles.buttonComponent}>
                <Pressable style={styles.radioButton} onPress={()=> setPersonType(!personType)}>
                    {personType ? 
                    <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                    :
                    <MaterialCommunityIcons name='radiobox-blank' size={16}/>
                    }
                    <ThemedText style={styles.buttonText}>Individual</ThemedText>
                </Pressable>
                <Pressable style={styles.radioButton} onPress={()=> setPersonType(!personType)}>
                    {!personType ? 
                    <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                    :
                    <MaterialCommunityIcons name='radiobox-blank' size={16}/> 
                    }
                    <ThemedText style={styles.buttonText}>Company</ThemedText>
                </Pressable>
              </ThemedView>
              {!personType ? 
              <ThemedView style={styles.companyInputComponent}>
                <TextInput placeholder='Company Name' style={styles.inputContainer} value={companyName} onChangeText={(e)=> setCompanyName(e)}/>
                {!companyNameError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>Company name required</ThemedText>}
                <TextInput placeholder='Company Email' style={styles.inputContainer} value={companyEmail} onChangeText={(e)=> setCompanyEmail(e)}/>
                {!companyEmailError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>Company email required</ThemedText>}
              </ThemedView> : 
              <ThemedView style={styles.companyInputComponent}>
                <TextInput placeholder='My name' style={styles.inputContainer} value={personName} onChangeText={(e)=> setPersonName(e)}/>
                {!personNameError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>Your name is required</ThemedText>}
              </ThemedView>}
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginTop: 10
  },
  buttonComponent: {
    marginTop: 10
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  buttonText: {
    marginLeft: 5
  },
  companyInputComponent: {
    marginTop: 10
  },
  inputContainer: {
    borderWidth: 0.5,
    fontFamily:"default",
    width: '95%',
    marginTop: 10
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
})