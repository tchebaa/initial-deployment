import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons'; 
import EventBody from '@/components/appComponents/EventBody';
import LocationComponent from '@/components/appComponents/LocationComponent';
import {useLocation} from '../../../context/LocationContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import moment from 'moment';
import RNDateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';



const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


//Events Categories List

const eventsCategories = [
    {icon:<FontAwesome name="music" size={24} color="black"/>,
    title: 'Music',
    name:'music'},
    {
    icon: <Ionicons name="moon-sharp" size={24} color="black"/>, 
    title: 'Night party',
    name:'night'},
    {icon:<MaterialCommunityIcons name="drama-masks" size={25} color="black" />,
    
    title: 'Performing & visuals',
    name: 'visuals'},
    {icon:<Foundation name="camera" size={24} color="black"/>,
    
    title: 'Photography & film',
    name:'photography'},
    {icon:<Entypo name="laptop" size={24} color="black" />,
     
    title: 'Software & tech',
    name: 'software'},
    {icon:<MaterialCommunityIcons name="stethoscope" size={24} color="black" />,
    
    title: 'Health',
    name:'health'},
    {icon:<Ionicons name="fast-food-outline" size={24} color="black" />,
     
    title: 'Food & drink',
    name:'food'},
    {
    icon: <FontAwesome name="briefcase" size={24} color="black"/>, 
    title: 'Business',
    name:'business'},
    {icon:<MaterialIcons name="directions-run" size={24} color="black"/>,
    
    title: 'Sports & fitness',
    name:'sports'},
    {icon:<FontAwesome5 name="globe-africa" size={24} color="black" />,
    
    title: 'Travel & tourism',
    name:'travel'},
    {icon:<MaterialCommunityIcons name="corn" size={24} color="black"  />,
     
    title: 'Agriculture',
    name:'agriculture'},
    {
    icon: <MaterialCommunityIcons name="pine-tree" size={24} color="black"  />, 
    title: 'Environment',
    name:'environment'},
    {icon:<MaterialCommunityIcons name="hand-heart-outline" size={24} color="black"  />,
     
    title: 'Charity & fundraising',
    name:'charity'},
    {icon:<FontAwesome5 name="pray" size={24} color="black"/>,
     
    title: 'Religion & spirituality',
    name:'religion'},
    {icon:<FontAwesome5 name="mountain" size={24} color="black"/>,
     
    title: 'Outdoor activities',
    name:'outdoor'},
    {icon:<Ionicons name="brush-outline" size={24} color="black"/>,
     
    title: 'Art',
    name: 'art'},
    {icon:<Entypo name="game-controller" size={24} color="black" />,
    
    title: 'Games & esports',
    name: 'game'},
    {icon:<FontAwesome name="gears" size={24} color="black" />,
     
    title: 'Engineering',
    name:'engineering'},
]

//Dats Filter List

const dayRanges = [
    {
        name: 'All',
        code: 'all'
    },
    {
        name: 'Today',
        code: 'today'
    },
    {
        name: 'Tomorrow',
        code: 'tomorrow'
    },
    {
        name: 'This week',
        code: 'thisweek'
    },
    {
        name: 'This weekend',
        code: 'thisweekend'
    },
    {
        name: 'Next week',
        code: 'nextweek'
    },
    {
        name: 'This month',
        code: 'thismonth'
    },
    {
        name: 'Next month',
        code: 'nextmonth'
    },
]




//Events Categories Item

const EventCategory = ({item, handleAddRemoveCategory, selectedCategories}: {item: { icon: string, title: string, name: string}, selectedCategories: string [], handleAddRemoveCategory: (item: string) => void}) => {
    return (
      
        <ThemedView>
            <Pressable style={styles.eventCategoryItem} onPress={()=> handleAddRemoveCategory(item.name)}>
                <View >
                    {item.icon}
                </View>
                {selectedCategories.includes(item.name) ? <ThemedText style={styles.eventTextSelected} numberOfLines={1} >{item.title}</ThemedText> : 
                <ThemedText style={styles.eventText} numberOfLines={1} >{item.title}</ThemedText> }
            </Pressable>
        </ThemedView>
       )

}



export default function SearchScreen() {

    


    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    type categoryItemSelected = string

    const [selectedCategories, setSelectedCategories] = useState<categoryItemSelected []>([])
    const [openLocationComponent, setOpenLocationComponent] = useState<boolean>(false)
    const [filterModal, setFilterModal] = useState<boolean>(false)
    const [dateFilterCode, setDateFilter] = useState<string>('all')

    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [events, setEvents] = useState([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')


    type CategoryProps = {item : { icon: string, title: string, name: string}}



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

            setStartDate(moment().add(1, 'month').startOf('month').format())
            setEndDate(moment().add(1, 'month').endOf('month').format())
            
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


    const renderEventsCategories = ({item}: CategoryProps) => {
        return(
            <EventCategory item={item} selectedCategories={selectedCategories} handleAddRemoveCategory={handleAddRemoveCategory}  />
        )
    }

    const renderEvents = ({item}) => {
        return(
            <EventBody item={item} screenType="search" />
        )
    }


    const handleGetEvents = async () => {
    
            try {

                setLoadingEvents(true)
    
                const { data, errors } = await client.queries.searchEventsWithFilter({
                       
                searchTerm: searchTerm,
                categories: selectedCategories,
                startDate: startDate,
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude
                
                    
                });

                setEvents(data)
                setLoadingEvents(false)
                
      
    
            } catch(e) {

                setLoadingEvents(e?.message)
               
    
            }
    
            
        }
    

        useEffect(()=> {

            handleGetEvents()

        },[selectedCategories, userLocation])
        



  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.searchInputComponent}>
                <TextInput style={styles.searchInput} placeholder='Search...' value={searchTerm} onChangeText={(e)=> setSearchTerm(e)}/>
                <TouchableOpacity style={styles.searchButton} onPress={()=> handleGetEvents()}>
                    <AntDesign size={24} name="search1" color={'#1184e8'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={()=> setFilterModal(true)}>
                    <MaterialCommunityIcons name='filter-variant' size={24} />
                </TouchableOpacity>
            </ThemedView>
            {filterModal ? 
            <ThemedView style={styles.filterModal}>
                <ThemedView style={styles.filterModalCloseSection}><View></View><TouchableOpacity onPress={()=> setFilterModal(false)}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity></ThemedView>
                
                <ThemedView style={styles.filterComponent}>
                    {dayRanges.map((item, i)=> {
                        return(
                            <ThemedView  key={i}>
                                <TouchableOpacity style={styles.filterDateButton}>
                                    {dateFilterCode === item.code ? <ThemedText style={styles.selectedDateCodeText}>{item.name}</ThemedText>: <ThemedText>{item.name}</ThemedText> }
                                </TouchableOpacity>
                            </ThemedView>
                            
                        )
                    })}
                </ThemedView>
            </ThemedView>: null}
            <ThemedView ></ThemedView>
            <ThemedView style={styles.categoriesBody}>
                <FlatList 
                    data={eventsCategories}
                    horizontal
                    renderItem={renderEventsCategories}
                    keyExtractor={(item)=> item.name}
                    showsHorizontalScrollIndicator={false}/>
                
            </ThemedView>
            <Pressable style={styles.addressComponent} onPress={()=> setOpenLocationComponent(!openLocationComponent)}>
                {!openLocationComponent ? <MaterialIcons name='keyboard-arrow-down' size={20}/> : <MaterialIcons name='keyboard-arrow-up' size={20}/> }
                <MaterialIcons name='location-on' size={16} color={'#1184e8'} />
                <ThemedText numberOfLines={1} style={styles.addressText} >{userAddress}</ThemedText>
            </Pressable>
            {openLocationComponent ? 
            <ThemedView>
                <LocationComponent />
            </ThemedView>: null}
           <ThemedView>
                {errorLoadingEvents ?

                <TouchableOpacity style={styles.errorButton}>
                    <ThemedText>{`${errorLoadingEvents}...press to retry`}
                    </ThemedText>
                </TouchableOpacity>
                : null}
            </ThemedView>
            {!loadingEvents ? 
            <ThemedView>
               {events.length > 0 ? 
               <FlatList 
                    contentContainerStyle={{paddingBottom: 150}}
                    data={events}
                    renderItem={renderEvents}
                    keyExtractor={(item)=> item.id} 
                    showsVerticalScrollIndicator={false}/>
                    : <ThemedView><ThemedText style={styles.noEventsBody}>No events near you.</ThemedText></ThemedView>}
            </ThemedView>
            :<ThemedView><ActivityIndicator /></ThemedView>}
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
    eventCategoryItem: {
    
        alignItems: 'center',
        marginHorizontal: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        
        
      
    },
    categoriesBody: {
        marginTop: 10,
        height: 70
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
        backgroundColor: 'gray'
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
      
        
        paddingHorizontal: 5,
        width: '80%',
        
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
    addressComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    addressText: {
        marginLeft: 5,
        width: windowWidth * 0.8
    },
    errorButton: {
        marginVertical: 5
    },
    noEventsBody: {
        marginVertical: 10
    },
    filterModal: {
        position: 'absolute',
        zIndex: 20,
        top: 10,
        padding: 10,
        width: '95%',
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
        alignItems: "flex-start"
    },
    selectedDateCodeText: {
        color: "#1184e8"
    }
    
  
    
});
