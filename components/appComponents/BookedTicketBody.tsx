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
import {useLanguage} from '../../context/LanguageContext'
import {useAdmin} from '../../context/TchebaaAdminContext'
import {useUser} from '../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

interface EventImage {
    aspectRatio: string;
    url: string;
  }

  interface Location {
    type: string;
    coordinates: number[];
  }

  interface Conversation {
    id: string;
    participants: string[];
    lastMessage: string;
    
  }

interface Ticket {
    id: string;
    eventName: string;
    eventAddress: string;
    eventDate: string;
    eventEndDate: string;
    eventTotalPrice: number;
    totalTicketNumber: number;
    adultNumber: number;
    childNumber: number;
    adolescentNumber: number;
    userEmail: string;
    organizerEmail: string;
    eventId: string;
    eventDescription: string;
    ageRestriction: string[];
    ticketsStatus: string;
    refunded: boolean;
    location: Location;
    createdAt: string;
  }


export default function AdminBookedTicketBody({item}: {item: Ticket}) {

    const {t, handleChangeLanguage, currentLanguageCode} = useLanguage()
    const [pageType, setPageType] = useState<string>(t('users'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    
    const colorScheme = useColorScheme();

    const [conversation, setConversation] = useState([])
    const [loadingConversation,setLoadingConversation] = useState<boolean>(true)
    const [loadingConversationError, setLoadingConversationError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [cancelTicketModal, setCancelTicketModal] = useState<boolean>(false)
    const [createChatModal, setCreateModal] = useState<boolean>(false)
    const [loadingCreateChat, setLoadingCreateChat] = useState<boolean>(false)
    const [createChatError, setCreateChatError] = useState<boolean>(false)



    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

   

    

  
    const handleGetConversation = async () => {

        setLoadingConversation(true)

        try{

            setLoadingConversationError(false)

           

                const { data, errors } = await client.models.Conversation.list({
                    filter: {
                        and:[
                            {
                                participants: {
                                    contains: item.userEmail
                                }
                            },
                            {
                                participants: {
                                    contains: item.organizerEmail
                                }
                            }
                            
                        ]
                    }
                    
                })

                setConversation(data)

                setLoadingConversation(false)




        } catch(e) {

            setLoadingConversationError(true)
            setLoadingConversation(false)

        }

    }

    const handleCreateChat = async () => {

        setCreateChatError(false)
        setLoadingCreateChat(true)


        try {

            const { data, errors } = await client.models.Conversation.create({
                participants: [item.userEmail, "tchebaa"],
                lastMessage: ''
            })

            handleGetConversation()


        } catch (e) {

            setCreateChatError(true)
            setLoadingCreateChat(false)

        }

    }



    useEffect(()=> {

        handleGetConversation()

    },[])


  

  return (
    
        <ThemedView style={styles.body}>
             <ThemedView  style={styles.ticketBody}>
                
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('price.total')}</ThemedText>
                    <ThemedText>{item.eventTotalPrice}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('ticket.number')}</ThemedText>
                    <ThemedText>{item.totalTicketNumber}</ThemedText>
                </ThemedView>
                {item.adultNumber > 0 ?
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('adult')}</ThemedText>
                    <ThemedText>{item.adultNumber}</ThemedText>
                </ThemedView>:
                null}
                {item.adolescentNumber > 0 ?
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('adolescent')}</ThemedText>
                    <ThemedText>{item.adolescentNumber}</ThemedText>
                </ThemedView>:
                null}
                {item.childNumber > 0 ?
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('child')}</ThemedText>
                    <ThemedText>{item.childNumber}</ThemedText>
                </ThemedView>:
                null}
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('event.date')}</ThemedText>
                    <ThemedText>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedText>{t('event.end.date')}</ThemedText>
                    <ThemedText>{moment(item.eventEndDate).format('MMMM Do YYYY, h:mm a')}</ThemedText>
                </ThemedView>

                {moment(item.eventEndDate).format() > moment(new Date()).format() ?
                 <ThemedView style={styles.ticketDetailsBody}>
                    <TouchableOpacity style={styles.button}>
                        <ThemedText>{t('cancel')}</ThemedText>
                        
                    </TouchableOpacity>
                    <ThemedView>
                    {!loadingConversation ? 
                        <ThemedView>
                            {conversation.length > 0 ? 
                            <TouchableOpacity style={styles.button}>
                                <ThemedText>{t('chat')}</ThemedText>
                            </TouchableOpacity>:
                            <TouchableOpacity style={styles.button} onPress={()=> handleCreateChat()}>
                                <ThemedText>{t('create.chat')}</ThemedText>
                            </TouchableOpacity>}
                        </ThemedView>
                        : <ActivityIndicator/>}
                    </ThemedView>
                </ThemedView>:
                <ThemedView style={styles.ticketDetailsBody}>
                    <ThemedView></ThemedView>
                    <ThemedText>{t('ended')}</ThemedText>
                </ThemedView>}
            </ThemedView>      
            
        </ThemedView>
        
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
    usersHeader: {
        marginTop: 10,
        width: '100%'
    },
    
    userComponent: {
        
        borderTopWidth: 0.5,
        
        borderColor: 'gray',
        paddingVertical: 5,
        marginTop: 5
       
    },
    searchInputComponent: {
        width: '95%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        marginTop: 10,
    },
    searchInput: {
      
        
        paddingHorizontal: 10,
        width: '80%',
        paddingVertical: 5
        
    },
    searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%',
        
        height: 40
    },
    eventDetailsComponent: {
        width: windowWidth * 0.95,
        marginTop: 10
      },
      totalBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginTop: 5
      },
      totalComponent: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      totalNumber: {
          marginLeft: 5
      },
      ticketDetailsBody: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: windowWidth * 0.95,
        marginTop: 5
      },
      ticketBody: {
        borderTopWidth: 0.5,
        paddingVertical: 5,
        borderColor: "gray",
        marginTop: 5
      },
      button: {

        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10
    
      },
  
  
  
});