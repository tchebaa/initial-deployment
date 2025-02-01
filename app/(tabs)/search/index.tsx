import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, FontAwesome5, Entypo, Feather, Octicons } from '@expo/vector-icons'; 
import EventBody from '@/components/appComponents/EventBody';
import LocationComponent from '@/components/appComponents/LocationComponent';
import {useLocation} from '../../../context/LocationContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import moment from 'moment';
import RNDateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useLanguage} from '../../../context/LanguageContext'


const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height






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

    


    const {t} = useLanguage()
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
                longitude: userLocation?.longitude,
                endDate: endDate
                
                    
                });

                setEvents(data)
                setLoadingEvents(false)
                
      
    
            } catch(e) {

                setLoadingEvents(e?.message)
               
    
            }
    
            
        }
    

        useEffect(()=> {

            handleGetEvents()

        },[selectedCategories, userLocation, startDate, endDate])
        




        

//Dats Filter List

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


        //Events Categories List

        const eventsCategories = [
            {icon:<Entypo name="graduation-cap" size={24} color="black" />,
            title: t('education'),
            name:'education'},
            {icon:<FontAwesome name="music" size={24} color="black"/>,
            title: t('music'),
            name:'music'},
            {
            icon: <Ionicons name="moon-sharp" size={24} color="black"/>, 
            title: t('night.party'),
            name:'night'},
            {icon:<Feather name="video" size={24} color="black" />,
            
            title: t('entertainment'),
            name: 'entertainment'},
            {icon:<Octicons name="graph" size={24} color="black" />,
            
            title: t('markets'),
            name: 'markets'},
            {icon:<MaterialCommunityIcons name="drama-masks" size={25} color="black" />,
            
            title: t('performance.visuals'),
            name: 'visuals'},
            {icon:<Foundation name="camera" size={24} color="black"/>,
            
            title: t('photography'),
            name:'photography'},
            {icon:<FontAwesome5 name="laptop-code" size={24} color="black" />,
            title: t('software.tech'),
            name: 'software'},
            {icon:<Entypo name="laptop" size={24} color="black" />, 
            title: t('information.technology'),
            name: 'informationtechnology'},
            {icon:<MaterialCommunityIcons name="stethoscope" size={24} color="black" />,
            title: t('health'),
            name:'health'},
            {icon:<FontAwesome5 name="hospital-symbol" size={24} color="black" />,
            title: t('hospitals.and.clinics'),
            name:'hospital'},
            {icon:<MaterialIcons name="medication" size={24} color="black" />,
            title: t('pharmacy'),
            name:'pharmacy'},
            {icon:<Ionicons name="fast-food-outline" size={24} color="black" />,
             
            title: t('food.drink'),
            name:'food'},
            {
            icon: <FontAwesome name="briefcase" size={24} color="black"/>, 
            title: t('business'),
            name:'business'},
            {icon:<MaterialIcons name="directions-run" size={24} color="black"/>,
            
            title: t('sports.fitness'),
            name:'sports'},
            {icon:<FontAwesome5 name="globe-africa" size={24} color="black" />,
            
            title: t('travel.tourism'),
            name:'travel'},
            {icon:<MaterialCommunityIcons name="corn" size={24} color="black"  />,
             
            title: t('agriculture'),
            name:'agriculture'},
            {
            icon: <MaterialCommunityIcons name="pine-tree" size={24} color="black"  />, 
            title: t('environment'),
            name:'environment'},
            {icon:<MaterialCommunityIcons name="hand-heart-outline" size={24} color="black"  />,
             
            title: t('charity.fundraising'),
            name:'charity'},
            {icon:<FontAwesome5 name="pray" size={24} color="black"/>,
             
            title: t('religion.spirituality'),
            name:'religion'},
            {icon:<FontAwesome5 name="mountain" size={24} color="black"/>,
             
            title: t('outdoor.activities'),
            name:'outdoor'},
            {icon:<Ionicons name="brush-outline" size={24} color="black"/>,
             
            title: t('art'),
            name: 'art'},
            {icon:<Entypo name="game-controller" size={24} color="black" />,
            
            title: t('games.esports'),
            name: 'game'},
            {icon:<FontAwesome name="gears" size={24} color="black" />,
             
            title: t('engineering'),
            name:'engineering'},
        ]


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
                                <TouchableOpacity style={styles.filterDateButton} onPress={()=> handleDateChange(item.code)}>
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
                    <ThemedText>{`${errorLoadingEvents}...${t('press.to.retry')}`}
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
                    : <ThemedView><ThemedText style={styles.noEventsBody}>{t('no.events.near.you')}</ThemedText></ThemedView>}
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
