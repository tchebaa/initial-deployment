import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, FontAwesome5, Entypo, Feather, Octicons, AntDesign } from '@expo/vector-icons'; 
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
import moment from 'moment';
import { useColorScheme } from '@/hooks/useColorScheme';

const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


const EventCategory = ({item, handleAddRemoveCategory, selectedCategories}: {item: { icon: string, title: string, name: string}, selectedCategories: string [], handleAddRemoveCategory: (item: string) => void}) => {
    
    const colorScheme = useColorScheme();

    return (
      
        <ThemedView>
            <Pressable style={styles.eventCategoryItem} onPress={()=> handleAddRemoveCategory(item.name)}>
                <View >
                    {item.icon}
                </View>
                {selectedCategories.includes(item.name) ? <ThemedText style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'gray'}, styles.eventTextSelected]} numberOfLines={1} >{item.title}</ThemedText> : 
                <ThemedText style={styles.eventText} numberOfLines={1} >{item.title}</ThemedText> }
            </Pressable>
        </ThemedView>
       )

}



export default function ManageEvents() {

    const {userDetails} = useUser()
    const {t} = useLanguage()
    const {screenName} = useLocalSearchParams()

    const colorScheme = useColorScheme();

    

    const [pageType, setPageType] = useState<string>(t('manage'))
    const [events, setEvents] = useState()
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string>('')
    const [deletedItem, setDeletedItem] = useState<string>('')

    const [selectedCategories, setSelectedCategories] = useState<string []>([])
    const [openLocationComponent, setOpenLocationComponent] = useState<boolean>(false)
    const [filterModal, setFilterModal] = useState<boolean>(false)
    const [dateFilterCode, setDateFilter] = useState<string>('all')

    
    
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')


    type CategoryProps = {item : { icon: string, title: string, name: string}}


    const dayRanges = [
      {
          name: t('all'),
          code: 'all'
      },
      {
        name: t('ended'),
        code: 'ended'
      },
      {
          name: t('today'),
          code: 'today'
      },
      {
          name: t('tomorrow'),
          code: 'tomorrow'
      },
      {
          name: t('this.week'),
          code: 'thisweek'
      },
      {
          name: t('this.weekend'),
          code: 'thisweekend'
      },
      {
          name: t('next.week'),
          code: 'nextweek'
      },
      {
          name: t('this.month'),
          code: 'thismonth'
      },
      {
          name: t('next.month'),
          code: 'nextmonth'
      },
  ]
    


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

      const handleGetAllEvents = async () => {

          try {

            setLoadingError('')
            setLoadingEvents(true)

            const { data, errors } = await client.models.Event.list();


                setEvents(data)
                
                setLoadingEvents(false)


          } catch (e) {

              setLoadingError(e?.message)
              setLoadingEvents(false)

          } 

      }


    useEffect(()=> {

      if(screenName === 'main') {

        handleGetEvents()

      } else {
        handleGetAllEvents()
      }
      

    },[deletedItem])


    
    
        const handleDateChange = (code: string) => {
                
            //setDayType(code)
        
            if(code === 'all') {
    
                setDateFilter('all')
    
                setStartDate(moment(new Date).format().toString())
                setEndDate('')
            }
        
            if(code === 'today'){
    
                setDateFilter('today')
    
                setStartDate(moment(new Date()).startOf('day').format().toString())
                setEndDate(moment(new Date()).endOf('day').format().toString())
        
               // console.log(moment(new Date()).startOf('day').format())
        
               // console.log(moment(new Date).endOf('day').format())
                
        
            }
        
            if(code === 'tomorrow'){
    
                setDateFilter('tomorrow')
    
                setStartDate(moment(new Date()).endOf('day').format().toString())
                setEndDate(moment(new Date()).add(1, 'days').endOf('day').format().toString())
                
                
            }
            if(code === 'thisweek'){
        
                setDateFilter('thisweek')
    
                setStartDate(moment(new Date()).startOf('isoWeek').format().toString())
                setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                
                
            }
            if(code === 'thisweekend'){
    
                setDateFilter('thisweekend')
    
                setStartDate(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
                setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                
            }
        
            if(code === 'nextweek'){
    
                setDateFilter('nextweek')
    
    
                setStartDate(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
                setEndDate(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
        
                
            }
            if(code === 'thismonth'){
    
                setDateFilter('thismonth')
    
                setStartDate(moment(new Date()).startOf('month').format())
                setEndDate(moment(new Date()).endOf('month').format())
            }
        
            if(code === 'nextmonth'){
    
                setDateFilter('nextmonth')
    
                setStartDate(moment(new Date()).add(1, 'month').startOf('month').format())
                setEndDate(moment(new Date()).add(1, 'month').endOf('month').format())
                
            }
        }



        const handleAddRemoveCategory = (category: string) => {

          const itemIndex = selectedCategories.indexOf(category)
  
          if(itemIndex > -1) {
  
              selectedCategories.splice(itemIndex, 1)
  
              setSelectedCategories([...selectedCategories])
  
          } else {
  
              setSelectedCategories([...selectedCategories, category])
          }
  
      }
  


        const eventsCategories = [
          {icon:<Entypo name="graduation-cap" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          title: t('education'),
          name:'education'},
          {icon:<FontAwesome name="music" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
          title: t('music'),
          name:'music'},
          {
          icon: <Ionicons name="moon-sharp" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>, 
          title: t('night.party'),
          name:'night'},
          {icon:<Feather name="video" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          
          title: t('entertainment'),
          name: 'entertainment'},
          {icon:<Octicons name="graph" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          
          title: t('markets'),
          name: 'markets'},
          {icon:<MaterialCommunityIcons name="drama-masks" size={25} color={ colorScheme === 'dark' ? "white" : "black"}/>,
          
          title: t('performance.visuals'),
          name: 'visuals'},
          {icon:<Foundation name="camera" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
          
          title: t('photography'),
          name:'photography'},
          {icon:<FontAwesome5 name="laptop-code" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          title: t('software.tech'),
          name: 'software'},
          {icon:<Entypo name="laptop" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />, 
          title: t('information.technology'),
          name: 'informationtechnology'},
          {icon:<MaterialCommunityIcons name="stethoscope" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
          title: t('health'),
          name:'health'},
          {icon:<FontAwesome5 name="hospital-symbol" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          title: t('hospitals.and.clinics'),
          name:'hospital'},
          {icon:<MaterialIcons name="medication" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          title: t('pharmacy'),
          name:'pharmacy'},
          {icon:<Ionicons name="fast-food-outline" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
           
          title: t('food.drink'),
          name:'food'},
          {
          icon: <FontAwesome name="briefcase" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>, 
          title: t('business'),
          name:'business'},
          {icon:<MaterialIcons name="directions-run" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
          
          title: t('sports.fitness'),
          name:'sports'},
          {icon:<FontAwesome5 name="globe-africa" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          
          title: t('travel.tourism'),
          name:'travel'},
          {icon:<MaterialCommunityIcons name="corn" size={24} color={ colorScheme === 'dark' ? "white" : "black"}  />,
           
          title: t('agriculture'),
          name:'agriculture'},
          {
          icon: <MaterialCommunityIcons name="pine-tree" size={24} color={ colorScheme === 'dark' ? "white" : "black"}  />, 
          title: t('environment'),
          name:'environment'},
          {icon:<MaterialCommunityIcons name="hand-heart-outline" size={24} color={ colorScheme === 'dark' ? "white" : "black"}  />,
           
          title: t('charity.fundraising'),
          name:'charity'},
          {icon:<FontAwesome5 name="pray" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
           
          title: t('religion.spirituality'),
          name:'religion'},
          {icon:<FontAwesome5 name="mountain" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
           
          title: t('outdoor.activities'),
          name:'outdoor'},
          {icon:<Ionicons name="brush-outline" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>,
           
          title: t('art'),
          name: 'art'},
          {icon:<Entypo name="game-controller" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
          
          title: t('games.esports'),
          name: 'game'},
          {icon:<FontAwesome name="gears" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />,
           
          title: t('engineering'),
          name:'engineering'},
      ]
    


    const renderEvents = ({item}) => {
                return(
                    <EventManageBody item={item} screenType="manage" deletedItem={deletedItem} setDeletedItem={setDeletedItem}
                    screenName={screenName} />
                )
            }

        const renderEventsCategories = ({item}: CategoryProps) => {
          return(
              <EventCategory item={item} selectedCategories={selectedCategories} handleAddRemoveCategory={handleAddRemoveCategory}  />
          )
      }



  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <ThemedView>
            {filterModal && screenName === 'admin'  ? 
                    <ThemedView style={styles.filterModal}>
                        <ThemedView style={styles.filterModalCloseSection}><View></View><TouchableOpacity onPress={()=> setFilterModal(false)}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"} /></TouchableOpacity></ThemedView>
                        
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
                    </ThemedView>: null}
            {screenName === 'admin' ?
            <ThemedView style={styles.headerBody}> 
            
              <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.searchInputComponent]}>
                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.searchInput]} placeholder={t('search')} placeholderTextColor={colorScheme === 'light' ? 'gray': 'white'} value={searchTerm} onChangeText={(e)=> setSearchTerm(e)}/>
                    <TouchableOpacity style={styles.searchButton} onPress={()=> handleGetEvents()}>
                        <AntDesign size={24} name="search1" color={'#1184e8'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} onPress={()=> setFilterModal(true)}>
                        <MaterialCommunityIcons name='filter-variant' size={24} color={ colorScheme === 'dark' ? "white" : "black"}  />
                    </TouchableOpacity>
                </ThemedView>
                
                <ThemedView style={styles.categoriesBody}>
                    <FlatList 
                        data={eventsCategories}
                        horizontal
                        renderItem={renderEventsCategories}
                        keyExtractor={(item)=> item.name}
                        showsHorizontalScrollIndicator={false}/>
                    
                </ThemedView>
              </ThemedView>: null}
            {loadingEvents ? 
            <ThemedView>
              <ActivityIndicator/>
            </ThemedView>:
            <ThemedView>
              
              {events.length > 0 ?
              <FlatList 
                  contentContainerStyle={{paddingBottom: 350}}
                  data={events}
                  renderItem={renderEvents}
                  keyExtractor={(item)=> item.id} 
                  showsVerticalScrollIndicator={false}/>
                  :
                  <ThemedView><ThemedText>{t('no.events.found')}</ThemedText></ThemedView>}
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
    headerBody: {
      width: windowWidth,
      alignItems: 'center',
      
  },
    searchButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '10%',
      
      height: 40
  },
  filterButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '10%'
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
  eventCategoryItem: {
      
    alignItems: 'center',
    marginHorizontal: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    
    

  },
  eventText: {
    marginTop: 3,
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  eventTextSelected: {
    marginTop: 3,
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 5,
    
  },
  categoriesBody: {
    marginTop: 10,
    height: 70
  },
  filterModal: {
    position: 'absolute',
    zIndex: 20,
    top: 10,
    padding: 10,
    width: '100%',
    borderWidth: 1
  },
  filterModalCloseSection: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  filterDateButton: {
      borderWidth: 0.5,
      color: 'gray',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginTop: 10
  },
  filterComponent: {
      flexDirection: 'column',
      alignItems: "flex-start",
      
  },
  selectedDateCodeText: {
    color: "#1184e8"
  }
      
  
});
