import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import GoogleLoginButton from '../components/appComponents/GoogleLoginButton'
import { Link } from 'expo-router';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function SignInScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => void {


    }


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" >Let's get started!</ThemedText>
               
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Log in</ThemedText>
                
            </ThemedView>
            <ThemedView style={styles.loginContainer}>
                <TextInput placeholder='Email' style={styles.inputContainer} value={email} onChangeText={(e)=> setEmail(e)}/>
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.inputContainer} value={password} onChangeText={(e)=> setPassword(e)}/>
                <ThemedView style={styles.forgotPasswordBody}>
                    <Pressable>
                        <ThemedText type='default'>Forgot Password?</ThemedText>
                    </Pressable>
                </ThemedView>
                <Pressable style={styles.loginButton}>
                    <ThemedText style={styles.loginText}>Login</ThemedText>
                </Pressable>
            </ThemedView>
            <GoogleLoginButton />
            
            <ThemedView style={styles.signupContainer}>
                <ThemedText type='default'>New user?</ThemedText>
                <Link href={"/signUp"} asChild>
                    <Pressable>
                        <ThemedText style={styles.signupText}>Sign up</ThemedText>
                    </Pressable>
                </Link>
                
                
            </ThemedView>
            <ThemedView style={styles.skipContainer}>
                <Link href={"/locationScreen"} asChild>
                    <Pressable>
                        <ThemedText type='default'>Skip for now</ThemedText>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width:"95%",
    marginTop: 40
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: '95%'
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loginContainer: {
    marginTop: 100,
    width: '95%'
  },
  inputContainer: {
    borderWidth: 0.5,
    marginTop: 20,
    borderRadius: 5,
    fontFamily:"PoppinsSemibold"
  },
  loginButton: {
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius:5,
    borderColor: '#1184e8',
    fontFamily: "PoppinsSemibold"
  },
  loginText: {
    color: "#1184e8",
    fontFamily: "PoppinsSemibold",
    fontSize: 16
  },
  forgotPasswordBody:{
    
    marginTop: 20,
    alignItems: 'flex-end',
    justifyContent:'flex-end'
  },
  signupContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupText: {
    color: "#1184e8",
    fontFamily: "PoppinsSemibold",
    fontSize: 16,
    marginLeft: 5
  },
  skipContainer: {
    marginTop: 40
  }
});
