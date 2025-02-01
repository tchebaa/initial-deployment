import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useLanguage} from '../../context/LanguageContext'
import { Link } from 'expo-router';
import { Pressable } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostEventCategories({selectedCategories, handleAddRemoveCategory, eventCategories, categoriesError}: 
  {selectedCategories: string [], categoriesError: boolean, handleAddRemoveCategory: (item: string) => void, eventCategories: {name: string, title: string}[]}) {


    const {t} = useLanguage()

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.categoryHeaderSection}>
                <ThemedText type='defaultSemiBold'>{t('category')}</ThemedText>
                <ThemedText style={styles.limitText}>{t('min.max')}</ThemedText>
            </ThemedView>
              <ThemedView style={styles.categoriesBody}>
                {eventCategories.map((item, i)=> {
                    return(
                        <TouchableOpacity key={i} onPress={()=> handleAddRemoveCategory(item.name)}>
                            {selectedCategories.indexOf(item.name) > -1 ? 
                            <View style={styles.categoryButtonSelected}>
                                <ThemedText>{item.title}</ThemedText>
                            </View>
                            : 
                            <View  style={styles.categoryButtonUnselected}>
                                <ThemedText>{item.title}</ThemedText>
                            </View>}
                        </TouchableOpacity>
                    )
                })}
              </ThemedView>
              {!categoriesError ? <ThemedText></ThemedText> : <ThemedText style={styles.errorText}>{t('categories.required')}</ThemedText>}
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    padding: 10,
    marginTop: 10
  },
  categoryHeaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    
  },
  limitText: {
    marginLeft: 5,
    color: 'gray',
    marginTop: 4
  },
  categoryButtonSelected: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#1184e8',
    borderRadius: 10,
    margin: 5
  },
  categoryButtonUnselected: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    margin: 5
  },
  categoriesBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
   
})