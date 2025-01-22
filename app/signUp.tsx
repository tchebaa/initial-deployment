import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import GoogleLoginButton from '../components/appComponents/GoogleLoginButton'
import { Link, useRouter } from 'expo-router';
import {useUser} from '../context/UserContext'

import {signUp, getCurrentUser, confirmSignUp, resendSignUpCode, signIn} from '@aws-amplify/auth'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function SignUp() {


    const {userDetails, setUserDetails} = useUser()

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('')
    const [signUpError, setSignUpError] = useState<string>('')
    const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false)
    const [codeConfirm, setCodeConfirm] = useState<string>('')
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [confirmError, setConfirmError] = useState<string>('')
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [resendCodeModal, setResendCodeModal] = useState<boolean>(false)


    const router = useRouter()



    const checkCurrentUser = async () => {

      

      try{

        const { username, userId, signInDetails } = await getCurrentUser();

        


      if(userId) {

        setUserDetails({username: username, userId: userId})
        router.push('/locationScreen')
        
      }

      } catch (e) {
        
      }
      

    }


    useEffect(()=> {

      
      checkCurrentUser()

      if(userDetails) {

        router.push('/locationScreen')

      }

    },[loadingSignUp, userDetails])


    const handleConfirm = async () => {


      if(codeConfirm.length > 0 ) {

        try {

          const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: email,
            confirmationCode: codeConfirm
          })
  
          console.log(isSignUpComplete)
  
          if(isSignUpComplete) {

            const user = await signIn({
              username: email,
              password: password,
            }).then((e)=> { setConfirmError(''); setConfirmModal(false); console.log(e); router.push('/locationScreen')})
  
          
          }
  
  
        } catch(e) {
  
          console.log(e?.message)
          setConfirmError(e?.message)
  
        }

      }

      

      

    }


    useEffect(()=> {

      if(userDetails) {

        router.push('/locationScreen')

      }

    },[userDetails])


    const handleSignup = async () => {

      if(email.length > 0) {

        setEmailError('')

        if(password.length > 0) {

          setPasswordError('')

          if(password === repeatPassword) {

            setRepeatPasswordError('')

            setLoadingSignUp(true)

            try {
      
            
              const user = await signUp({
                username: email,
                password: password,
              }).then((e)=> {setSignUpError(''); setLoadingSignUp(false) ;console.log(e); setConfirmModal(true)})
      
              
      
            } catch(e) {

              console.log(e)

              setSignUpError(e?.message)
              setLoadingSignUp(false)
            }


          } else {
            setRepeatPasswordError(`Passwords don't match`)
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
                <ThemedText type="subtitle">Sign up</ThemedText>
                
            </ThemedView>
           {confirmModal ? <ThemedView style={styles.confirmSignUp}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title" >Almost there!</ThemedText>
                  
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                  <ThemedText type="subtitle">Confirm your account</ThemedText>
                  
                </ThemedView>
                <ThemedView>
                  <ThemedText>Check Email</ThemedText>
                  <ThemedText numberOfLines={2}>{`A code has been sent to ${email}`}</ThemedText>
                </ThemedView>
                <ThemedView>
                  <TextInput style={styles.inputContainer} value={codeConfirm} placeholder='Enter code' onChangeText={(e)=> setCodeConfirm(e)}/>
                </ThemedView>
                <ThemedView style={styles.loginButton}>
                  {codeConfirm.length > 0 ? 
                  <TouchableOpacity onPress={()=> handleConfirm()}>
                    <ThemedText style={styles.loginText}>Confirm</ThemedText>
                  </TouchableOpacity>:
                  <TouchableOpacity>
                    <ThemedText style={styles.loginText}>Confirm</ThemedText>
                  </TouchableOpacity>
                  }
                </ThemedView>
                {confirmError ? <ThemedText style={styles.errorText}>{confirmError}</ThemedText>: null}
            </ThemedView>: null}
            {loadingSignUp ? 
            <ThemedView style={styles.loadingSignUpModal}>
              <ThemedText>Signing Up...</ThemedText>
              <ActivityIndicator />
            </ThemedView>: null}
            <ThemedView style={styles.loginContainer}>
                <TextInput placeholder='Email' style={styles.inputContainer} value={email} onChangeText={(e)=> setEmail(e)}/>
                  {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText>: null}
                <TextInput placeholder='Password' secureTextEntry={true} style={styles.inputContainer} value={password} onChangeText={(e)=> setPassword(e)}/>
                  {passwordError ? <ThemedText style={styles.errorText}>{passwordError}</ThemedText>: null}
                <TextInput placeholder='Repeat Password' secureTextEntry={true} style={styles.inputContainer} value={repeatPassword} onChangeText={(e)=> setRepeatPassword(e)}/>
                  {repeatPasswordError ? <ThemedText style={styles.errorText}>{repeatPasswordError}</ThemedText>: null}
                  {signUpError ? <ThemedText style={styles.errorText}>{signUpError}</ThemedText>: null}
                <ThemedView style={styles.forgotPasswordBody}>
                  <Link href={{pathname: "/confirmAccount", params: {screen: 'signUp'}}} asChild>
                    <TouchableOpacity>
                        <ThemedText type='default'>Didn't confirm email? Resend code.</ThemedText>
                    </TouchableOpacity>
                  </Link>
                    
                </ThemedView>
                {loadingSignUp ? 
                <TouchableOpacity style={styles.loginButton}>
                    <ThemedText style={styles.loginText}>Sign up</ThemedText>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.loginButton} onPress={()=> handleSignup()}>
                    <ThemedText style={styles.loginText}>Sign up</ThemedText>
                </TouchableOpacity>}
            </ThemedView>
            <GoogleLoginButton />
            
            <ThemedView style={styles.signupContainer}>
                <ThemedText type='default'>Already have an account?</ThemedText>
                {!loadingSignUp ? 
                <Link href={'/'} asChild>
                    <TouchableOpacity>
                        <ThemedText style={styles.signupText}>Log in</ThemedText>
                    </TouchableOpacity>
                </Link>:
                <TouchableOpacity>
                    <ThemedText style={styles.signupText}>Log in</ThemedText>
                </TouchableOpacity>
                }
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
    padding:5
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
  loadingSignUpModal: {
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
  },
  confirmSignUp: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    zIndex: 40,
    padding: 10
  }
});
