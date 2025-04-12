import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link, useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import PostEventPerson from '@/components/appComponents/PostEventPerson';
import PostEventCategories from '@/components/appComponents/PostEventCategories';
import PostLocationNameDetails from '@/components/appComponents/PostLocationNameDetails';
import PostAgeRestriction from '@/components/appComponents/PostAgeRestriction';
import PostDateTimeDuration from '@/components/appComponents/PostDateTimeDuration';
import PostPhotoUpload from '@/components/appComponents/PostPhotoUpload';
import * as ImagePicker from 'expo-image-picker';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {useUser} from '../../../context/UserContext'
import PostEventPreview from '@/components/appComponents/PostEventPreview';
import {useLanguage} from '../../../context/LanguageContext'

const client = generateClient<Schema>();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function postEvent() {


    const {t} = useLanguage()
    const {screenName, id} = useLocalSearchParams()
    const {userDetails} = useUser()
    const router = useRouter()

    const [newScreenName, setNewScreenName] = useState<string | string []>(screenName)

    const [loadingGetEvent, setLoadingGetEvent] = useState<boolean>(false)
    const [loadingEventError, setLoadingEventError] = useState<string>('')
    const [email, setEmail] = useState<string>(screenName === 'post' ? userDetails?.username : '')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [sponsored, setSponsord] = useState<boolean>(false)

    const [pageSection, setPageSection] = useState<number>(0)

    const [pageType, setPageType] = useState<string | string []>(screenName)

    const [personType, setPersonType] = useState<boolean>(true)
    const [companyName, setCompanyName] = useState<string>('')
    const [personName, setPersonName] = useState<string>('')
    const [companyNameError, setCompanyNameError] = useState<boolean>(false)
    const [personNameError, setPersonNameError] = useState<boolean>(false)
    const [companyEmail, setCompanyEmail] = useState<string>('')
    const [companyEmailError, setCompanyEmailError] = useState<boolean>(false)


    

    const [selectedCategories, setSelectedCategories] = useState< string []>([])
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
    const [mainImagePath, setMainImagePath] = useState<string>('')
    const [mainImageBlob, setMainImageBlob] = useState()
    const [mainImageError, setMainImageError] = useState<boolean>(false)
    const [image2, setImage2] = useState<string>('')
    const [image2Path, setImage2Path] = useState<string>('')
    const [image2Bolb, setImage2Blob] = useState()
    const [image3, setImage3] = useState<string>('')
    const [image3Path, setImage3Path] = useState<string>('')
    const [image3Bolb, setImage3Blob] = useState()
    const [image4, setImage4] = useState<string>('')
    const [image4Path, setImage4Path] = useState<string>('')
    const [image4Bolb, setImage4Blob] = useState()
    const [mainImageAspectRatio, setMainImageAspectRatio] = useState<string>('')
    const [image2AspectRatio, setImage2AspectRatio] = useState<string>('')
    const [image3AspectRatio, setImage3AspectRatio] = useState<string>('')
    const [image4AspectRatio, setImage4AspectRatio] = useState<string>('')
    const [imageRatioModal, setImageRatioModal] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string>('')

    const [uploadError, setUploadError] = useState<string>('')
    const [uploadPercent, setUploadPercent] = useState<number>(0)
    const [uploadingDetail, setUploadingDetail] = useState<string>('')
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)


       //Events Categories List

       const eventsCategories = [
        {
        title: t('education'),
        name:'education'},
        {
        title: t('music'),
        name:'music'},
        {
       
        title: t('night.party'),
        name:'night'},
        {
        
        title: t('entertainment'),
        name: 'entertainment'},
        {
        
        title: t('markets'),
        name: 'markets'},
        {
        
        title: t('performance.visuals'),
        name: 'visuals'},
        {
        
        title: t('photography'),
        name:'photography'},
        {
        title: t('software.tech'),
        name: 'software'},
        {
        title: t('information.technology'),
        name: 'informationtechnology'},
        {
        title: t('health'),
        name:'health'},
        {
        title: t('hospitals.and.clinics'),
        name:'hospital'},
        {
        title: t('pharmacy'),
        name:'pharmacy'},
        {
         
        title: t('food.drink'),
        name:'food'},
        {
        
        title: t('business'),
        name:'business'},
        {
        
        title: t('sports.fitness'),
        name:'sports'},
        {
        
        title: t('travel.tourism'),
        name:'travel'},
        {
         
        title: t('agriculture'),
        name:'agriculture'},
        {
         
        title: t('environment'),
        name:'environment'},
        {
         
        title: t('charity.fundraising'),
        name:'charity'},
        {
         
        title: t('religion.spirituality'),
        name:'religion'},
        {
         
        title: t('outdoor.activities'),
        name:'outdoor'},
        {
         
        title: t('art'),
        name: 'art'},
        {
        
        title: t('games.esports'),
        name: 'game'},
        {
         
        title: t('engineering'),
        name:'engineering'},
    ]



    useEffect(()=> {
        if(screenName === 'manage') {

            handleGetEvent()

        }
    },[])


    const handleGetEvent = async () => {

        try {

            setLoadingGetEvent(true)

            const { data, errors } = await client.models.Event.get({
                id: id,
              });

              setPersonType(data?.personType)
              setEmail(data?.email)
              setSponsord(data?.sponsored)
              setEventName(data?.eventName)
              setEventDescription(data?.eventDescription)
              setCompanyEmail(data?.email)
              setPersonName(data?.personName)
              setMainImageAspectRatio(data?.eventMainImage?.aspectRatio)
              setImage2AspectRatio(data?.eventImage2?.aspectRatio)
              setImage3AspectRatio(data?.eventImage3?.aspectRatio)
              setImage4AspectRatio(data?.eventImage4?.aspectRatio)
              setAgeRestriction(data?.ageRestriction)
              setSelectedCategories(data?.categories)
              setAddress(data?.eventAddress)
              setCoordinates({latitude: Number(data?.location?.coordinates[1]), longitude: Number(data?.location?.coordinates[0])})
              setMainImagePath(data?.eventMainImage?.url)
              setImage2Path(data?.eventImage2?.url)
              setImage3Path(data?.eventImage3?.url)
              setImage4Path(data?.eventImage4?.url)

              const linkToStorageFile = await getUrl({
                path: data?.eventMainImage?.url,
                options: {
                  useAccelerateEndpoint: true
                }
            })
        
            setMainImage(linkToStorageFile.url.toString())

            
            if(data?.eventImage2?.url?.length > 1) {

                const linkToStorageFile = await getUrl({
                    path: data?.eventImage2?.url,
                    options: {
                      useAccelerateEndpoint: true
                    }
                })

                console.log('image2', data?.eventImage2?.url?.length)

                setImage2(linkToStorageFile.url.toString())


            }


            if(data?.eventImage3?.url?.length > 1) {

                const linkToStorageFile = await getUrl({
                    path: data?.eventImage3?.url,
                    options: {
                      useAccelerateEndpoint: true
                    }
                })

                

                setImage3(linkToStorageFile.url.toString())


            }




            if(data?.eventImage4?.url?.length > 1) {

                const linkToStorageFile = await getUrl({
                    path: data?.eventImage4?.url,
                    options: {
                      useAccelerateEndpoint: true
                    }
                })

               

                setImage4(linkToStorageFile.url.toString())


            }

            const newDateTimePriceList = data?.dateTimePriceList.map((newItem)=> {
                return JSON.stringify(newItem)
            })
              
            setDateTimePrice(newDateTimePriceList)  
              
              
              setLoadingGetEvent(false)
              

        } catch (e) {

            setLoadingEventError(e?.message)

        }
        

    }








    const handleNextDisplay = () => {

        if(pageSection === 0) {

            if(email.length > 0) {


                setEmailError(false)

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

            } else {
                setEmailError(true)
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

    const eventData = {

                eventName: eventName,
                eventDescription: eventDescription,
                email: email,
                sponsored: sponsored,
                personType: personType,
                personName: personName,
                eventMainImage: {
                    aspectRatio: mainImageAspectRatio,
                    url: mainImage
                },
                eventImage2: {
                    aspectRatio: image2AspectRatio,
                    url: image2
                },
                eventImage3: {
                    aspectRatio: image3AspectRatio,
                    url: image3
                },
                eventImage4: {
                    aspectRatio: image4AspectRatio,
                    url: image4
                },
                dateTimePriceList: dateTimePrice.map((item)=> {
                    return JSON.parse(item)
                }),
                ageRestriction: ageRestriction,
                categories: selectedCategories,
                eventAddress: address,
                location:{
                    type: "Point",
                    coordinates: [Number(coordinates?.longitude), Number(coordinates?.latitude)]
                }
                
              }



    const handleUpdateEvent = async () => {


        try {

            setUploadingDetail(t('updating.event.details'))
            setUploadPercent(10)
            setUploadLoading(true)


                await client.models.Event.update({
                    id: id,
                    eventName: eventName,
                    eventDescription: eventDescription,
                    email: email,
                    personType: personType,
                    personName: personName,
                    eventMainImage: {
                        aspectRatio: mainImageAspectRatio,
                        url: mainImagePath
                    },
                    eventImage2: {
                        aspectRatio: image2AspectRatio,
                        url: image2Path
                    },
                    eventImage3: {
                        aspectRatio: image3AspectRatio,
                        url: image3Path
                    },
                    eventImage4: {
                        aspectRatio: image4AspectRatio,
                        url: image4Path
                    },
                    dateTimePriceList: dateTimePrice.map((item)=> {

                        return JSON.parse(item)
                    }),
                    ageRestriction: ageRestriction,
                    categories: selectedCategories,
                    eventAddress: address,
                    location:{
                        type: "Point",
                        coordinates: [Number(coordinates?.longitude), Number(coordinates?.latitude)]
                    }
                })


                if(mainImage && mainImageBlob) {

                    setUploadingDetail(t('updating.images'))

                    const result = await uploadData({
                        path: `picture-submissions/${mainImage}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: mainImageBlob,
                    }).result;
            
                    /** 

                    const linkToStorageFile = await getUrl({
                        path: result.path
                    })

                    */

                    await client.models.Event.update({

                        id: id,
                        eventMainImage: {
                            aspectRatio: mainImageAspectRatio,
                            url: result.path
                        }
                    });

                    



                    setUploadPercent(50)

                }


                if(image2 && image2Bolb) {

                    const result = await uploadData({
                        path: `picture-submissions/${image2}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: image2Bolb,
                    }).result;
            
                    
                    

                    await client.models.Event.update({
                        id: id,
                        eventImage2: {
                            aspectRatio: image2AspectRatio,
                            url: result.path
                        }
                    });

                    setUploadPercent(60)
                }

                if(image3 && image3Bolb) {

                    const result = await uploadData({
                        path: `picture-submissions/${image3}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: image3Bolb,
                    }).result;
            
                    

                    await client.models.Event.update({
                        id: id,
                        eventImage3: {
                            aspectRatio: image3AspectRatio,
                            url: result.path
                        }
                    });

                    setUploadPercent(70)
                }

                if(image4 && image4Bolb) {
                    const result = await uploadData({
                        path: `picture-submissions/${image4}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: image4Bolb,
                    }).result;
            
                    

                    await client.models.Event.update({
                        id: id,
                        eventMainImage: {
                            aspectRatio: image4AspectRatio,
                            url: result.path
                        }
                    });

                    setUploadPercent(80)
                }

                setUploadPercent(100)
                setUploadingDetail(t('update.successful.closing'))
                setTimeout(()=> {
                    setUploadLoading(false)

                    if(screenName === 'post') {

                        router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'main'}})

                    } else {

                        router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'admin'}})

                    }

                    
                }, 3000)


        } catch (e) {
            
            setUploadPercent(0)
            setUploadingDetail(t('upload.error'))
            setUploadError(error.message)
            console.log(error.message)

            setTimeout(()=> {
                setUploadLoading(false)
                
            }, 3000)
        }

    }


    const handlePostEvent = async () => {

        /** 

          const result = await uploadData({
            path: `picture-submissions/${mainImage}`,
            // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
            data: mainImageBlob,
          }).result;

          const linkToStorageFile = await getUrl({
              path: result.path
          })
          console.log('Succeeded: ', linkToStorageFile.url); */

        try {


           

            setUploadingDetail(t('uploading.event.details'))
            setUploadPercent(10)
            setUploadLoading(true)

            const uploadedDocument = await client.models.Event.create({
                eventName: eventName,
                eventDescription: eventDescription,
                email: email,
                personType: personType,
                personName: personName,
                eventMainImage: {
                    aspectRatio: mainImageAspectRatio,
                    url: ''
                },
                eventImage2: {
                    aspectRatio: image2AspectRatio,
                    url: ''
                },
                eventImage3: {
                    aspectRatio: image3AspectRatio,
                    url: ''
                },
                eventImage4: {
                    aspectRatio: image4AspectRatio,
                    url: ''
                },
                dateTimePriceList: dateTimePrice.map((item)=> {

                    return JSON.parse(item)
                }),
                ageRestriction: ageRestriction,
                categories: selectedCategories,
                eventAddress: address,
                location:{
                    type: "Point",
                    coordinates: [Number(coordinates?.longitude), Number(coordinates?.latitude)]
                }
            })


            setUploadPercent(30)

           

              if(mainImage && mainImageBlob) {

                setUploadingDetail(t('uploading.images'))

                const result = await uploadData({
                    path: `picture-submissions/${mainImage}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: mainImageBlob,
                  }).result;
        
                  /** 

                  const linkToStorageFile = await getUrl({
                      path: result.path
                  })

                  */

                  await client.models.Event.update({

                    id: uploadedDocument?.data.id,
                    eventMainImage: {
                        aspectRatio: mainImageAspectRatio,
                        url: result.path
                    }
                  });

                 

    

                  setUploadPercent(50)

              }

              if(image2 && image2Bolb) {

                const result = await uploadData({
                    path: `picture-submissions/${image2}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: image2Bolb,
                  }).result;
        
                 
                  

                  await client.models.Event.update({
                    id: uploadedDocument?.data.id,
                    eventImage2: {
                        aspectRatio: image2AspectRatio,
                        url: result.path
                    }
                  });

                  setUploadPercent(60)
              }

              if(image3 && image3Bolb) {

                const result = await uploadData({
                    path: `picture-submissions/${image3}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: image3Bolb,
                  }).result;
        
                  

                  await client.models.Event.update({
                    id: uploadedDocument?.data.id,
                    eventImage3: {
                        aspectRatio: image3AspectRatio,
                        url: result.path
                    }
                  });

                  setUploadPercent(70)
              }

              if(image4 && image4Bolb) {
                const result = await uploadData({
                    path: `picture-submissions/${image4}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: image4Bolb,
                  }).result;
        
                  

                  await client.models.Event.update({
                    id: uploadedDocument?.data.id,
                    eventMainImage: {
                        aspectRatio: image4AspectRatio,
                        url: result.path
                    }
                  });

                  setUploadPercent(80)
              }

              setUploadPercent(100)

              setUploadingDetail(t('upload.successful'))
              
              setTimeout(()=> {

                setUploadLoading(false)

                if(screenName === 'post') {

                    router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'main'}})

                } else {

                    router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'admin'}})

                }
              }, 3000)
            
          } catch (error) {
            
            setUploadPercent(0)
            setUploadingDetail(t('upload.error'))
            setUploadError(error.message)

            setTimeout(()=> {
                setUploadLoading(false)
                
            }, 3000)
            
          }

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
        
            
        
            if (!result.canceled) {
                if(imageName === 'mainImage') {
                    setMainImageAspectRatio(item)
                    setMainImage(result.assets[0].uri);
                    
                        const response = await fetch(result.assets[0].uri);
                        const blob = await response.blob();
                
                        setMainImageBlob(blob)
                    
            
                 
                }
                if(imageName === 'Image2') {
                    setImage2AspectRatio(item)
                    setImage2(result.assets[0].uri);

                    const response = await fetch(result.assets[0].uri);
                    const blob = await response.blob();

                    setImage2Blob(blob)

                }
                if(imageName === 'Image3') {
                    setImage3AspectRatio(item)
                    setImage3(result.assets[0].uri);

                    const response = await fetch(result.assets[0].uri);
                    const blob = await response.blob();

                    setImage3Blob(blob)
                }
                if(imageName === 'Image4') {
                    setImage4AspectRatio(item)
                    setImage4(result.assets[0].uri);

                    const response = await fetch(result.assets[0].uri);
                    const blob = await response.blob();

                    setImage4Blob(blob)
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
                personName={personName} setPersonName={setPersonName} personNameError={personNameError} email={email} setEmail={setEmail} emailError={emailError} 
                screenName={screenName}/>
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
        if(pageSection === 6) {
            return(
                <PostEventPreview newScreenName={newScreenName} eventData={eventData}/>
            )
        }
    }

   

  return (
    <SafeAreaView style={styles.container}>
        {loadingGetEvent ? 
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            <ActivityIndicator/>
        </ThemedView>
        :<ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType} />
            {currentDisplay()}
            {uploadLoading? <ThemedView style={styles.createEventModal}>
                <ThemedText>{t('uploading')}</ThemedText>
                <ThemedText>{uploadingDetail}</ThemedText>
                <ThemedText>{uploadPercent}</ThemedText>
                <ThemedText style={styles.errorText}>{uploadError}</ThemedText>
                <ActivityIndicator />
            </ThemedView>: null}
            <ThemedView style={styles.pageButtons}>
                {pageSection === 0 ? <ThemedText></ThemedText>: 
                <Pressable onPress={()=> handlePrevDisplay()}>
                    <ThemedText>{t('previous')}</ThemedText>
                </Pressable>}
                
                {pageSection === 6 ? 
                <ThemedView>
                    {uploadLoading ? 
                    <ThemedView>
                        {screenName === 'post' ? 
                        <TouchableOpacity >
                            <ThemedText>{t('post')}</ThemedText>
                        </TouchableOpacity>:
                        <TouchableOpacity>
                            <ThemedText>{t('edit')}</ThemedText>
                        </TouchableOpacity>
                        }
                    </ThemedView>:
                    <ThemedView>
                    {screenName === 'post' ? 
                    <TouchableOpacity onPress={()=> handlePostEvent()}>
                            <ThemedText>{t('post')}</ThemedText>
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={()=> handleUpdateEvent()}>
                            <ThemedText>{t('edit')}</ThemedText>
                        </TouchableOpacity>
                        }
                    </ThemedView>
                    }
                </ThemedView>:
                <TouchableOpacity onPress={()=> handleNextDisplay()}>
                    <ThemedText>{t('next')}</ThemedText>
                </TouchableOpacity>}
            </ThemedView>
        </ThemedView>}
        
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
    },
    createEventModal: {
        position: 'absolute',
        top: 100,
        borderWidth:1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: '90%'
    },
    errorText: {
        margin: 5,
        color: 'red'
      },
  
  
  
  
});