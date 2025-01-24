import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import GoogleLoginButton from '../components/appComponents/GoogleLoginButton'
import { Link, useRouter } from 'expo-router';
import {signIn, getCurrentUser} from '@aws-amplify/auth'
import {useUser} from '../context/UserContext'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function SignInScreen() {

    const {userDetails, setUserDetails} = useUser()

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [loginError, setLoginError] = useState<string>('')
    const [loadingLogIn, setLoadingLogin] = useState<boolean>(false)


    const router = useRouter()
    
    
    const checkCurrentUser = async () => {



      try{

        const { username, userId, signInDetails } = await getCurrentUser();

        

      

      if(userId) {

        setUserDetails({username: signInDetails?.loginId, userId: userId})
        
        router.push('/locationScreen')
      }

      } catch (e) {
        console.log(e)
      }
      


    }

    useEffect(()=> {

     checkCurrentUser()

    
    },[loadingLogIn])

    


    const handleLogin = async () => {

      if(email.length > 1) {

        setEmailError('')

        if(password.length > 1) {

          setPasswordError('')

          setLoadingLogin(true)

          try {

      
            const user = await signIn({
              username: email,
              password: password,
            }).then((e)=> { setLoginError(''); setLoadingLogin(false); console.log(e)})
    
            
    
          } catch(e) {
            console.log(e)
    
            setLoginError(e?.message)
            setLoadingLogin(false)
    
          
            
          }


        } else {

          setPasswordError('Password is required')

        }

      } else {

        setEmailError('Email is required')

      }

      

      
     
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
            {loadingLogIn ? 
              <ThemedView style={styles.loadingLoginModal}>
                <ThemedText>Logging in...</ThemedText>
                <ActivityIndicator />
              </ThemedView>: null}
            <ThemedView style={styles.loginContainer}>
                <TextInput placeholder='Email' style={styles.inputContainer} value={email} onChangeText={(e)=> setEmail(e)}/>
                  {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText>: null}
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.inputContainer} value={password} onChangeText={(e)=> setPassword(e)}/>
                  {passwordError ? <ThemedText style={styles.errorText}>{passwordError}</ThemedText>: null}
                  {loginError ? <ThemedText style={styles.errorText}>{loginError}</ThemedText>: null}
                <ThemedView style={styles.forgotPasswordBody}>
                  <Link href={'/forgotPassword'} asChild>
                    <TouchableOpacity>
                        <ThemedText type='default'>Forgot Password?</ThemedText>
                    </TouchableOpacity>
                  </Link>
                    
                </ThemedView>
                <ThemedView style={styles.forgotPasswordBody}>
                    <Link href={'/confirmAccount'} asChild>
                      <TouchableOpacity>
                          <ThemedText type='default'>Didn't confirm email? Resend code.</ThemedText>
                      </TouchableOpacity>
                    </Link>
                </ThemedView>
                <TouchableOpacity style={styles.loginButton} onPress={()=> handleLogin()}>
                    <ThemedText style={styles.loginText}>Login</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <GoogleLoginButton />
            
            <ThemedView style={styles.signupContainer}>
                <ThemedText type='default'>New user?</ThemedText>
                <Link href={{pathname: "/signUp", params: {screenType: 'login'}}} asChild>
                    <Pressable>
                        <ThemedText style={styles.signupText}>Sign up</ThemedText>
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
    fontFamily:"PoppinsSemibold",
    padding: 5
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
  },
  loadingLoginModal: {
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
  errorText: {
    margin: 5,
    color: 'red'
  }
});
