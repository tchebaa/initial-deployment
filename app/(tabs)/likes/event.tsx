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

import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function EventScreen() {

    const { screenType, id } = useLocalSearchParams();

    const [event, setEvent] = useState()
    const [loadingEvent, setLoadingEvent] = useState(true)
    const [loadingEventError, setLoadingEventError] = useState<string>('')
        
        
            const handleGetEvent = async () => {
        
                try {
    
                    setLoadingEvent(true)
        
                    const { data, errors } = await client.models.Event.get({
                        id: id,
                      });
    
                      setEvent(data)
                      setLoadingEvent(false)
                     
        
                } catch (e) {
    
                    setLoadingEventError(e?.message)
        
                }
        
                
        
            }
    
            useEffect(()=> {
    
                handleGetEvent()
    
            },[])
    



  return (
    <SafeAreaView style={styles.container}>
        {!loadingEvent ? 
                <ThemedView style={styles.body}>
                    <EventHeader item={event} screenType={screenType}/>
                    <EventScreenBody item={event} screenType={screenType}/>
                </ThemedView>: 
                <ThemedView  style={styles.body}>
                    <ActivityIndicator/>
                </ThemedView>}
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
    }
  
  
  
  
});
