import {useState, useEffect, useRef} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import EventHeader from '@/components/appComponents/EventHeader';
import EventScreenBody from '@/components/appComponents/EventScreenBody';
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import moment from 'moment';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'

const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height





const messagesChats = [
  {
  sender: 'stephen.fondo95@gmail.com',
  senderName: "Stephen Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '88292030',
  message: 'Hello whats the price for the event'
  },
  {
  
  sender: 'rani@gmail.com',
  senderName: "Mwangirani Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '96779034',
  message: 'The event will be 1000 kenyan shillings The event will be 1000 kenyan shillings.'
  },
  {
  sender: 'stephen.fondo95@gmail.com',
  senderName: "Stephen Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '36292030',
  message: 'Is there a discount?'
  },
  {
  sender: 'stephen.fondo95@gmail.com',
  senderName: "Stephen Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '54292020',
  message: 'For five people?'
  },
  {
  
  sender: 'rani@gmail.com',
  senderName: "Mwangirani Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '86772537',
  message: 'Sorry but the price is fixed.'
  },
  {
  sender: 'stephen.fondo95@gmail.com',
  senderName: "Stephen Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '56292042',
  message: 'Okay then, how about 10 people.'
  },
  {
  
  sender: 'rani@gmail.com',
  senderName: "Mwangirani Fondo",
  createdAt: '2024-12-25T05:00:00.000Z',
  id: '58292070',
  message: 'Sorry but the price is fixed.'
  },
  {
  sender: 'rani@gmail.com',
  senderName: "Mwangirani Fondo",
  createdAt: '2025-01-02T05:00:00.000Z',
  id: '85712034',
  message: 'Sorry but the price is fixed.'
  },
  {
  sender: 'stephen.fondo95@gmail.com',
  senderName: "Stephen Fondo",
  createdAt: '2025-01-07T05:00:00.000Z',
  id: '56222038',
  message: 'Sorry but the price is fixed.'
  },
  
]


export default function Message() {

  const [pageType, setPageType] = useState<string>('chats')
  const [chats, setChats] = useState<{message:string, id: string, senderName: string, sender: string, createdAt: string} []>(messagesChats)
  const [userEmail, setUserEmail] = useState<string>('rani@gmail.com')
  const [text, setText] = useState<string>('')

  const chatListRef = useRef<FlatList>(null)
  const scrollRef = useRef<ScrollView>(null)

  const { conversationId } = useLocalSearchParams();


  useEffect(()=> {

    
    if(scrollRef.current) {
        scrollRef.current.scrollToEnd({animated: true})
    }

  },[scrollRef, chats])


  useEffect(()=> {


  },[])


/** 

  const renderChats = ({item}:{item: {senderName: string, sender: string, message: string, createdAt: string, id: string}}) => {
                return(
                    <ThemedView>
                        {userEmail === item.sender ? 
                        <ThemedView style={styles.sentMessagesBody}>
                            <ThemedView style={styles.sentMessageComponent}>
                                <ThemedText style={styles.sentMessageText}>{item.message}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>:
                        <ThemedView style={styles.recievedMessageBody}>
                            <ThemedView style={styles.recievedMessageComponent}>
                                <ThemedText>{item.message}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>}
                    </ThemedView>
                )
            }

*/
const handleSendText = () => {

    if(text.length > 1) {

        const chatItem = {message: text, senderName: 'Rani', id: '123456', sender: 'rani@gmail.com', createdAt: new Date()}

        setChats([...chats, chatItem])
    }

}

/**
 * <FlatList
                    ref={chatListRef} 
                    contentContainerStyle={{paddingBottom: 120}}
                    data={messagesChats}
                    renderItem={renderChats}
                    keyExtractor={(item)=> item.id} 
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        chatListRef.current?.scrollToEnd()
                    }/>
 */


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <ThemedView>
            <ScrollView ref={scrollRef} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                {chats.map((item, i)=> {
                    return(
                        <ThemedView key={i}>
                        {userEmail === item.sender ? 
                        <ThemedView style={styles.sentMessagesBody}>
                            <ThemedView style={styles.sentMessageComponent}>
                                <ThemedText style={styles.sentMessageText}>{item.message}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>:
                        <ThemedView style={styles.recievedMessageBody}>
                            <ThemedView style={styles.recievedMessageComponent}>
                                <ThemedText>{item.message}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>}
                    </ThemedView>
                    )
                })}
            </ScrollView>
            </ThemedView>
            <ThemedView>
                
            </ThemedView>
            <ThemedView style={styles.chatInputBody}>
                <TextInput style={styles.chatInput} value={text} onChangeText={(e)=> setText(e)}/>
                <TouchableOpacity onPress={()=> handleSendText()}>
                    <Ionicons name='send-outline' size={24} color={'#1184e8'}/>
                </TouchableOpacity>
            </ThemedView>
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
    chatInputBody: {
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        padding: 9,
        width: windowWidth * 0.95,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chatInput: {
        padding: 5,
        borderWidth: 0.5,
        width: '90%',
        borderColor: 'gray',
        borderRadius: 10,
        
    },
    sentMessagesBody: {
        alignSelf: 'flex-end',
        maxWidth: windowWidth * 0.95,
        marginTop: 20
    },
    recievedMessageBody: {
        alignSelf: 'flex-start',
        maxWidth: windowWidth * 0.95,
        marginTop: 20
    },
    sentMessageComponent: {
        padding: 10,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#1184e8',
        borderColor: 'white'
    },
    recievedMessageComponent: {
        padding: 10,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20 
    },
    sentMessageText: {
        color: 'white'
    },
    dateText:{
        marginTop: 5
    }
    
    
  
  
  
  
});