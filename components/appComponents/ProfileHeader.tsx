import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link, router } from 'expo-router';
import {useLanguage} from '../../context/LanguageContext'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function ProfileHeader({pageType}: {pageType: string | string []}) {

  const colorScheme = useColorScheme();
  const {t} = useLanguage()

    return (
        <ThemedView style={styles.container}>
              <Pressable onPress={()=> router.back()}>
                <AntDesign name='arrowleft' size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>
              </Pressable>
              <ThemedView>
                {pageType === 'post'  ? <ThemedText type='boldSmallTitle'>{t('post.event')}</ThemedText> :<ThemedText>{pageType}</ThemedText>}
              </ThemedView>
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