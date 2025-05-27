import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons'; 
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
import moment from 'moment';
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import {useLanguage} from '../../../context/LanguageContext'
import {useAdmin} from '../../../context/TchebaaAdminContext'
import {useUser} from '../../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


interface User {
    id: string;
    email: string;
    postEventLimit: number;
    createdAt: string;
    name: string;
    pushNotificationToken: string;
    pushNotificationEnabled: boolean;
  }


  interface Conversation {
    id: string;
    participants: string [];
    lastMessage: string;
    createdAt: string;
    updatedAt: string;
  }




export default function oneUser() {

    const {t, handleChangeLanguage, currentLanguageCode} = useLanguage()
    const [pageType, setPageType] = useState<string>(t('user'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    const {screenName, id, email} = useLocalSearchParams()
    
    const colorScheme = useColorScheme();

    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState<boolean>(true)
    const [loadingUserError, setLoadingUserError] = useState<boolean>(false)
    const [updateLimitModal, setUpdateLimitModal] = useState<boolean>(false)
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingUpdateError, setLoadingUpdateError] = useState<boolean>(false)
    const [postLimit, setPostLimit] = useState<number>(0)
    const [conversation, setConversation] = useState<Conversation []>([])
    const [loadingConversation, setLoadingConversation] = useState<boolean>(true)
    const [loadingConversationError, setLoadingConversationError] = useState<boolean>(true)
    const [createChatModal, setCreateModal] = useState<boolean>(false)
    const [loadingCreateChat, setLoadingCreateChat] = useState<boolean>(false)
    const [createChatError, setCreateChatError] = useState<boolean>(false)


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

    const [startDate, setStartDate] = useState<string>(moment(new Date()).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [dateFilterCode, setDateFilterCode] = useState<string>('all')

   
    

  
    const handleGetUser = async () => {

        setLoadingUser(true)

        try{

            setLoadingUserError(false)

            const { data, errors } = await client.models.User.get({
                id: Array.isArray(id) ? id[0] : id,
              });


               if(data) {

                 setUser(data as User)

                setLoadingUser(false)

              }



        } catch(e) {

            setLoadingUserError(true)

        }

    }


    const handleUpdateUser = async () => {

        setLoadingUpdate(true)


        try{

            setLoadingUpdateError(false)

            const { data, errors } = await client.models.User.update({
                id: Array.isArray(id) ? id[0] : id,
                postEventLimit: Number(postLimit)
              });


            

            setLoadingUpdate(false)
            handleGetUser()
            setUpdateLimitModal(false)


        } catch(e) {

            setLoadingUpdateError(true)
            setLoadingUpdate(false)

        }

    }


    const handleGetConversation = async () => {

        setLoadingConversation(true)
    

        try{

            setLoadingConversationError(false)

            const { data, errors } = await client.models.Conversation.list({
                filter: {
                    and:[
                        {
                            participants: {
                                contains: Array.isArray(email) ? email[0] : email,
                            }
                        },
                        {
                            participants: {
                                contains: 'tchebaa'
                            }
                        }
                        
                    ]
                }
            })

            if(data) {

                const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                setConversation(filtered as Conversation[]);
                setLoadingConversation(false)
                
                }
            

        } catch (e) {

            setLoadingConversation(false)
            setLoadingConversationError(true)

        }

    }


    const handleCreateChat = async () => {

        setCreateChatError(false)
        setLoadingCreateChat(true)


        const newEmail = Array.isArray(email) ? email[0] : email

        try {

            const { data, errors } = await client.models.Conversation.create({
                participants: [newEmail, "tchebaa"],
                lastMessage: ''
            })

            handleGetConversation()


        } catch (e) {

            setCreateChatError(true)
            setLoadingCreateChat(false)

        }

    }


    useEffect(()=> {

       handleGetUser()

    },[])


    useEffect(()=> {

        handleGetConversation()

    },[])





  

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType}/>
            <ThemedView style={styles.userIconBody}>
                <Ionicons name="person-circle-outline" size={40} color={ colorScheme === 'dark' ? "white" : "black"} />
                
            </ThemedView>
            {updateLimitModal ? 
            <ThemedView style={styles.updateLimitModal}>
                {loadingUpdate ? 
                <ThemedView style={styles.updateLoadingComponent}>
                    <ThemedText>{t('updating')}</ThemedText>
                </ThemedView>: null}
                <ThemedView style={styles.closeModalSection}>
                    <ThemedView></ThemedView>
                    <TouchableOpacity onPress={()=> setUpdateLimitModal(false)}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"}  /></TouchableOpacity>
                </ThemedView>
               
                <TextInput value={JSON.stringify(postLimit)} keyboardType='numeric' onChangeText={(e)=> setPostLimit(Number(e))} placeholder={JSON.stringify(postLimit)} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.limitInput]} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'}/>
                <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.updateButton]} onPress={()=> handleUpdateUser()}>
                    <ThemedText style={styles.updateText}>{t('update')}</ThemedText>
                </TouchableOpacity>
            </ThemedView>: null}
            <ThemedText style={styles.emailText}>{email}</ThemedText>
            {!loadingUser ? 
            <ThemedView>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 0}} >
                    <ThemedView style={styles.postLimitComponent}>
                        <ThemedText type='defaultSemiBold'>{t('event.post.limit')}:</ThemedText>
                        <ThemedView>
                            <ThemedText type='defaultSemiBold' style={styles.eventLimitNumber}>{user!.postEventLimit}</ThemedText>
                        </ThemedView>
                        <TouchableOpacity onPress={()=> setUpdateLimitModal(true)}>
                            <Feather name='edit' size={20} color={'#1184e8'} />
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView >
                        <Link href={{pathname: '/(tabs)/profile/analytics', params: {screenName:"user", email: email}}} asChild>
                            <TouchableOpacity style={styles.buttonsBody}>
                                <ThemedText>{t('online.impressions')}</ThemedText>
                            </TouchableOpacity>
                        </Link>
                        
                    </ThemedView>
                    <ThemedView >
                        <Link href={{pathname: '/(tabs)/profile/analytics', params: {screenName:"user", email: email}}} asChild>
                            <TouchableOpacity style={styles.buttonsBody}>
                                <ThemedText>{t('events.viewed')}</ThemedText>
                            </TouchableOpacity>
                        </Link>
                        
                    </ThemedView>
                    
                   {!loadingConversation ?
                    <ThemedView >
                        
                        {conversation.length > 0 ? 
                        <Link href={{pathname: '/(tabs)/profile/chats', params: {screenName:"tchebaa", email: email, conversationId: conversation[0].id}}} asChild>
                            <TouchableOpacity style={styles.buttonsBody}>
                                <ThemedText>{t('chat')}</ThemedText>
                            </TouchableOpacity>
                        </Link>:
                        <ThemedView>
                            {loadingCreateChat ? 
                            <ActivityIndicator />
                            :
                            <TouchableOpacity style={styles.buttonsBody} onPress={()=> handleCreateChat()}>
                                <ThemedText>{t('create.chat')}</ThemedText>
                            </TouchableOpacity>}
                        </ThemedView>}
                        
                    </ThemedView>: null}
                <ThemedView>
                   
                </ThemedView>
                </ScrollView>
            </ThemedView>
            : <ActivityIndicator/>}
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
        width: windowWidth * 0.95,
        alignItems: 'center',
        flexDirection: 'column'
        
    },
    
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
        marginTop: 10,
        borderColor: 'gray'
    },
    buttonText: {
        marginRight: 5
    },
    filterComponent: {
        flexDirection: 'row',
        
    },
    selectedDateCodeText: {
        color: "#1184e8"
    },
    filterDateButton: {
        borderWidth: 0.5,
        color: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
    onlineUsersHeader: {
        marginTop: 10,
        width: '100%'
    },
    totalBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    totalComponent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalNumber: {
        marginLeft: 5
    },
    onlineUserComponent: {
        
        borderTopWidth: 0.5,
        
        borderColor: 'gray',
        paddingVertical: 5,
        marginTop: 5
       
    },
    userIconBody: {
        marginTop: 40
    },
    emailText: {
        marginTop: 10
    },
    postLimitComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    eventLimitNumber: {
        marginHorizontal: 5
    },
    updateLimitModal: {
        width: windowWidth * 0.95,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        padding: 10,
        position: 'absolute',
        top: 50,
        zIndex: 20
      },
      closeModalSection: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
      limitInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 5,
        width: '50%'
      },
      updateButton: {
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        borderColor: '#1184e8',
        fontFamily: "PoppinsSemibold"
      },
      updateText: {
        color: "#1184e8",
        fontFamily: "PoppinsSemibold",
        fontSize: 16
      },
      updateLoadingComponent: {
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        borderColor: '#1184e8',
        borderWidth: 1,
        zIndex: 20,
        width: '100%',
        height: '100%'
      },
      buttonsBody: {
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        marginTop: 10
      }
  
  
  
});