import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';


//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height



export default function GoogleLoginButton() {


  return (
    <ThemedView style={styles.body}>
        <Pressable style={styles.container}>
            <AntDesign name="google" size={24} color="#4285F4" />
            <ThemedText type='default' style={styles.continueText}>Continue with Google</ThemedText>
        </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        alignItems: 'center'
    },
   container: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 5,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    borderColor: ' #808080'
   },
   continueText: {
    marginLeft: 5
   }
});
