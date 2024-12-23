import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Pressable  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import moment from 'moment';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Link } from 'expo-router';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function EvendDateTimeCostSection({eventTimelines, option}) {


    const [sortedDates, setSortedDates] = useState([])
    const [firstEventDate, setFirstEventDate] = useState('')
    const [loadSortingDates, setLoadSortingDates] = useState(true)
   
    useEffect(()=> {


        setLoadSortingDates(true)

        const sortedTimlines = eventTimelines.sort(function(a, b){

            return b.eventDate - a.eventDate

        })

        console.log(sortedTimlines, 'dates')

        /** 
         console.log(sortedTimlines, 'dates')

         const firstTimeline = sortedTimlines.find((item)=> {

            console.log(item, 'here')

            if(moment(item.eventEndDate).format() > moment( new Date()).format() ) {
                console.log(item, 'found')
            }

        })

        console.log(firstTimeline, 'first item')
        
       */

        //setFirstEventDate(firstTimeline)

        for (var i = 0 ; i < sortedTimlines.length; i++) {

            if(moment(sortedTimlines[i].eventEndDate).format() > moment(new Date()).format()) {

                setFirstEventDate(sortedTimlines[i])
    
                setLoadSortingDates(false)
    


                console.log(sortedTimlines[i], 'mapped')
    
                break
                
    
               
            }
    

        }
     
        const firstTimeline = sortedTimlines.map((item)=> {
        
        console.log(moment(item.eventDate).format())

        console.log(moment( new Date()).format())

       

       })
       
       
        setSortedDates(sortedTimlines)

        setLoadSortingDates(false)

    },[eventTimelines])
    



    return (

        <View style={styles.container}>
            <Pressable >
            {loadSortingDates ?
            <View ></View> :
            <View >
                
                <View>
                    {moment(firstEventDate.eventDate).format() < moment(new Date()).format() ?
                    <View >
                        
                        <View style={styles.dateBody}>
                            {option === 'homeNear' ? <Text style={styles.dateText} >{moment(firstEventDate.eventDate).fromNow()}</Text> : null}
                            {option === 'sponsored' ? <Text style={styles.dateText} >{moment(firstEventDate.eventDate).fromNow()}</Text> : null}
                            <ThemedText style={styles.ongoingText} >ongoing</ThemedText>
                            
                        </View>
                        {option === 'homeNear' ? <ThemedText style={styles.optionText} >{`ends in ${moment(firstEventDate.eventEndDate).fromNow()}`}</ThemedText>: null}

                        {option === 'sponsored' ? <ThemedText style={styles.optionText}>{`ends in ${moment(firstEventDate.eventEndDate).fromNow()}`}</ThemedText>: null}

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
                        <View>{firstEventDate.adultPrice > 0 ? 
                        <View>
                            {option === 'homeNear' ? <ThemedText  >{`From ${firstEventDate.adultPrice}`}</ThemedText>: null}
                            {option === 'sponsored' ? <ThemedText >{`From ${firstEventDate.adultPrice}`}</ThemedText>: null}
                        </View>:

                        <View>
                            <View>
                                {
                                    firstEventDate.adolescentPrice > 0 ?
                                    <View>
                                        {option === 'homeNear' ? <ThemedText style={styles.priceText}>{`From ${firstEventDate.adolescentPrice}`}</ThemedText> : null}
                                        {option === 'sponsored' ? <Text style={styles.priceText}>{`From ${firstEventDate.adolescentPrice}`}</Text> : null}
                                    </View>:
                                    <View>
                                        {
                                            firstEventDate.childPrice > 0 ? 
                                            <View>
                                                {option === 'homeNear' ? <ThemedText style={styles.priceText}>{`From ${firstEventDate.childPrice}`}</ThemedText> : null}
                                                {option === 'sponsored' ? <ThemedText style={styles.priceText}>{`From ${firstEventDate.childPrice}`}</ThemedText> : null}
                                            </View>: 
                                            <View>
                                                {firstEventDate.preschoolerPrice > 0 ?
                                                <View>
                                                    {option === 'homeNear' ? <ThemedText style={styles.priceText}>{`From ${firstEventDate.preschoolerPrice}`}</ThemedText>: null}
                                                    {option === 'sponsored' ? <ThemedText style={styles.priceText}>{`From ${firstEventDate.preschoolerPrice}`}</ThemedText>: null}
                                                </View>:
                                                <View>
                                                    {firstEventDate.infantPrice > 0 ? 
                                                    <ThemedText style={styles.priceText}>{`From ${firstEventDate.preschoolerPrice}`}</ThemedText>:
                                                    <View style={styles.freeTextBody}>
                                                        {option === 'homeNear' ? <ThemedText style={styles.freeText}>Free</ThemedText> : null}
                                                        {option === 'sponsored' ? <ThemedText style={styles.freeText}>Free</ThemedText> : null}
                                                    </View>}
                                                </View>}
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
            </Pressable>
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