import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import GoogleLoginButton from '../components/appComponents/GoogleLoginButton'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import {signIn, getCurrentUser, confirmSignUp, resendSignUpCode} from '@aws-amplify/auth'
import {useUser} from '../context/UserContext'
import { t } from 'i18next';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function confirmAccount() {

    const {userDetails, setUserDetails} = useUser()


    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [confirmEmail, setConfirmEmail] = useState<string>('')
    const [confirmEmailError, setConfirmEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [loginError, setLoginError] = useState<string>('')
    const [loadingLogIn, setLoadingLogin] = useState<boolean>(false)
    const [codeConfirm, setCodeConfirm] = useState<string>('')
    const [confirmError, setConfirmError] = useState<string>('')
    const [loadingSendCode, setLoadingSendCode] = useState<boolean>(false)
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [resendCodeError, setResendCodeError] = useState<string>('')
    const [resendCodeSuccess, setResendCodeSuccess] = useState<string>('')
    


    const router = useRouter()
    
    
    const checkCurrentUser = async () => {



      try{

        const { username, userId, signInDetails } = await getCurrentUser();

        setUserDetails({username: signInDetails?.loginId, userId: userId})

      console.log(userId, signInDetails?.loginId)

      if(userId) {
        router.push('/locationScreen')
      }

      } catch (e) {
        console.log(e)
      }
      


    }


    

    useEffect(()=> {
      
      if(userDetails) {

        router.push('/locationScreen')

      }

    },[userDetails])


    const handleResendCode = async () => {

        if(email.length > 0) {

            setEmailError('')

            setLoadingSendCode(true)

            try {

                setResendCodeError('')
                await resendSignUpCode({
                    username: email
                }).then(()=> { setResendCodeSuccess(`Code sent to ${email}. Enter code below to continue.`)})

            } catch(e) {

                setResendCodeError(e?.message)
                setLoadingSendCode(false)

            }


        } else {
            setEmailError('Email required')
        }
    }



    const handleConfirm = async () => {
    
    
        if(confirmEmail.length > 0) {

            setConfirmEmailError('')

            

            if(codeConfirm.length > 0 ) {

                setConfirmModal(true)
    
                try {
        
                  const { isSignUpComplete, nextStep } = await confirmSignUp({
                    username: email,
                    confirmationCode: codeConfirm
                  })
          
                  
          
                  if(isSignUpComplete) {
    
                    setConfirmModal(false)
          
                    setConfirmError('')
          
                    router.push('/')
          
                    
                  }
          
          
                } catch(e) {
          
                  console.log(e?.message)
                  setConfirmError(e?.message)
                  setConfirmModal(false)
          
                }
        
              }
        

        } else {
            setConfirmEmailError('Email required')
        }

          
          
    
          
    
        }




  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" >Almost there!</ThemedText>
               
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Confirm your account</ThemedText>
                
            </ThemedView>
            {confirmModal ? 
              <ThemedView style={styles.loadingLoginModal}>
                <ThemedText>{t('loading')}</ThemedText>
                <ActivityIndicator />
              </ThemedView>: null}
              {loadingSendCode ? 
              <ThemedView style={styles.loadingLoginModal}>
                <ThemedText>Sending code</ThemedText>
                <ActivityIndicator />
              </ThemedView>: null}
            <ThemedView style={styles.loginContainer}>
                <TextInput placeholder='Email' style={styles.inputContainer} value={email} onChangeText={(e)=> setEmail(e)}/>
                  {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText>: null}

                  {loginError ? <ThemedText style={styles.errorText}>{loginError}</ThemedText>: null}
                
                <TouchableOpacity style={styles.loginButton} onPress={()=> handleResendCode()}>
                    <ThemedText style={styles.loginText}>Resend code</ThemedText>
                </TouchableOpacity>
                {resendCodeSuccess ? <ThemedText style={styles.confirmText}>{`Code sent to ${email}. Enter code below to continue.`}</ThemedText>: null}
                {resendCodeError ? <ThemedText style={styles.errorText}>{resendCodeError}</ThemedText>: null}
            </ThemedView>
            <ThemedView style={styles.confirmCodeContainer}>
                <ThemedText type="subtitle">Already have a code?</ThemedText>
                
            </ThemedView>
            <ThemedView style={styles.codeInputContainer}>
                <TextInput placeholder={t('email')} style={styles.inputContainer} value={confirmEmail} onChangeText={(e)=> setConfirmEmail(e)}/>
                <TextInput placeholder='Enter code' style={styles.inputContainer} value={codeConfirm} onChangeText={(e)=> setCodeConfirm(e)}/>
                <TouchableOpacity style={styles.loginButton} onPress={()=> handleConfirm()}>
                    <ThemedText style={styles.loginText}>Confirm Account</ThemedText>
                </TouchableOpacity>
                {confirmError ? <ThemedText style={styles.errorText}>{confirmError}</ThemedText>: null}
            </ThemedView>
            <ThemedView style={styles.signupContainer}>
                    <TouchableOpacity style={styles.gotToLoginButton} onPress={()=> router.back()}>
                        <ThemedText >{t('go.back')}</ThemedText>
                    </TouchableOpacity>
                   
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
  },
  confirmCodeContainer: {
    marginTop: 40
  },
  codeInputContainer: {
    marginTop: 10,
    width: '95%'
  },
  gotToLoginButton: {
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  confirmText: {
    margin: 5
  }
});