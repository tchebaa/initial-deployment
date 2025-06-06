import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import moment from 'moment';
import { Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function ChatsBody({item}:{item: {lastMessage: string, participants: string[], updatedAt: string, id: string}}) {

  const colorScheme = useColorScheme();


    return (
        <ThemedView style={styles.container}>
        
            <Link href={{pathname: '/(tabs)/profile/chats', params: {conversationId: item.id, screenName: "user"}}} asChild>
                <TouchableOpacity style={styles.chatButton}>
                    <AntDesign name='message1' size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>
                    <ThemedView style={styles.chatDetailsBody}>
                        <ThemedText type='defaultSemiBold'>Stephen Fondo</ThemedText>
                        <ThemedText style={styles.chatText} numberOfLines={1}>{item.lastMessage}</ThemedText>
                        <ThemedView style={styles.dateComponent}>
                          <ThemedView></ThemedView>
                          <ThemedText >{moment(item.updatedAt).fromNow()}</ThemedText>
                        </ThemedView>
                       
                    </ThemedView>
                    
                </TouchableOpacity>
              </Link> 
        </ThemedView>      
                  
        
    )
}

const styles = StyleSheet.create({
container: {
    width: windowWidth,
    alignItems: 'center',
    marginTop:5
},
  chatButton: {
    width: windowWidth * 0.95,
    height: 80,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:2
    
  },
  chatDetailsBody: {
    marginLeft: 20,
    

  },
  chatText: {
    color: 'gray'
  },
  dateComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: '95%'
  }
  
   
})