import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import moment from 'moment';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useLanguage} from '../../context/LanguageContext'

import { Link } from 'expo-router';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function EventDateTimeCostSection({eventTimelines, option}) {


    const {t, currentLanguageCode} = useLanguage()
    const [sortedDates, setSortedDates] = useState([])
    const [firstEventDate, setFirstEventDate] = useState('')
    const [loadSortingDates, setLoadSortingDates] = useState(true)
   
    useEffect(()=> {


        setLoadSortingDates(true)

        const sortedTimelines = eventTimelines.sort(function(a, b){

            return b.eventDate - a.eventDate

        })



        

        for (var i = 0 ; i < sortedTimelines.length; i++) {

            if(moment(sortedTimelines[i].eventEndDate).format() > moment(new Date()).format()) {

                setFirstEventDate(sortedTimelines[i])
    
                setLoadSortingDates(false)
    

    
                break
                
    
               
            }
    

        }
     
        const firstTimeline = sortedTimelines.map((item)=> {
        
       

       })
       
       
        setSortedDates(sortedTimelines)

        setLoadSortingDates(false)

    },[eventTimelines])
    



    return (

        <View style={styles.container}>
            
            {loadSortingDates ?
            <View ></View> :
            <View >
                
                <View>
                    {moment(firstEventDate.eventDate).format() < moment(new Date()).format() ?
                    <View >
                        
                        <View style={styles.dateBody}>
                            {option === 'homeNear' ? <Text style={styles.dateText} >{moment(firstEventDate.eventDate).fromNow()}</Text> : null}
                            {option === 'sponsored' ? <Text style={styles.dateText} >{moment(firstEventDate.eventDate).fromNow()}</Text> : null}
                            <ThemedText style={styles.ongoingText} >{t('ongoing')}</ThemedText>
                            
                        </View>
                        {option === 'homeNear' ? <ThemedText style={styles.optionText} >{`${t('ends.in')} ${moment(firstEventDate.eventEndDate).fromNow()}`}</ThemedText>: null}

                        {option === 'sponsored' ? <ThemedText style={styles.optionText}>{`${t('ends.in')} ${moment(firstEventDate.eventEndDate).fromNow()}`}</ThemedText>: null}

                    </View>:
                    <View>
                        {option === 'homeNear' ? <ThemedText style={styles.optionText}>{moment(firstEventDate.eventDate).format('MMMM Do YYYY, h:mm a')} 
                        </ThemedText> : null}
                        {option === 'sponsored' ? <ThemedText style={styles.optionText}>{moment(firstEventDate.eventDate).format('MMMM Do YYYY, h:mm a')} 
                        </ThemedText> : null}
                    </View>}
                </View>
                <View style={styles.priceBody}>
                    <View>
                        <View>
                        {firstEventDate.ticketPriceArray[0].adultPrice > 0 ? 
                        <View>
                            {option === 'homeNear' ? <ThemedText  >{`${t('from')} ${firstEventDate.ticketPriceArray[0].adultPrice}`}</ThemedText>: null}
                            {option === 'sponsored' ? <ThemedText >{`${t('from')} ${firstEventDate.ticketPriceArray[0].adultPrice}`}</ThemedText>: null}
                        </View>:

                        <View>
                            <View>
                                {
                                    firstEventDate.ticketPriceArray[0].adolescentPrice > 0 ?
                                    <View>
                                        {option === 'homeNear' ? <ThemedText style={styles.priceText}>{`${t('from')} ${firstEventDate.ticketPriceArray[0].adolescentPrice}`}</ThemedText> : null}
                                        {option === 'sponsored' ? <Text style={styles.priceText}>{`${t('from')} ${firstEventDate.ticketPriceArray[0].adolescentPrice}`}</Text> : null}
                                    </View>:
                                    <View>
                                        {
                                            firstEventDate.ticketPriceArray[0].childPrice > 0 ? 
                                            <View>
                                                {option === 'homeNear' ? <ThemedText style={styles.priceText}>{`${t('from')} ${firstEventDate.ticketPriceArray[0].childPrice}`}</ThemedText> : null}
                                                {option === 'sponsored' ? <ThemedText style={styles.priceText}>{`${t('from')} ${firstEventDate.ticketPriceArray[0].childPrice}`}</ThemedText> : null}
                                            </View>: 
                                            <View>
                                                <View style={styles.freeTextBody}>
                                                    {option === 'homeNear' ? <ThemedText style={styles.freeText}>{t('free')}</ThemedText> : null}
                                                    {option === 'sponsored' ? <ThemedText style={styles.freeText}>{t('free')}</ThemedText> : null}
                                                </View>
                                            </View>
                                        }
                                    </View>
                                }
                            </View>
                        </View>}
                    </View>
                </View>
            </View>
            </View>}
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    dateBody: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateText: {
        color: 'gray',
        fontSize: 12,
       
    },
    optionText: {
        color: 'gray',
        fontSize: 12,
        marginTop: 1
    },
    priceText: {
        color: 'gray',
        fontWeight: 'bold',
    },
    priceBody: {
        marginTop: 2
    },
    ongoingText: {
        color:"#FF4D00",
        fontSize: 12,
        marginTop: 1,
        marginLeft: 5
    },
    freeTextBody: {
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: 'gray',
        
        width: 40,
        borderRadius: 5
    },
    freeText: {
        fontWeight: '500',
        color: 'white',
        marginLeft: 1
    }
   
})