import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useLanguage} from '../../context/LanguageContext'
import { Link } from 'expo-router';
import {useColorScheme} from '../../hooks/useColorScheme'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostEventPerson({personType, setPersonType, companyName, setCompanyName, companyEmail, setCompanyEmail, companyNameError, 
  companyEmailError, personName, setPersonName, personNameError, email, setEmail, screenName, emailError}: 
    {personType: boolean, setPersonType: Dispatch<SetStateAction<boolean>>, companyName: string, setCompanyName: Dispatch<SetStateAction<string>>, companyEmail: string,
        setCompanyEmail: Dispatch<SetStateAction<string>>, companyNameError: boolean, companyEmailError: boolean, personName: string, setPersonName:Dispatch<SetStateAction<string>>,
        personNameError: boolean, email: string, setEmail: Dispatch<SetStateAction<string>>, screenName: string, emailError: boolean
    }) {


    const colorScheme = useColorScheme();
    const {t} = useLanguage()

    return (
        <ThemedView style={styles.container}>
          {screenName === 'admin' ? 
          <ThemedView>
            <ThemedText>{t('event.organizer')}</ThemedText>
            <TextInput placeholder={t('email')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]} value={email} onChangeText={(e)=> setEmail(e)}/>
            { emailError ? <ThemedText style={styles.errorText}>{t('email.required')}</ThemedText>: null}
          </ThemedView>
          : null
          }
              {personType ? 
              <ThemedText style={{marginTop: 10}}>{t('i.am.an')}</ThemedText> 
              :
              <ThemedText style={{marginTop: 10}}>{t('i.am.a')}</ThemedText>
              }
              <ThemedView style={styles.buttonComponent}>
                <Pressable style={styles.radioButton} onPress={()=> setPersonType(!personType)}>
                    {personType ? 
                    <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                    :
                    <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>
                    }
                    <ThemedText style={styles.buttonText}>{t('individual')}</ThemedText>
                </Pressable>
                <Pressable style={styles.radioButton} onPress={()=> setPersonType(!personType)}>
                    {!personType ? 
                    <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                    :
                    <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/> 
                    }
                    <ThemedText style={styles.buttonText}>{t('company')}</ThemedText>
                </Pressable>
              </ThemedView>
              {!personType ? 
              <ThemedView style={styles.companyInputComponent}>
                <TextInput placeholder={t('company.name')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]} value={companyName} onChangeText={(e)=> setCompanyName(e)}/>
                {!companyNameError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>{t('company.name.required')}</ThemedText>}
                <TextInput placeholder={t('company.email')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]}  value={companyEmail} onChangeText={(e)=> setCompanyEmail(e)}/>
                {!companyEmailError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>{t('company.email.required')}</ThemedText>}
              </ThemedView> : 
              <ThemedView style={styles.companyInputComponent}>
                <TextInput placeholder={t('my.name')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'}  style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]}  value={personName} onChangeText={(e)=> setPersonName(e)}/>
                {!personNameError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>{t('your.name.is.required')}</ThemedText>}
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
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    
    
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
})