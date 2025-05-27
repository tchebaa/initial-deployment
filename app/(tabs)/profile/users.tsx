import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons'; 
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
import moment from 'moment';
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import {useLanguage} from '../../../context/LanguageContext'
import {useAdmin} from '../../../context/TchebaaAdminContext'
import {useUser} from '../../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


interface User {
    id: string;
    email: string;
    postEventLimit: number;
    createdAt: string;
    name: string;
    pushNotificationToken: string;
    pushNotificationEnabled: boolean;
  }


export default function Users() {

    const {t, handleChangeLanguage, currentLanguageCode} = useLanguage()
    const [pageType, setPageType] = useState<string>(t('users'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    
    const colorScheme = useColorScheme();

    const [users, setUsers] = useState<User []>([])
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
    const [loadingUsersError, setLoadingUsersError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

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
    
                setStartDate(moment(new Date()).format().toString())
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
    
    

  
    const handleGetUsers = async () => {

        setLoadingUsers(true)

        try{

            setLoadingUsersError(false)

            if(dateFilterCode === 'all') {

                const { data, errors } = await client.models.User.list({
                    
                })

                if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setUsers(filtered as User[]);
                    setLoadingUsers(false)
                  
                    }

            } else {

                const { data, errors } = await client.models.User.list({
                    filter: {
                        and:[
                            {
                                createdAt: { gt: startDate}
                            },
                            {
                                createdAt: { lt: endDate}
                            }
                            
                        ]
                    }
                })

                if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setUsers(filtered as User[]);
                    setLoadingUsers(false)
                  
                    }

            }

           




        } catch(e) {

            setLoadingUsersError(true)

        }

    }

    const handleSearchUsers = async () => {
    
        try {

            setLoadingUsers(true)

            const { data, errors } = await client.models.User.list({
                    filter: {
                        email: {
                            beginsWith: searchTerm
                        }
                    }
            })

            if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setUsers(filtered as User[]);
                    setLoadingUsers(false)
                  
                    }
            
  

        } catch(e) {

            setLoadingUsersError(true)
           

        }

        
    }



    useEffect(()=> {

        handleGetUsers()

    },[dateFilterCode])


  

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType}/>
            
            <ThemedView style={styles.usersHeader}>
                <ThemedText type='subtitle'>{t('users')}</ThemedText>
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
                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.searchInputComponent]}>
                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.searchInput]} placeholder={t('search')} placeholderTextColor={colorScheme === 'light' ? 'gray': 'white'} value={searchTerm} onChangeText={(e)=> setSearchTerm(e)}/>
                    <TouchableOpacity style={styles.searchButton} onPress={()=> handleSearchUsers()}>
                        <AntDesign size={24} name="search1" color={'#1184e8'} />
                    </TouchableOpacity>
                </ThemedView> 
                
            
            {!loadingUsers ? 
            <ThemedView>
                <ThemedView style={styles.totalBody}>
                    <ThemedView></ThemedView>
                    <ThemedView style={styles.totalComponent}>
                        <ThemedText>{t('total')}:</ThemedText>
                        <ThemedText style={styles.totalNumber}>{users.length}</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}} >
                <ThemedView>
                    {users.length > 0 ? 
                    <ThemedView>
                        {users.map((item, i)=> {
                            return(
                                <ThemedView key={i} style={styles.userComponent}>
                                    <Link href={{ pathname: '/(tabs)/profile/oneUser', params: {id: item.id, email: item.email}}} asChild>
                                        <TouchableOpacity>
                                            <ThemedText>{item.email}</ThemedText>
                                            <ThemedText>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</ThemedText>
                                        </TouchableOpacity>
                                    </Link>
                                    
                                </ThemedView>
                            )
                        })}
                    </ThemedView>:
                    <ThemedView></ThemedView>}
                </ThemedView>
                </ScrollView>
            </ThemedView>
            : <ActivityIndicator/>}
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
        width: windowWidth * 0.95,
        alignItems: 'center',
        flexDirection: 'column'
        
    },
    
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
        marginTop: 10,
        borderColor: 'gray'
    },
    buttonText: {
        marginRight: 5
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
    usersHeader: {
        marginTop: 10,
        width: '100%'
    },
    totalBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5
    },
    totalComponent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalNumber: {
        marginLeft: 5
    },
    userComponent: {
        
        borderTopWidth: 0.5,
        
        borderColor: 'gray',
        paddingVertical: 5,
        marginTop: 5
       
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
    searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%',
        
        height: 40
    },
  
  
  
});