import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {FontAwesome, MaterialCommunityIcons, AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import {signOut, deleteUser} from '@aws-amplify/auth'
import {useUser} from '../../../context/UserContext'
import {useLanguage} from '../../../context/LanguageContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import {useAdmin} from '../../../context/TchebaaAdminContext'
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';


const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function ProfileScreen() {

    const {userDetails, setUserDetails, onlineUserDetails} = useUser()
    const {admins} = useAdmin()
    const {t} = useLanguage()

    const colorScheme = useColorScheme();
    const router = useRouter()

    const [openSignOutModal, setOpenSignOutModal] = useState<boolean>(false)
    const [openDeleteAccountModal, setDeleteAccountModal] = useState<boolean>(false)
    const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false)

    

    const handleSignOut = async () => {

        try {

            setLoadingSignOut(true)

            await signOut().then((e)=> {setUserDetails(null)})

            setLoadingSignOut(false)

        } catch(e) {

            setLoadingSignOut(false)

        }

    }


    const handleDeleteUserDetails = async () => {

        const { data, errors } = await client.models.OnlineUser.delete({

            id: onlineUserDetails?.id

          });
        

        

    }

   

    const handleDeleteAccount = async () => {

        handleSignOut()
        handleDeleteUserDetails()

        await deleteUser()
        

        

    }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            {openSignOutModal ? 
            <ThemedView style={styles.signOutModal}>
                <ThemedText>{t('are.you.sure.you.want.to.sign.out')}</ThemedText>
                {loadingSignOut ? <ActivityIndicator /> : 
                <ThemedView style={styles.signOutOptionBody}>
                    <TouchableOpacity style={styles.declineSignOutButton} onPress={()=> setOpenSignOutModal(false)}>
                        <ThemedText type='defaultSemiBold'>{t('no')}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptSignOutButton} onPress={()=> handleSignOut()}>
                        <ThemedText type='defaultSemiBold' style={styles.acceptSignOutText}>{t('yes')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>}
            </ThemedView>: null}
            {openDeleteAccountModal ? 
            <ThemedView style={styles.signOutModal}>
                <ThemedText>{t('are.you.sure.you.want.to.delete.your.account')}</ThemedText>
                {loadingSignOut ? <ActivityIndicator /> : 
                <ThemedView style={styles.signOutOptionBody}>
                    <TouchableOpacity style={styles.declineSignOutButton} onPress={()=> setDeleteAccountModal(false)}>
                        <ThemedText type='defaultSemiBold'>{t('no')}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptSignOutButton} onPress={()=> handleSignOut()}>
                        <ThemedText type='defaultSemiBold' style={styles.acceptSignOutText}>{t('yes')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>}
            </ThemedView>: null}
            <ThemedView style={styles.pageHeader}>
                <Ionicons name="person-circle-outline" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                <View></View>
            </ThemedView>
            
            <ThemedView style={styles.buttonsBody}>
                <Link href={{pathname: '/(tabs)/profile/postEvent', params: {screenName: 'post', id: null}}} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('post.event')}</ThemedText>
                        <FontAwesome name='calendar-plus-o' size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>
                    </Pressable>
                </Link>
                <Link href={{pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'main'}}} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('manage.events')}</ThemedText>
                        <MaterialCommunityIcons name="calendar-cursor" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                    </Pressable>
                </Link>
                <Link href={'/(tabs)/profile/message'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('messages')}</ThemedText>
                        <MaterialCommunityIcons name="message-outline" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                    </Pressable>
                </Link>
                <Link href={'/(tabs)/profile/settings'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('settings')}</ThemedText>
                        <AntDesign name="setting" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                    </Pressable>
                </Link>
                {admins?.some((admin)=> admin.email === userDetails?.username) ? 
                <Link href={'/(tabs)/profile/admin'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>{t('administrator')}</ThemedText>
                        <MaterialIcons name="admin-panel-settings" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                    </Pressable>
                </Link>: null}
                <ThemedView style={styles.signOutBody}>
                    <TouchableOpacity style={styles.loginButton} onPress={()=> setOpenSignOutModal(true)}>
                        <ThemedText style={styles.loginText}>{t('sign.out')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
                <ThemedView style={styles.deleteAccount}>
                    <TouchableOpacity style={styles.deleteAccountButton} onPress={()=> setDeleteAccountModal(true)}>
                        <ThemedText style={styles.deleteAccountText}>{t('delete.account')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
                
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
        padding: 5,
        height: '100%',
        alignItems: 'center',
        
    },
    buttonsBody: {
        width: windowWidth,
        padding: 10
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
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10
    },
    loginButton: {
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        borderColor: "#FF4D00",
        fontFamily: "PoppinsSemibold"
      },
      loginText: {
        color: "#FF4D00",
        fontFamily: "PoppinsSemibold",
        fontSize: 16
      },
      signOutBody: {
        marginTop:50
      },
      signOutModal: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 200,
        width: '90%',
        height: 200,
        zIndex: 20
      },
      signOutOptionBody:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      declineSignOutButton: {
        borderWidth: 1,
        paddingHorizontal: 10,
        margin: 10
      },
      acceptSignOutButton: {
        borderWidth: 1,
        paddingHorizontal: 10,
        margin: 10,
        borderColor: 'red'
      },
      acceptSignOutText: {
        color: 'red'
      },
      deleteAccount: {
        marginTop: 20
      },
      deleteAccountButton: {
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        borderColor: "red",
        fontFamily: "PoppinsSemibold"
      },
      deleteAccountText: {
        color: "red",
        fontFamily: "PoppinsSemibold",
        fontSize: 16
      },
  
  
});
