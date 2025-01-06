import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView } from 'react-native';

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
import PostEventPerson from '@/components/appComponents/PostEventPerson';
import PostEventCategories from '@/components/appComponents/PostEventCategories';
import PostLocationNameDetails from '@/components/appComponents/PostLocationNameDetails';
import PostAgeRestriction from '@/components/appComponents/PostAgeRestriction';
import PostDateTimeDuration from '@/components/appComponents/PostDateTimeDuration';
import PostPhotoUpload from '@/components/appComponents/PostPhotoUpload';
import * as ImagePicker from 'expo-image-picker';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


//Events Categories List

const eventsCategories = [
    {
    title: 'Music',
    name:'music'},
    {
    
    title: 'Night party',
    name:'night'},
    {
    
    title: 'Performing & visuals',
    name: 'visuals'},
    {
    
    title: 'Photography & film',
    name:'photography'},
    {
    
    title: 'Software & tech',
    name: 'software'},
    {
    
    title: 'Health',
    name:'health'},
    {
     
    title: 'Food & drink',
    name:'food'},
    {
    
    title: 'Business',
    name:'business'},
    {
    
    title: 'Sports & fitness',
    name:'sports'},
    {
    
    title: 'Travel & tourism',
    name:'travel'},
    {
     
    title: 'Agriculture',
    name:'agriculture'},
    {
    
    title: 'Environment',
    name:'environment'},
    {
     
    title: 'Charity & fundraising',
    name:'charity'},
    {
     
    title: 'Religion & spirituality',
    name:'religion'},
    {
     
    title: 'Outdoor activities',
    name:'outdoor'},
    {
     
    title: 'Art',
    name: 'art'},
    {
    
    title: 'Games & esports',
    name: 'game'},
    {
     
    title: 'Engineering',
    name:'engineering'},
]




export default function postEvent() {


    const [pageSection, setPageSection] = useState<number>(5)

    const [pageType, setPageType] = useState<string>('post')

    const [personType, setPersonType] = useState<boolean>(true)
    const [companyName, setCompanyName] = useState<string>('')
    const [companyNameError, setCompanyNameError] = useState<boolean>(false)
    const [companyEmail, setCompanyEmail] = useState<string>('')
    const [companyEmailError, setCompanyEmailError] = useState<boolean>(false)


    


    type categoryItemSelected = string

    const [selectedCategories, setSelectedCategories] = useState<categoryItemSelected []>([])


    const [eventName, setEventName] = useState<string>('')
    const [eventNameError, setEventNameError] = useState<boolean>(false)
    const [eventDescription, setEventDescription] = useState<string>('')
    const [eventDescriptionError, setEventDescriptionError] = useState<boolean>(false)
    const [address, setAddress] = useState<string>('')
    const [coordinates, setCoordinates] = useState<{latitude: number, longitude: number} | null>(null)



    const [ageRestriction, setAgeRestriction] = useState<string []>([])


    const [eventDate, setEventDate] = useState<Date>(new Date)

    const [mainImage, setMainImage] = useState<string>('')
    const [image2, setImage2] = useState<string>('')
    const [image3, setImage3] = useState<string>('')
    const [image4, setImage4] = useState<string>('')
    const [aspectRatio, setAspectRatio] = useState<number []>([4,3])


    const handleNextDisplay = () => {

        setPageSection(pageSection + 1)
    }

    const handlePrevDisplay = () =>  {
        setPageSection(pageSection - 1)
    }

    const handleAddRemoveCategory = (category: string) => {

        const itemIndex = selectedCategories.indexOf(category)

        if(itemIndex > -1) {

            selectedCategories.splice(itemIndex, 1)

            setSelectedCategories([...selectedCategories])

        } else {

            setSelectedCategories([...selectedCategories, category])
        }

    }


    const handleAddRemoveAgeGroup = (item: string) => {


        const itemIndex = ageRestriction.indexOf(item)

        if(itemIndex > -1) {
            ageRestriction.splice(itemIndex, 1)

            setAgeRestriction([...ageRestriction])
        } else {
            setAgeRestriction([...ageRestriction, item])
        }

    }

    const handlePickImage = (item: string) => {
        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images', 'videos'],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
            console.log(result);
        
            if (!result.canceled) {
              setMainImage(result.assets[0].uri);
            }
          };

          pickImage()
    }
    
    const currentDisplay = () => {
        if(pageSection === 0) {
            return (
                <PostEventPerson personType={personType} setPersonType={setPersonType} companyName={companyName} setCompanyName={setCompanyName}
            companyEmail={companyEmail} setCompanyEmail={setCompanyEmail} companyNameError={companyNameError} companyEmailError={companyEmailError} />
            )
        }
        if(pageSection === 1) {
            return(
                <PostEventCategories  selectedCategories={selectedCategories} handleAddRemoveCategory={handleAddRemoveCategory} eventCategories={eventsCategories}/>
            )
        }
        if(pageSection === 2) {
            return (
                <PostLocationNameDetails eventName={eventName}  setEventName={setEventName} eventDescription={eventDescription} setEventDescription={setEventDescription} 
                eventNameError={eventNameError} eventDescriptionError={eventDescriptionError} address={address} setAddress={setAddress} coordinates={coordinates} setCoordinates={setCoordinates}/>
            )
        }
        if(pageSection === 3) {
            return(
                <PostAgeRestriction ageRestriction={ageRestriction} handleAddRemoveAgeGroup={handleAddRemoveAgeGroup}/>
            )
        }
        if(pageSection === 4) {
            return(
                <PostDateTimeDuration ageRestriction={ageRestriction} eventDate={eventDate} setEventDate={setEventDate}/>
            )
        }
        if(pageSection === 5) {
            return(
                <PostPhotoUpload mainImage={mainImage} image2={image2} image3={image3} image4={image4} handlePickImage={handlePickImage}/>
            )
        }
    }

   

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            {currentDisplay()}
            <ThemedView style={styles.pageButtons}>
                {pageSection === 0 ? <ThemedText></ThemedText>: 
                <Pressable onPress={()=> handlePrevDisplay()}>
                    <ThemedText>Prev</ThemedText>
                </Pressable>}
                <Pressable onPress={()=> handleNextDisplay()}>
                    <ThemedText>Next</ThemedText>
                </Pressable>
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
    pageButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: windowWidth,
        borderWidth: 0.5,
        borderColor: 'gray'
    }
  
  
  
  
});