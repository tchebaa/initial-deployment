import {useState, useEffect, useRef} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

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
import {useUser} from '../../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';


const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function Message() {


  const {userDetails} = useUser()
  const colorScheme = useColorScheme();

  const [pageType, setPageType] = useState<string>('chats')
  const [chats, setChats] = useState([])
  const [loadingChats, setLoadingChats] = useState(true)
  const [userEmail, setUserEmail] = useState<string>('rani@gmail.com')
  const [text, setText] = useState<string>('')

  const chatListRef = useRef<FlatList>(null)
  const scrollRef = useRef<ScrollView>(null)

  const { conversationId, screenName } = useLocalSearchParams();


  useEffect(()=> {

    
    if(scrollRef.current) {
        scrollRef.current.scrollToEnd({animated: true})
    }

  },[scrollRef, chats])




  useEffect(()=> {

    //handleGetChats()

  },[])

  useEffect(()=> {

    const sub = client.models.Message.observeQuery({
        filter:{
            conversationId:{
                beginsWith: conversationId
            }
        }
    }).subscribe({
        next: ({ items, isSynced }) => {

            const sortedChats = items.sort(function(a,b){
                    return new Date(a.createdAt) - new Date(b.createdAt)
                  })

            console.log(items, "observe")
            setChats([...sortedChats])
            setLoadingChats(false)
          
        },
      });
    
      return () => sub.unsubscribe();

  }, [])

  

  

/** 
 * 
 *  const handleGetChats = async () => {

    console.log(conversationId)

    try{

        const { data, errors } = await client.models.Message.list({

            filter: {
                conversationId:{
                    beginsWith: conversationId
                }
            }
            
          });

          //console.log(data)

        

          setChats(data)
          setLoadingChats(false)

          

    } catch (e) {

        setLoadingChats(false)

    }

  }

  const renderChats = ({item}:{item: {senderName: string, sender: string, message: string, createdAt: string, id: string}}) => {


  userDetails?.username

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
const handleSendText = async () => {

    if(text.length > 1) {

        if(screenName === 'user'){

            const { data, errors } = await client.models.Message.create({
                conversationId: conversationId,
                sender: userDetails?.username,
                content: text,
                status: 'read'
                
              });

              setText('')

        }

        

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
            {loadingChats ? <ActivityIndicator/> 
            : <ThemedView style={styles.chatBody}>
            <ScrollView ref={scrollRef} contentContainerStyle={{paddingBottom: 120}} showsVerticalScrollIndicator={false}>
                {chats.map((item, i)=> {
                    return(
                        <ThemedView key={i}>
                        {userDetails?.username === item.sender ? 
                        <ThemedView style={styles.sentMessagesBody}>
                            <ThemedView style={styles.sentMessageComponent}>
                                <ThemedText style={styles.sentMessageText}>{item.content}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>:
                        <ThemedView style={styles.recievedMessageBody}>
                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.recievedMessageComponent]}>
                                <ThemedText>{item.content}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>}
                    </ThemedView>
                    )
                })}
            </ScrollView>
            </ThemedView>}
            <ThemedView>
                
            </ThemedView>
            <ThemedView style={styles.chatInputBody}>
                <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.chatInput]} value={text} onChangeText={(e)=> setText(e)}/>
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
        borderTopWidth: 0.5,
        padding: 9,
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray'
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
        marginTop: 20,
        
    },
    recievedMessageBody: {
        alignSelf: 'flex-start',
        maxWidth: windowWidth * 0.95,
        marginTop: 20,
        marginLeft: 5
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
        borderWidth: 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20, 
        borderColor: 'gray',
    },
    sentMessageText: {
        color: 'white'
    },
    dateText:{
        marginTop: 5
    },
    chatBody: {
        width: windowWidth,
        
        height: '100%',
        
   
    },
    
    
  
  
  
  
});