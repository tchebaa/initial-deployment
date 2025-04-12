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
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {useUser} from '../../../context/UserContext';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import EventManageBody from '@/components/appComponents/EventManageBody';
import {useLanguage} from '../../../context/LanguageContext'


const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function EventBookings() {

    const {userDetails} = useUser()
    const {t} = useLanguage()

    const {eventId} = useLocalSearchParams()
    const [pageType, setPageType] = useState<string>(t('bookings'))
    const [bookings, setBookings] = useState()
    const [loadingBookings, setLoadingBookings] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string>('')
    const [deletedItem, setDeletedItem] = useState<string>('')
    


    const handleGetEvents = async () => {

        try {

            setLoadingError('')
            setLoadingBookings(true)

            const { data, errors } = await client.models.EventTicket.list({

                filter: {
                  eventId: {
                    beginsWith: eventId
                  }
                }
              });


              setBookings(data)
              
              setLoadingBookings(false)


        } catch (e) {

            setLoadingError(e?.message)
            setLoadingBookings(false)

        }

        

    }


    useEffect(()=> {

     // handleGetEvents()

    },[])


    const renderEvents = ({item}) => {
                return(
                    <EventManageBody item={item} screenType="manage" deletedItem={deletedItem} setDeletedItem={setDeletedItem} />
                )
            }



  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <ThemedView>
            {loadingBookings ? 
            <ThemedView>
              <ActivityIndicator/>
            </ThemedView>:
            <ThemedView>
              {bookings.length > 0 ?
              <FlatList 
                  contentContainerStyle={{paddingBottom: 150}}
                  data={bookings}
                  renderItem={renderEvents}
                  keyExtractor={(item)=> item.id} 
                  showsVerticalScrollIndicator={false}/>
                  :
                  <ThemedView><ThemedText>{t('no.booked.events')}</ThemedText></ThemedView>}
            </ThemedView>
            }
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
    
  
  
  
  
});
