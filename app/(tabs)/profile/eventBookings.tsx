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
import {useLanguage} from '../../../context/LanguageContext'
import moment from 'moment';
import BookedTicketBody from '@/components/appComponents/BookedTicketBody';


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




export default function EventBookings() {

    const {userDetails} = useUser()
    const {t} = useLanguage()

    const {eventId, eventName, eventAddress} = useLocalSearchParams()
    const [pageType, setPageType] = useState<string>(t('bookings'))
    const [bookings, setBookings] = useState<Ticket []>([])
    const [loadingBookings, setLoadingBookings] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string>('')
    const [deletedItem, setDeletedItem] = useState<string>('')

    const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [dateFilterCode, setDateFilterCode] = useState<string>('all')



     const dayRanges = [
            {
                name: t('all'),
                code: 'all'
            },
            {
                name: t('today'),
                code: 'today'
            },
            {
                name: t('this.year'),
                code: 'thisyear'
            },
            {
                name: t('yesterday'),
                code: 'yesterday'
            },
            {
                name: t('this.week'),
                code: 'thisweek'
            },
            {
                name: t('last.week'),
                code: 'lastweek'
            },
            {
                name: t('this.month'),
                code: 'thismonth'
            },
            {
                name: t('last.month'),
                code: 'lastmonth'
            },
            
        ]
    
        const handleDateChange = (code: string) => {
                    
                //setDayType(code)
            
                if(code === 'all') {
        
                    setDateFilterCode('all')
        
                    setStartDate(moment(new Date).format().toString())
                    setEndDate('')
                }
            
                if(code === 'today'){
        
                    setDateFilterCode('today')
        
                    setStartDate(moment(new Date()).startOf('day').format().toString())
                    setEndDate(moment(new Date()).endOf('day').format().toString())
            
                   // console.log(moment(new Date()).startOf('day').format())
            
                   // console.log(moment(new Date).endOf('day').format())
                    
            
                }
    
                if(code === 'thisyear'){
        
                    setDateFilterCode('thisyear')
        
                    setStartDate(moment(new Date()).startOf('year').format().toString())
                    setEndDate(moment(new Date()).endOf('year').format().toString())
            
                   // console.log(moment(new Date()).startOf('day').format())
            
                   // console.log(moment(new Date).endOf('day').format())
                    
            
                }
    
                if(code === 'yesterday'){
        
                    setDateFilterCode('yesterday')
        
                    setStartDate(moment(new Date()).subtract(1, 'days').startOf('day').format().toString())
                    setEndDate(moment(new Date()).startOf('day').format().toString())
            
                   // console.log(moment(new Date()).startOf('day').format())
            
                   // console.log(moment(new Date).endOf('day').format())
                    
            
                }
            
                if(code === 'tomorrow'){
        
                    setDateFilterCode('tomorrow')
        
                    setStartDate(moment(new Date()).endOf('day').format().toString())
                    setEndDate(moment(new Date()).add(1, 'days').endOf('day').format().toString())
                    
                    
                }
                if(code === 'thisweek'){
            
                    setDateFilterCode('thisweek')
        
                    setStartDate(moment(new Date()).startOf('isoWeek').format().toString())
                    setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                    
                    
                }
    
                if(code === 'lastweek'){
            
                    setDateFilterCode('lastweek')
        
                    setStartDate(moment(new Date()).subtract(1, 'weeks').startOf('isoWeek').format().toString())
                    setEndDate(moment(new Date()).startOf('isoWeek').format().toString())
                    
                    
                }
    
                if(code === 'thisweekend'){
        
                    setDateFilterCode('thisweekend')
        
                    setStartDate(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
                    setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                    
                }
            
                if(code === 'nextweek'){
        
                    setDateFilterCode('nextweek')
        
        
                    setStartDate(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
                    setEndDate(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
            
                    
                }
                if(code === 'thismonth'){
        
                    setDateFilterCode('thismonth')
        
                    setStartDate(moment(new Date()).startOf('month').format())
                    setEndDate(moment(new Date()).endOf('month').format())
                }
                if(code === 'lastmonth'){
        
                    setDateFilterCode('lastmonth')
        
                    setStartDate(moment(new Date()).subtract(1, "months").startOf('month').format())
                    setEndDate(moment(new Date()).startOf('month').format())
                }
            
                if(code === 'nextmonth'){
        
                    setDateFilterCode('nextmonth')
        
                    setStartDate(moment(new Date()).add(1, 'month').startOf('month').format())
                    setEndDate(moment(new Date()).add(1, 'month').endOf('month').format())
                    
                }
            }
    


    const handleGetBookings = async () => {

        try {

            setLoadingError('')
            setLoadingBookings(true)


            if(dateFilterCode === 'all') {

              const { data, errors } = await client.models.EventTicket.list({

                filter: {
                  eventId: {
                    beginsWith:  Array.isArray(eventId) ? eventId[0] : eventId
                  }
                }
              });


              if(data) {

                const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                setBookings(filtered as Ticket[]);
                setLoadingBookings(false)

              }


            } else {

              const { data, errors } = await client.models.EventTicket.list({

                filter:{
                  and: [
                  {
                    eventId: {
                      beginsWith: Array.isArray(eventId) ? eventId[0] : eventId
                    },
                  },
                  {
                      createdAt: { gt: startDate}
                  },
                  {
                      createdAt: { lt: endDate}
                  }  

                  ]
                }
                

                
              });


              if(data) {

                const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                setBookings(filtered as Ticket[]);
                setLoadingBookings(false)

              }

            }

            


        } catch (e) {

            const error = e as Error;

            if(error) {

            setLoadingError(error?.message)
            setLoadingBookings(false)

            }

        }

        

    }


    useEffect(()=> {

     handleGetBookings()
     
    },[dateFilterCode])


   



  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <ThemedView style={styles.eventDetailsComponent}>
              <ThemedText type='subtitle'>{eventName}</ThemedText>
              <ThemedText>{eventAddress}</ThemedText>
            </ThemedView>
            <ThemedView style={{ height: 50}}>
                <ScrollView horizontal>
                        <ThemedView style={styles.filterComponent}>
                            {dayRanges.map((item, i)=> {
                                return(
                                    <ThemedView  key={i}>
                                        <TouchableOpacity style={styles.filterDateButton} onPress={()=> handleDateChange(item.code)}>
                                            {dateFilterCode === item.code ? <ThemedText style={styles.selectedDateCodeText}>{item.name}</ThemedText>: <ThemedText>{item.name}</ThemedText> }
                                        </TouchableOpacity>
                                    </ThemedView>
                                    
                                )
                            })}
                        </ThemedView>
                    </ScrollView>
                </ThemedView> 
                <ThemedView style={styles.totalBody}>
                      <ThemedView></ThemedView>
                      <ThemedView style={styles.totalComponent}>
                          <ThemedText>{t('total')}:</ThemedText>
                          <ThemedText style={styles.totalNumber}>{bookings.length}</ThemedText>
                      </ThemedView>
                  </ThemedView>
            <ThemedView>
            {loadingBookings ? 
            <ThemedView>
              <ActivityIndicator/>
            </ThemedView>:
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 250}}>
              <ThemedView>
                  {bookings.length > 0 ?
                  <ThemedView>
                    {bookings.map((item, i)=> {
                      return(
                        <BookedTicketBody key={i} item={item} />
                      )
                    })}
                  </ThemedView>
                    :
                  <ThemedView><ThemedText>{t('no.booked.events')}</ThemedText></ThemedView>}
              </ThemedView>
            </ScrollView>
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
  }
});
