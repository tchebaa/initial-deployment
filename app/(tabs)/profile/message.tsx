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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


const messageUsers = [
  {userName: 'Stephen Fondo',
  organizerName: 'Arsenal PLC',
  participants: ['rani@gmail.com', 'stephen.fondo95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '56292030',
  },
  {userName: 'Stephen Rani',
  organizerName: 'Man city PLC',
  participants: ['rani@gmail.com', 'stephen.fondo95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '86772034',
  
  },
  {userName: 'Mwangirani Fondo',
  organizerName: 'Talii Travel PLC',
  participants: ['rani@gmail.com', 'stephen.rani95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '56292031',
  },
  {userName: 'Stephen Fondo',
  organizerName: 'Arsenal PLC',
  participants: ['rani@gmail.com', 'stephen.rani95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '56292060',

  },
  {userName: 'Stephen Rani',
  organizerName: 'Man city PLC',
  participants: ['rani@gmail.com', 'stephen.fondo95@gmail.com'],
  updatedAt: '2024-12-25T05:00:00.000Z',
  id: '86772074',
  },
]

/** 
const messageUsers = [
  {userName: 'Stephen Fondo',
  organizerName: 'Arsenal PLC',
  sender: 'stephen.fondo95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',
  message: 'Hello whats the price for the event'
  },
  {userName: 'Stephen Rani',
  organizerName: 'Man city PLC',
  reciever: 'stephen.fondo95@gmail.com',
  sender: 'rani@gmail.com',
  lastTime: '8/1/2019',
  id: '86772034',
  message: 'The event will be 1000 kenyan shillings The event will be 1000 kenyan shillings, The event will be '
  },
  {userName: 'Mwangirani Fondo',
  organizerName: 'Talii Travel PLC',
  sender: 'stephen.rani95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',
  message: 'Is there a discount?'
  },
  {userName: 'Stephen Fondo',
  organizerName: 'Arsenal PLC',
  sender: 'stephen.fondo95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',

  },
  {userName: 'Stephen Rani',
  organizerName: 'Man city PLC',
  reciever: 'stephen.fondo95@gmail.com',
  sender: 'rani@gmail.com',
  lastTime: '8/1/2019',
  id: '86772034',
 
  },
  {userName: 'Mwangirani Fondo',
  organizerName: 'Talii Travel PLC',
  sender: 'stephen.rani95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',

  },
  {userName: 'Stephen Fondo',
  organizerName: 'Arsenal PLC',
  userEmail: 'stephen.fondo95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',

  },
  {userName: 'Stephen Rani',
  organizerName: 'Man city PLC',
  reciever: 'stephen.fondo95@gmail.com',
  sender: 'rani@gmail.com',
  lastTime: '8/1/2019',
  id: '86772034',
  
  },
  {userName: 'Mwangirani Fondo',
  organizerName: 'Talii Travel PLC',
  sender: 'stephen.rani95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',

  },
  {userName: 'Stephen Fondo',
  organizerName: 'Arsenal PLC',
  sender: 'stephen.fondo95@gmail.com',
  reciever: 'rani@gmail.com',
  lastTime: '5/12/2019',
  id: '56292030',

  }
]

*/
export default function Message() {

  const [pageType, setPageType] = useState<string>('message')
  const [chats, setChats] = useState<{participants: string [], id: string, senderName: string, recieverName: string, updatedAt: string} []>([])


  const renderChats = ({item}:{item: {userName: string, organizerName: string, participants: string[], updatedAt: string, id: string}}) => {
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