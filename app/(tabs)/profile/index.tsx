import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {FontAwesome, MaterialCommunityIcons, AntDesign, Ionicons} from '@expo/vector-icons';
import { Link } from 'expo-router';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function ProfileScreen() {

    

    const handleSignup = () => void {


    }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.pageHeader}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                <View></View>
            </ThemedView>
            
            <ThemedView style={styles.buttonsBody}>
                <Link href={'/(tabs)/profile/postEvent'} asChild>
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
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Message</ThemedText>
                        <MaterialCommunityIcons name="message-outline" size={24} color="black" />
                    </Pressable>
                </Link>
                <Link href={'/(tabs)/profile/settings'} asChild>
                    <Pressable style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Settings</ThemedText>
                        <AntDesign name="setting" size={24} color="black" />
                    </Pressable>
                </Link>
                
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
    }
  
  
});
