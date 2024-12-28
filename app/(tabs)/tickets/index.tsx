import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function TicketsScreen() {

    

    const handleSignup = () => void {


    }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.headerTextBody}>
                <ThemedText type='subtitle'>I'm going!</ThemedText>
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
    headerTextBody: {
        width: '95%',
        marginTop: 10
    }
  
  
  
  
});
