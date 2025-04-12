import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import {useLanguage} from '../../../context/LanguageContext'
import {useAdmin} from '../../../context/TchebaaAdminContext'
import {useUser} from '../../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function Admin() {

    const {t, handleChangeLanguage, currentLanguageCode} = useLanguage()
    const [pageType, setPageType] = useState<string>(t('administrator'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    const colorScheme = useColorScheme();


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)
  


  

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType}/>
            <Link href={{pathname: '/(tabs)/profile/postEvent', params: {screenName: 'admin', id: null}}} asChild>
                <Pressable style={styles.button}>
                    <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('post.event')}</ThemedText>
                    <FontAwesome name='calendar-plus-o' size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>
                </Pressable>
            </Link>
            <Link href={{pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'admin'}}} asChild>
                <Pressable style={styles.button}>
                    <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('manage.events')}</ThemedText>
                    <MaterialCommunityIcons name="calendar-cursor" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                </Pressable>
            </Link>
            <Link href={{pathname: '/(tabs)/profile/allAdmins', params: {screenName: 'admin'}}} asChild>
                <Pressable style={styles.button}>
                    <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('all.administrators')}</ThemedText>
                    <Ionicons name="person-circle-outline" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                </Pressable>
            </Link>
            <Link href={{pathname: '/(tabs)/profile/analytics', params: {screenName: 'admin'}}} asChild>
                <Pressable style={styles.button}>
                    <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('analytics')}</ThemedText>
                    <Ionicons name="analytics" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                </Pressable>
            </Link>
            <Link href={{pathname: '/(tabs)/profile/users', params: {screenName: 'admin'}}} asChild>
                <Pressable style={styles.button}>
                    <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('users')}</ThemedText>
                    <MaterialIcons name="people-outline" size={24}  color={ colorScheme === 'dark' ? "white" : "black"} />
                </Pressable>
            </Link>
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
        
    },
    
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
        marginTop: 20,
        borderColor: 'gray'
    },
    buttonText: {
        marginRight: 5
    },

  
  
  
  
});