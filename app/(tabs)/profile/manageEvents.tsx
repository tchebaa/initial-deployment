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




export default function ManageEvents() {

    const {userDetails} = useUser()
    const {t} = useLanguage()

    const [pageType, setPageType] = useState<string>(t('manage'))
    const [events, setEvents] = useState()
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string>('')
    


    const handleGetEvents = async () => {

        try {

            setLoadingError('')
            setLoadingEvents(true)

            const { data, errors } = await client.models.Event.list({

                filter: {
                  email: {
                    beginsWith: userDetails?.username
                  }
                }
              });


              setEvents(data)
              
              setLoadingEvents(false)


        } catch (e) {

            setLoadingError(e?.message)
            setLoadingEvents(false)

        }

        

    }


    useEffect(()=> {

      handleGetEvents()

    },[])


    const renderEvents = ({item}) => {
                return(
                    <EventManageBody item={item} screenType="manage" />
                )
            }



  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <ThemedView>
            {loadingEvents ? 
            <ThemedView>
              <ActivityIndicator/>
            </ThemedView>:
            <ThemedView>
              {events.length > 0 ?
              <FlatList 
                  contentContainerStyle={{paddingBottom: 150}}
                  data={events}
                  renderItem={renderEvents}
                  keyExtractor={(item)=> item.id} 
                  showsVerticalScrollIndicator={false}/>
                  :
                  <ThemedView><ThemedText>No events found</ThemedText></ThemedView>}
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
