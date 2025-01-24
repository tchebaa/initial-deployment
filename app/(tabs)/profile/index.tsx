import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {FontAwesome, MaterialCommunityIcons, AntDesign, Ionicons} from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import {signOut} from '@aws-amplify/auth'
import {useUser} from '../../../context/UserContext'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function ProfileScreen() {

    const {userDetails, setUserDetails} = useUser()

    const router = useRouter()

    const [openSignOutModal, setOpenSignOutModal] = useState<boolean>(false)
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


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            {openSignOutModal ? 
            <ThemedView style={styles.signOutModal}>
                <ThemedText>Are you sure you want to sign out?</ThemedText>
                {loadingSignOut ? <ActivityIndicator /> : 
                <ThemedView style={styles.signOutOptionBody}>
                    <TouchableOpacity style={styles.declineSignOutButton} onPress={()=> setOpenSignOutModal(false)}>
                        <ThemedText type='defaultSemiBold'>No</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptSignOutButton} onPress={()=> handleSignOut()}>
                        <ThemedText type='defaultSemiBold' style={styles.acceptSignOutText}>Yes</ThemedText>
                    </TouchableOpacity>
                </ThemedView>}
            </ThemedView>: null}
            <ThemedView style={styles.pageHeader}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                <View></View>
            </ThemedView>
            
            <ThemedView style={styles.buttonsBody}>
                <Link href={{pathname: '/(tabs)/profile/postEvent', params: {screenName: 'post', id: null}}} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Post Event</ThemedText>
                        <FontAwesome name='calendar-plus-o' size={24}/>
                    </Pressable>
                </Link>
                <Link href={'/(tabs)/profile/manageEvents'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Manage Events</ThemedText>
                        <MaterialCommunityIcons name="calendar-cursor" size={24} color="black" />
                    </Pressable>
                </Link>
                <Link href={'/(tabs)/profile/message'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Messages</ThemedText>
                        <MaterialCommunityIcons name="message-outline" size={24} color="black" />
                    </Pressable>
                </Link>
                <Link href={'/(tabs)/profile/settings'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Settings</ThemedText>
                        <AntDesign name="setting" size={24} color="black" />
                    </Pressable>
                </Link>
                <ThemedView style={styles.signOutBody}>
                    <TouchableOpacity style={styles.loginButton} onPress={()=> setOpenSignOutModal(true)}>
                        <ThemedText style={styles.loginText}>Sign Out</ThemedText>
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
      }
  
  
});
