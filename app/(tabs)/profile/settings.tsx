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
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import {useLanguage} from '../../../context/LanguageContext'
import {useUser} from '../../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'

const client = generateClient<Schema>();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function Settings() {

const {t, handleChangeLanguage, currentLanguageCode} = useLanguage()
const {userDetails, onlineUserDetails, loadingOnlineUserDetails, setChangedStatus, changedStatus} = useUser()
const colorScheme = useColorScheme();
  const [pageType, setPageType] = useState<string>('settings')
  const [langaugeSectionOption, setLanguageSectionOption] = useState<boolean>(false)

  const handleChangedPushNotificationStatus = async (id: string, notificationStatus: boolean) => {

   

    try{

      
        const { data, errors } = await client.models.User.update({
            id: id,
            pushNotificationEnabled: !notificationStatus
          });

          setChangedStatus(!changedStatus)
          
        

    } catch (e) {

       

    }

  }

  useEffect(()=> {
    
  },[onlineUserDetails])
  


  

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType}/>
            <ThemedView style={styles.languageBody}>
                <ThemedView style={styles.langaugeSection}>
                    <ThemedView style={styles.languageCodeComponent}>
                        <ThemedText type='boldSmallTitle'>{t('language')}</ThemedText>
                        <ThemedText>{` - `}</ThemedText>
                        <ThemedText style={styles.languageCodeText} type='boldSmallTitle'>{currentLanguageCode}</ThemedText>
                    </ThemedView>
                    
                    <TouchableOpacity onPress={()=> {setLanguageSectionOption(!langaugeSectionOption)}}> 
                        {!langaugeSectionOption ? <MaterialIcons name='keyboard-arrow-down' size={20} color={ colorScheme === 'dark' ? "white" : "black"}/> 
                        : <MaterialIcons name='keyboard-arrow-up' size={20} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                    </TouchableOpacity>
                </ThemedView>
                {langaugeSectionOption ? 
                <ThemedView>
                    {currentLanguageCode === 'en' ? 
                    <TouchableOpacity style={styles.activeLanguage} onPress={()=> handleChangeLanguage('en')}><ThemedText>{t('english')}</ThemedText></TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.inactiveLanguage} onPress={()=> handleChangeLanguage('en')}><ThemedText>{t('english')}</ThemedText></TouchableOpacity>}
                    {currentLanguageCode === 'fr' ? 
                    <TouchableOpacity style={styles.activeLanguage} onPress={()=> handleChangeLanguage('fr')}><ThemedText>{t('french')}</ThemedText></TouchableOpacity>
                    :<TouchableOpacity style={styles.inactiveLanguage}  onPress={()=> handleChangeLanguage('fr')}><ThemedText>{t('french')}</ThemedText></TouchableOpacity>}
                </ThemedView>: null}
            </ThemedView>
            <ThemedView style={styles.notificationBody}>
                <ThemedText type='boldSmallTitle'>{t('notification')}</ThemedText>
                {!loadingOnlineUserDetails? 
                <ThemedView>
                    {onlineUserDetails ?
                    <TouchableOpacity onPress={()=> handleChangedPushNotificationStatus(onlineUserDetails.id, onlineUserDetails.pushNotificationEnabled)}>
                        {onlineUserDetails.pushNotificationEnabled  ? 
                        <MaterialCommunityIcons name='radiobox-marked' size={20} color={'#1184e8'}/>
                        : <MaterialCommunityIcons name='radiobox-marked' size={20} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                    </TouchableOpacity>:
                    <ThemedView></ThemedView>}
                </ThemedView>
                :<ActivityIndicator/>}
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
    languageBody: {
        borderWidth: 0.5,
        marginVertical: 10,
        padding: 5,
        width: '95%'
    },
    langaugeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    activeLanguage: {
        borderWidth: 0.5,
        padding: 5,
        marginVertical: 5,
        borderColor: '#1184e8'
    },
    inactiveLanguage: {

        borderWidth: 0.5,
        padding: 5,
        marginVertical: 5,
        borderColor: 'gray'

    },
    languageCodeComponent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    languageCodeText: {
        color:'#1184e8'
    },
    notificationBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "95%",
        padding: 5
    }

  
  
  
  
});