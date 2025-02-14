import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useLanguage} from '../../context/LanguageContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostAgeRestriction({ageRestriction, handleAddRemoveAgeGroup}: {ageRestriction: string [], handleAddRemoveAgeGroup: (item: string) => void}) {

  const colorScheme = useColorScheme();
  const {t} = useLanguage()


    return (
        <ThemedView style={styles.container}>
              <ThemedView>
                <ThemedText type='defaultSemiBold'>{t('age.restriction')}</ThemedText>
                <ThemedView style={styles.adultBody}>
                    <ThemedText>{t('adult')}</ThemedText>
                    <ThemedText>18+</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.adultBody} onPress={()=> handleAddRemoveAgeGroup('adolescent')}>
                    {ageRestriction.includes('adolescent') ?
                     <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                     :
                    <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                    <ThemedText style={styles.ageGroupTitle}>{t('adolescent')}</ThemedText>
                    <ThemedText style={styles.ageDetailsText}>13 - 17</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adultBody} onPress={()=> handleAddRemoveAgeGroup('child')}>
                {ageRestriction.includes('child') ?
                     <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                     :
                    <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                    <ThemedText style={styles.ageGroupTitle}>{t('child')}</ThemedText>
                    <ThemedText style={styles.ageDetailsText}>0 - 12</ThemedText>
                </TouchableOpacity>
              </ThemedView>
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        padding: 10,
        marginTop: 10
      },
      adultBody: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.95,
        padding: 5,
        borderColor: 'gray'
      },
      ageGroupTitle: {
        marginHorizontal: 5
      },
      ageDetailsText: {
        color: 'gray'
      }
   
})