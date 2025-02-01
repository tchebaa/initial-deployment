import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';
import moment from 'moment';
import {useLocation} from '../../../context/LocationContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import {useLanguage} from '../../../context/LanguageContext'





const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function HomeScreen() {


    const {t, currentLanguageCode} = useLanguage()

    moment.locale(currentLanguageCode);

    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')
    const [events, setEvents] = useState([])
    const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())

    const handleGetEvents = async () => {

        try {

            setErrorLoadingEvents('')
            setLoadingEvents(true)
    
            const { data, errors } = await client.queries.searchEventsWithFilter({
                   
            startDate: startDate,
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude
                
            });
  
            setEvents(data)
            setLoadingEvents(false)
            

            
            
  

        } catch(e) {

            setErrorLoadingEvents(e.message)
            

        }


    }

    useEffect(()=> {

        handleGetEvents()

    },[userLocation])

    const renderSponsoredEvents = ({item}) => {
            return(
                <EventBody item={item} screenType="home" />
            )
        }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <Link href={'/(tabs)/search'} asChild>
                <TouchableOpacity style={styles.searchButton}>
                    <ThemedText >{t('search.events')}</ThemedText>
                    <AntDesign size={24} name="search1" color={'#1184e8'} />
                </TouchableOpacity>
            </Link>
            
            <ThemedView>
                {errorLoadingEvents ?

                <TouchableOpacity style={styles.errorButton}>
                    <ThemedText>{`${errorLoadingEvents}...${t('press.to.retry')}`}
                    </ThemedText>
                </TouchableOpacity>
                : null}
            </ThemedView>
            <ThemedView >
            
            {loadingEvents ? <ActivityIndicator/> :
            <ThemedView>
                {events.length > 0 ? 
                <FlatList 
                contentContainerStyle={{paddingBottom: 150}}
                data={events}
                renderItem={renderSponsoredEvents}
                keyExtractor={(item)=> item.id} 
                showsVerticalScrollIndicator={false}/>:
                <ThemedText style={styles.noEventsBody}>{t('no.events.near.you')}</ThemedText>}
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
        padding: 5,
        height: '100%',
        alignItems: 'center',
        
    },
    searchButton: {
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '90%',
        borderRadius: 20,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    errorButton: {
        marginVertical: 5
    },
    noEventsBody: {
        marginVertical: 10
    },
    filterModal: {
        position: 'absolute',
        zIndex: 20
    }
  
  
  
  
});
