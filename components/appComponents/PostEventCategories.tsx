import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';
import { Pressable } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostEventCategories({selectedCategories, handleAddRemoveCategory, eventCategories}: 
  {selectedCategories: string [], handleAddRemoveCategory: (item: string) => void, eventCategories: {name: string, title: string}[]}) {



    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.categoryHeaderSection}>
                <ThemedText type='defaultSemiBold'>Category</ThemedText>
                <ThemedText style={styles.limitText}>min 1 - max -4 </ThemedText>
            </ThemedView>
              <ThemedView style={styles.categoriesBody}>
                {eventCategories.map((item, i)=> {
                    return(
                        <TouchableOpacity key={i} onPress={()=> handleAddRemoveCategory(item.name)}>
                            {selectedCategories.indexOf(item.name) > 0 ? 
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
  }
   
})