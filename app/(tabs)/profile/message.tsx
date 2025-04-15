import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import EventHeader from '@/components/appComponents/EventHeader';
import EventScreenBody from '@/components/appComponents/EventScreenBody';
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import ChatsBody from '@/components/appComponents/ChatsBody';
import {useLanguage} from '../../../context/LanguageContext'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


const messageUsers = [
  {
  lastMessage: 'Arsenal PLC',
  participants: ['rani@gmail.com', 'stephen.fondo95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '56292030',
  },
  {
  lastMessage: 'Man city PLC',
  participants: ['rani@gmail.com', 'stephen.fondo95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '86772034',
  
  },
  {
  lastMessage: 'Talii Travel PLC',
  participants: ['rani@gmail.com', 'stephen.rani95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '56292031',
  },
  {
  lastMessage: 'Arsenal PLC',
  participants: ['rani@gmail.com', 'stephen.rani95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '56292060',

  },
  {
  lastMessage: 'Man city PLC',
  participants: ['rani@gmail.com', 'stephen.fondo95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '86772074',
  },
]

/** 


*/
export default function Message() {

  const {t} = useLanguage()
  const [pageType, setPageType] = useState<string>(t('messages'))
  const [chats, setChats] = useState<{participants: string [], id: string, lastMessage: string, updatedAt: string} []>([])


  const renderChats = ({item}:{item: {lastMessage: string, participants: string[], updatedAt: string, id: string}}) => {
              return(
                  <ChatsBody item={item} />
              )
          }
  


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <FlatList 
              data={messageUsers}
              renderItem={renderChats}
              keyExtractor={(item)=> item.id} 
              showsVerticalScrollIndicator={false}/>
        </ThemedView>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? 20 : 0,
        marginTop:10,
        width: windowWidth,
        
        
    },
    body: {
        width: windowWidth,
        
        height: '100%',
        alignItems: 'center',
        
    },
    
  
  
  
  
});