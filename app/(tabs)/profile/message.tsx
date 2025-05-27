import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

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
import {useUser} from '../../../context/UserContext'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { useColorScheme } from '@/hooks/useColorScheme';


const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

interface Conversation {
    id: string;
    participants: string[];
    lastMessage: string;
    createdAt: string;
    updatedAt: string
  }



export default function Message() {

  const {t} = useLanguage()
  const {userDetails} = useUser()
  const colorScheme = useColorScheme();
  const [pageType, setPageType] = useState<string>(t('messages'))
  const [conversations, setConversations] = useState<Conversation []>([])
  const [loadingConversations, setLoadingConversations] = useState<boolean>(true)
  const [loadingConversationsError, setLoadingConversationsError] = useState<boolean>(true)


  const handleGetConversations = async () => {

    setLoadingConversations(true)


    try{

        setLoadingConversationsError(false)

        /**participants: {
                    contains: userDetails?.username
                }      */

        const { data, errors } = await client.models.Conversation.list({
           filter: {
            participants: {
              contains: userDetails?.username    
            }
           }          
        })

        const sortedData = data.sort(function(a,b){
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })

         if(data) {

            const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
      

            setConversations(filtered as Conversation [])
            setLoadingConversations(false)
          }

       

        
        

    } catch (e) {

        setLoadingConversations(false)
        setLoadingConversationsError(true)

    }

}

  useEffect(()=> {

    handleGetConversations()

  },[])

  //{conversations?.find((conversation)=> admin.email === userDetails?.username)}


  const renderChats = ({item}:{item: {lastMessage: string, participants: string[], updatedAt: string, id: string}}) => {
              return(
                  <ChatsBody item={item} />
              )
          }
  


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            
            {loadingConversations ? <ActivityIndicator /> :
              <ThemedView>
                <ThemedView>
                
              </ThemedView>
                {conversations.length > 0 ? 
                <FlatList 
                data={conversations}
                renderItem={renderChats}
                keyExtractor={(item)=> item.id} 
                showsVerticalScrollIndicator={false}/>
                : <ThemedText>{t('no.conversations')}</ThemedText>}
              </ThemedView>
              }
              {loadingConversationsError ?
              <TouchableOpacity style={styles.errorButton} onPress={()=> handleGetConversations()}>
                    <ThemedText>{`${t('error.getting.conversations')}...${t('press.to.retry')}`}
                    </ThemedText>
                </TouchableOpacity>: null}
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
    errorButton: {
      marginVertical: 5
    },
    
  
  
  
  
});