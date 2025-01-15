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


    const [pageSection, setPageSection] = useState<number>(2)

    const [pageType, setPageType] = useState<string>('post')

    const [personType, setPersonType] = useState<boolean>(true)
    const [companyName, setCompanyName] = useState<string>('')
    const [personName, setPersonName] = useState<string>('')
    const [companyNameError, setCompanyNameError] = useState<boolean>(false)
    const [personNameError, setPersonNameError] = useState<boolean>(false)
    const [companyEmail, setCompanyEmail] = useState<string>('')
    const [companyEmailError, setCompanyEmailError] = useState<boolean>(false)


    


    type categoryItemSelected = string

    const [selectedCategories, setSelectedCategories] = useState<categoryItemSelected []>([])
    const [categoriesError, setCategoriesError] = useState<boolean>(false)

    const [eventName, setEventName] = useState<string>('')
    const [eventNameError, setEventNameError] = useState<boolean>(false)
    const [eventDescription, setEventDescription] = useState<string>('')
    const [eventDescriptionError, setEventDescriptionError] = useState<boolean>(false)
    const [address, setAddress] = useState<string>('')
    const [eventAddressError, setEventAddressError] = useState<boolean>(false)
    const [coordinates, setCoordinates] = useState<{latitude: number, longitude: number} | null>(null)



    const [ageRestriction, setAgeRestriction] = useState<string []>([])


    const [dateTimePrice, setDateTimePrice] = useState<string []>([])
    const [dateTimePriceError, setDateTimePriceError] = useState<boolean>(false)

    const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('a')
    const [selectedImage, setSelectedImage] = useState<string>('a')
    const [mainImage, setMainImage] = useState<string>('')
    const [mainImageError, setMainImageError] = useState<boolean>(false)
    const [image2, setImage2] = useState<string>('')
    const [image3, setImage3] = useState<string>('')
    const [image4, setImage4] = useState<string>('')
    const [mainImageAspectRatio, setMainImageAspectRatio] = useState<string>('')
    const [image2AspectRatio, setImage2AspectRatio] = useState<string>('')
    const [image3AspectRatio, setImage3AspectRatio] = useState<string>('')
    const [image4AspectRatio, setImage4AspectRatio] = useState<string>('')
    const [imageRatioModal, setImageRatioModal] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string>('')


    const handleNextDisplay = () => {

        if(pageSection === 0) {
            if(personType) {
                if(personName.length > 1) {
                    setPersonNameError(false)
                    setPageSection(pageSection + 1)
                } else {
                    setPersonNameError(true)
                }
            } else {
                if(companyName.length > 1) {
                    setCompanyNameError(false)

                    if(companyEmail.length > 1) {
                        setCompanyEmailError(false)
                        setPageSection(pageSection + 1)
                    } else {
                        setCompanyEmailError(true)
                    }

                } else {
                    setCompanyNameError(true)
                }
            }
        }
        

        if(pageSection === 1) {
            if(selectedCategories.length > 0) {
                setCategoriesError(false)
                setPageSection(pageSection + 1)

            } else {
                setCategoriesError(true)
            }
        }

        if(pageSection === 2) {
            if (eventName.length > 1) {
                setEventNameError(false)

                if(eventDescription.length > 1) {
                    setEventDescriptionError(false)

                    if(address.length > 1) {
                        setEventAddressError(false)
                        setPageSection(pageSection + 1)
                    } else {
                        setEventAddressError(true)
                    }

                } else {
                    setEventDescriptionError(true)
                }
            } else {
                setEventNameError(true)
            }
            
        }

        if(pageSection === 3) {
            setPageSection(pageSection + 1)
        }

        if(pageSection === 4) {
            if(dateTimePrice.length > 0) {

                setDateTimePriceError(false)
                setPageSection(pageSection + 1)

            } else {
                setDateTimePriceError(true)
            }
            
        }

        if(pageSection === 5) {
            if(mainImage) {

            }
            setPageSection(pageSection + 1)
        }

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

            if(selectedCategories.length < 4) {

                setSelectedCategories([...selectedCategories, category])

            }
            
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

        setImageRatioModal(false)

        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images', 'videos'],
              allowsEditing: true,
              aspect: item === 'a' ? [16, 9]: item === 'b' ? [1, 1]: [3,4],
              quality: 1,
            });
        
            console.log(result);
        
            if (!result.canceled) {
                if(imageName === 'mainImage') {
                    setMainImageAspectRatio(item)
                    setMainImage(result.assets[0].uri);
                }
                if(imageName === 'Image2') {
                    setImage2AspectRatio(item)
                    setImage2(result.assets[0].uri);
                }
                if(imageName === 'Image3') {
                    setImage3AspectRatio(item)
                    setImage3(result.assets[0].uri);
                }
                if(imageName === 'Image4') {
                    setImage4AspectRatio(item)
                    setImage4(result.assets[0].uri);
                }
              
            }
          };

          pickImage()
    }


    const handleRemoveImage = (item: string) => {
        if(item === 'mainImage') {
            setMainImage('')
        }
    }

    const handleOpenImageRatioModal = (name: string) => {
        setImageName(name)
        setImageRatioModal(true)
    }
    
    const currentDisplay = () => {
        if(pageSection === 0) {
            return (
                <PostEventPerson personType={personType} setPersonType={setPersonType} companyName={companyName} setCompanyName={setCompanyName}
                companyEmail={companyEmail} setCompanyEmail={setCompanyEmail} companyNameError={companyNameError} companyEmailError={companyEmailError}
                personName={personName} setPersonName={setPersonName} personNameError={personNameError} />
            )
        }
        if(pageSection === 1) {
            return(
                <PostEventCategories  selectedCategories={selectedCategories} handleAddRemoveCategory={handleAddRemoveCategory} eventCategories={eventsCategories} categoriesError={categoriesError}/>
            )
        }
        if(pageSection === 2) {
            return (
                <PostLocationNameDetails eventName={eventName}  setEventName={setEventName} eventDescription={eventDescription} setEventDescription={setEventDescription} 
                eventNameError={eventNameError} eventDescriptionError={eventDescriptionError} address={address} setAddress={setAddress} coordinates={coordinates} 
                setCoordinates={setCoordinates} eventAddressError={eventAddressError}/>
            )
        }
        if(pageSection === 3) {
            return(
                <PostAgeRestriction ageRestriction={ageRestriction} handleAddRemoveAgeGroup={handleAddRemoveAgeGroup}/>
            )
        }
        if(pageSection === 4) {
            return(
                <PostDateTimeDuration ageRestriction={ageRestriction} dateTimePrice={dateTimePrice} setDateTimePrice={setDateTimePrice}/>
            )
        }
        if(pageSection === 5) {
            return(
                <PostPhotoUpload mainImage={mainImage} image2={image2} image3={image3} image4={image4} handlePickImage={handlePickImage} imageRatioModal={imageRatioModal}
                setImageRatioModal={setImageRatioModal} handleOpenImageRatioModal={handleOpenImageRatioModal} mainImageAspectRatio={mainImageAspectRatio}
                image2AspectRatio={image2AspectRatio} image3AspectRatio={image3AspectRatio} image4AspectRatio={image4AspectRatio} setMainImage={setMainImage}
                setImage2={setImage2} setImage3={setImage3} setImage4={setImage4} handleRemoveImage={handleRemoveImage} mainImageError={mainImageError}
                />
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