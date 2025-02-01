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



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function Settings() {

    const {t, handleChangeLanguage} = useLanguage()
  const [pageType, setPageType] = useState<string>('settings')
  const [langaugeSectionOption, setLanguageSectionOption] = useState<boolean>(false)


  

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType}/>
            <ThemedView style={styles.languageBody}>
                <ThemedView style={styles.langaugeSection}>
                    <ThemedText type='boldSmallTitle'>{t('language')}</ThemedText>
                    <TouchableOpacity onPress={()=> {setLanguageSectionOption(!langaugeSectionOption)}}> 
                        {!langaugeSectionOption ? <MaterialIcons name='keyboard-arrow-down' size={20}/> 
                        : <MaterialIcons name='keyboard-arrow-up' size={20}/>}
                    </TouchableOpacity>
                </ThemedView>
                {langaugeSectionOption ? 
                <ThemedView>
                    <TouchableOpacity style={styles.activeLanguage} onPress={()=> handleChangeLanguage('en')}><ThemedText>{t('english')}</ThemedText></TouchableOpacity>
                    <TouchableOpacity onPress={()=> handleChangeLanguage('fr')}><ThemedText>{t('french')}</ThemedText></TouchableOpacity>
                </ThemedView>: null}
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

    }

  
  
  
  
});