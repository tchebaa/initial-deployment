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



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



//Events Data

const events = [
    {
        "_id": "66894dd1b44243b670af2bc0",
        "eventName": "Zalewa Friday Party",
        "eventDescription": "## Get Ready for the Ultimate Friday Night Fiesta: Zalewa Friday Party!\n\nCalling all party animals of Mombasa! Get ready to unleash your inner reveler at the **Zalewa Friday Party**, happening at the **Mikindani Hospital** grounds.  This isn't your average Friday night; it's an epic celebration bursting with music, laughter, and good vibes!\n\n**Get your groove on with the legendary DJ Fondo!** He'll be spinning the hottest tracks, from classic bangers to the latest chart-toppers, ensuring the dance floor is packed all night long.  Whether you're a seasoned dancer or just want to move to the beat, DJ Fondo will have you grooving with a smile on your face.\n\n**Feeling like a karaoke superstar?**  We've got you covered! Step up to the mic and belt out your favorite tunes, whether it's a classic love song or a high-energy anthem. Unleash your inner rockstar and let loose with your friends –  who knows, maybe you'll discover a hidden talent!\n\n**Keep the good times flowing with the iconic Tusker beer!**  Enjoy a refreshing Tusker, the perfect companion for a night of dancing, singing, and socializing.  Let the smooth taste of Tusker fuel your fun and create memories that will last a lifetime. \n\n**The Zalewa Friday Party is the perfect opportunity to:**\n\n* **Escape the daily grind** and let loose with friends and colleagues.\n* **Dance the night away** to the hottest tunes spun by DJ Fondo.\n* **Show off your singing skills** at the karaoke stage.\n* **Enjoy a cold Tusker** with good company and great vibes.\n* **Create lasting memories** and celebrate the end of the week in style. \n\n**So, gather your crew, put on your dancing shoes, and head down to the Mikindani Hospital grounds for a night of unforgettable fun at the Zalewa Friday Party!** \n",
        "email": "fondolski@gmail.com",
        "emailContacts": [
            "rani@gmail.com"
        ],
        "linkedinContacts": [],
        "facebookContacts": [],
        "phoneContacts": [
            "0714892078"
        ],
        "whatsAppContacts": [],
        "instagramContacts": [],
        "xTwitterContacts": [],
        "gitHubContacts": [],
        "eventMainImage": {
            "aspectRatio": 'a',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/609c30de-6bbb-4c8e-a40e-6ad94ef4c3d3?alt=media&token=8944a04a-61f4-419f-8ae8-cdd7329b527e"
        },
        "eventImage1": {
            "aspectRatio": 'a',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/19852e24-427f-4ae9-854f-a79d08d9c689?alt=media&token=795515c0-af7e-46b1-8537-4fb96edada37"
        } ,
        "eventImage2": "",
        "eventImage3": "",
        "eventImage4": "",
        "eventType": "offline",
        "dateTimePrice": [
            {
                "adultPrice": 300,
                "adolescentPrice": 0,
                "childPrice": 0,
                "preschoolerPrice": 0,
                "infantPrice": 0,
                "eventDate": "2024-12-12T13:30:00.000Z",
                "eventDays": 0,
                "eventHours": 12,
                "eventMinutes": 0,
                "ticketTitle": "Regular",
                "ageGroups": [],
                "_id": "66894dd1b44243b670af2bc1",
                "eventEndDate": "2025-01-13T00:00:00.000Z"
            }
        ],
        "ageRestriction": [],
        "location": {
            "type": "Point",
            "coordinates": [
                {
                    "$numberDecimal": "39.6309814"
                },
                {
                    "$numberDecimal": "-4.004131699999999"
                }
            ]
        },
        "address": "Mikindani Hospital, Mombasa, Kenya",
        "categories": [
            "{\"title\":\"Music\",\"name\":\"music\"}",
            "{\"title\":\"Night party\",\"name\":\"night\"}"
        ],
        "extraOrganizer": [],
        "guests": [
            "Dj Fondo"
        ],
        "extraContacts": [],
        "agenda": [],
        "createdAt": "2024-07-06T13:59:45.660Z",
        "updatedAt": "2024-07-06T13:59:53.351Z",
        "__v": 0,
        "cost": true
    },
    {
        "_id": "668a818d16951e563f914e37",
        "eventName": "Kitengela Optiven Estate Show Kitengela Show Kitengela Kitengela Show Kitengela Kitengela Show Kitengela Kitengela Show Kitengela ",
        "eventDescription": "## Discover Your Dream Home at the Kitengela Optiven Estate Show!\n\nJoin us in Kitengela, Kenya for an exciting opportunity to explore the vibrant Optiven Estate. This event showcases beautifully designed homes with modern amenities, all nestled within a thriving community. \n\n**Experience the best of Kitengela:**\n\n* **Available Water:** Enjoy the convenience of readily accessible water for your daily needs.\n* **Pavements:** Move effortlessly through well-maintained pavements, ensuring safe and comfortable access.\n* **Equity Bank:** Secure your dream home with convenient financing options provided by Equity Bank.\n* **Mortgage:** Explore various mortgage plans tailored to your financial needs, making homeownership a reality.\n\n**Don't miss this chance to:**\n\n* Meet with expert representatives from Optiven and Equity Bank.\n* Learn about the unique features and benefits of the Optiven Estate.\n* Get personalized advice on financing options and purchase procedures.\n\n**This is your chance to build a future you can be proud of.** Visit the Kitengela Optiven Estate Show and take the first step towards owning your dream home! \n",
        "email": "fondolski@gmail.com",
        "emailContacts": [],
        "linkedinContacts": [],
        "facebookContacts": [],
        "phoneContacts": [],
        "whatsAppContacts": [
            "0714892078"
        ],
        "instagramContacts": [],
        "xTwitterContacts": [],
        "gitHubContacts": [],
        "eventMainImage": {
            "aspectRatio": 'b',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/ed6ec487-8414-4ddf-8eee-c80e9da61d67?alt=media&token=994c66d0-f652-46cb-84d9-b6b4098d1bb8"
        },
        "eventImage1":  
        {
            "aspectRatio": 'c',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/f6d0b973-374f-4963-96e7-99bf47e8be10?alt=media&token=d79d6622-2d88-4212-8332-0effbf867b32"
        }
        ,
        "eventImage2": 
        {
            "aspectRatio": 'c',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/c8edd6c4-cd61-4c9a-bd05-89377bc04b02?alt=media&token=61ec8d1a-b1a0-4c4d-a2f9-ba5b2eff3401"
        },
        "eventImage3": "",
        "eventImage4": "",
        "eventType": "offline",
        "dateTimePrice": [
            {
                "adultPrice": 0,
                "adolescentPrice": 0,
                "childPrice": 0,
                "preschoolerPrice": 0,
                "infantPrice": 0,
                "eventDate": "2024-12-25T05:00:00.000Z",
                "eventDays": 1,
                "eventHours": 0,
                "eventMinutes": 0,
                "cost": false,
                "ticketTitle": "",
                "ageGroups": [
                    "Adolescent",
                    "Child"
                ],
                "_id": "668a818d16951e563f914e38",
                "eventEndDate": "2024-12-30T05:00:00.000Z"
            },
            {
                "adultPrice": 0,
                "adolescentPrice": 0,
                "childPrice": 0,
                "preschoolerPrice": 0,
                "infantPrice": 0,
                "eventDate": "2024-07-05T05:00:00.000Z",
                "eventDays": 1,
                "eventHours": 0,
                "eventMinutes": 0,
                "cost": false,
                "ticketTitle": "",
                "ageGroups": [
                    "Adolescent",
                    "Child"
                ],
                "_id": "668a818d16951e563f914e39",
                "eventEndDate": "2024-07-12T05:00:00.000Z"
            }
        ],
        "ageRestriction": [
            "Adolescent",
            "Child"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                {
                    "$numberDecimal": "36.849996"
                },
                {
                    "$numberDecimal": "-1.5167072"
                }
            ]
        },
        "address": "Kitengela, Kenya",
        "categories": [
            "{\"title\":\"Business\",\"name\":\"business\"}",
            "{\"title\":\"Real estate\",\"name\":\"business\"}"
        ],
        "extraOrganizer": [],
        "guests": [
            "Dr Fondo Rani"
        ],
        "extraContacts": [],
        "agenda": [],
        "createdAt": "2024-07-07T11:52:45.777Z",
        "updatedAt": "2024-07-07T11:52:48.765Z",
        "__v": 0
    },
    {
        "_id": "668a8491e362b71ac0bc7884",
        "eventName": "Walk for diabetes",
        "eventDescription": "## Walk for Diabetes:  Join the Fight for a Healthier Future! \n\n**Location:** Thika Road, Nairobi, Kenya\n\n**Let's walk together to raise awareness and funds for diabetes research and support!**\n\n**Walk for Diabetes** is a community event focused on promoting diabetes awareness, education, and support.  Join us for a fun-filled walk along Thika Road where you can:\n\n* **Get free diabetes testing:**  Know your risk and take charge of your health!\n* **Learn from experts:**  Attend educational sessions on diabetes prevention, management, and healthy living.\n* **Contribute to a worthy cause:**  Your participation helps fund vital research and support programs for those living with diabetes.\n\n**Together, we can make a difference!** \n\n**This event is open to all ages and fitness levels. Come join us and be a part of the solution.** \n",
        "email": "fondolski@gmail.com",
        "emailContacts": [],
        "linkedinContacts": [],
        "facebookContacts": [],
        "phoneContacts": [],
        "whatsAppContacts": [],
        "instagramContacts": [],
        "xTwitterContacts": [],
        "gitHubContacts": [],
        "eventMainImage": {
            "aspectRatio": 'c',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/f315a1f3-d4e3-416b-9180-f2f49cca6372?alt=media&token=b3940f85-1e8f-4a2e-973a-eba6c0ef8cc9"
        } ,
        "eventImage1": "",
        "eventImage2": "",
        "eventImage3": "",
        "eventImage4": "",
        "eventType": "offline",
        "dateTimePrice": [
            {
                "adultPrice": 0,
                "adolescentPrice": 0,
                "childPrice": 0,
                "preschoolerPrice": 0,
                "infantPrice": 0,
                "eventDate": "2024-07-28T05:00:00.000Z",
                "eventDays": 1,
                "eventHours": 0,
                "eventMinutes": 0,
                "cost": false,
                "ticketTitle": "",
                "ageGroups": [
                    "Adolescent",
                    "Child",
                    "Preschooler"
                ],
                "_id": "668a8491e362b71ac0bc7885",
                "eventEndDate": "2024-07-29T05:00:00.000Z"
            }
        ],
        "ageRestriction": [
            "Adolescent",
            "Child",
            "Preschooler"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                {
                    "$numberDecimal": "36.8949246"
                },
                {
                    "$numberDecimal": "-1.2163932"
                }
            ]
        },
        "address": "Thika Road, Nairobi, Kenya",
        "categories": [
            "{\"title\":\"Health\",\"name\":\"health\"}",
            "{\"title\":\"Charity & fundraising\",\"name\":\"charity\"}"
        ],
        "extraOrganizer": [],
        "guests": [
            "Abdulswamad"
        ],
        "extraContacts": [],
        "agenda": [],
        "createdAt": "2024-07-07T12:05:37.143Z",
        "updatedAt": "2024-07-07T12:05:39.435Z",
        "__v": 0
    },
    {
        "_id": "668bd8bba0871a975cf06407",
        "eventName": "Cancer awareness",
        "eventDescription": "Join us for a vibrant and impactful Cancer Awareness event at Bamburi Mtambo, Mombasa, Kenya! This event is all about raising awareness, promoting early detection, and supporting those affected by cancer.\n\nGet your body moving with a invigorating walk, celebrating life and strength.  Embrace the rhythm of hope with a lively dance session, bringing joy and unity to the community.  Engage in insightful talks from experts, learning about cancer prevention, diagnosis, and treatment options.  \n\nLet's come together to fight cancer, one step, one dance, and one conversation at a time.  \n",
        "email": "fondolski@gmail.com",
        "emailContacts": [],
        "linkedinContacts": [
            "@stephenFondo"
        ],
        "facebookContacts": [],
        "phoneContacts": [],
        "whatsAppContacts": [
            "0714892078"
        ],
        "instagramContacts": [],
        "xTwitterContacts": [],
        "gitHubContacts": [],
        "eventMainImage": {
            "aspectRatio": 'c',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/b423b12d-d563-48ff-a0df-369815ac8bd9?alt=media&token=3a0d2d11-2fe3-424f-89e5-7b28ad5e7bff"
        },
        "eventImage1": "",
        "eventImage2": "",
        "eventImage3": "",
        "eventImage4": "",
        "eventType": "offline",
        "dateTimePrice": [
            {
                "adultPrice": 0,
                "adolescentPrice": 0,
                "childPrice": 0,
                "preschoolerPrice": 0,
                "infantPrice": 0,
                "eventDate": "2024-07-18T05:00:00.000Z",
                "eventEndDate": "2024-07-21T05:00:00.000Z",
                "eventDays": 3,
                "eventHours": 0,
                "eventMinutes": 0,
                "cost": false,
                "ticketTitle": "",
                "ageGroups": [
                    "Adolescent",
                    "Child"
                ],
                "_id": "668bd8bba0871a975cf06408"
            }
        ],
        "ageRestriction": [
            "Adolescent",
            "Child"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                {
                    "$numberDecimal": "39.7115207"
                },
                {
                    "$numberDecimal": "-3.9997619"
                }
            ]
        },
        "address": "Bamburi mtambo, Mombasa, Kenya",
        "categories": [
            "{\"title\":\"Religion & spirituality\",\"name\":\"photography\"}",
            "{\"title\":\"Charity & fundraising\",\"name\":\"charity\"}"
        ],
        "extraOrganizer": [],
        "guests": [
            "William Ruto"
        ],
        "extraContacts": [],
        "agenda": [],
        "createdAt": "2024-07-08T12:16:59.916Z",
        "updatedAt": "2024-07-08T12:17:02.778Z",
        "__v": 0
    },
    {
        "_id": "668be169bbb9193e2c2619da",
        "eventName": "Full Stack Development Forum",
        "eventDescription": "## Unleash Your Full Stack Potential: Full Stack Development Forum\n\nJoin us at the **Grand Regency Hotel, Nairobi, Kenya** for a dynamic forum dedicated to exploring the cutting edge of full stack development. \n\nThis event brings together seasoned developers and aspiring learners to delve into the power of **JavaScript, TypeScript, and Node.js**.  Discover the latest trends, share best practices, and network with fellow enthusiasts. \n\nWhether you're a seasoned professional or just starting your journey, this forum offers valuable insights into:\n\n* **Building robust and scalable applications** with the versatility of JavaScript.\n* **Elevating code quality and maintainability** through the type safety of TypeScript.\n* **Harnessing the power of Node.js** for server-side development and beyond.\n\nDon't miss this opportunity to learn, connect, and ignite your full stack development passion! \n",
        "email": "fondolski@gmail.com",
        "emailContacts": [],
        "linkedinContacts": [],
        "facebookContacts": [],
        "phoneContacts": [],
        "whatsAppContacts": [],
        "instagramContacts": [],
        "xTwitterContacts": [
            "@fondolski_fondo"
        ],
        "gitHubContacts": [],
        "eventMainImage": {
            "aspectRatio": 'a',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/76a140c5-b3a3-42ad-ad51-ad8f97615ae6?alt=media&token=cd841e4a-b9dc-442e-98d2-3b4b5a33918a"
        },
        "eventImage1": {
            "aspectRatio": 'a',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/959678f2-ef99-48b5-b6f6-daefcd9bd503?alt=media&token=78489697-9f76-4f26-a201-7ff8e6fcc264"
        },
        "eventImage2": {
            "aspectRatio": 'b',
            "url": "https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/1d43b7d6-91de-4475-a455-2e9f2b494fb4?alt=media&token=87136eac-1a9c-4e93-a104-bf550e18da96"
        },
        "eventImage3": "",
        "eventImage4": "",
        "eventType": "offline",
        "dateTimePrice": [
            {
                "adultPrice": 500,
                "adolescentPrice": 100,
                "childPrice": 0,
                "preschoolerPrice": 0,
                "infantPrice": 0,
                "eventDate": "2024-07-20T07:00:00.000Z",
                "eventEndDate": "2024-07-20T19:00:00.000Z",
                "eventDays": 0,
                "eventHours": 12,
                "eventMinutes": 0,
                "cost": true,
                "ticketTitle": "",
                "ageGroups": [
                    "Adolescent"
                ],
                "_id": "668be169bbb9193e2c2619db"
            }
        ],
        "ageRestriction": [
            "Adolescent"
        ],
        "location": {
            "type": "Point",
            "coordinates": [
                {
                    "$numberDecimal": "36.7285529"
                },
                {
                    "$numberDecimal": "-1.284039"
                }
            ]
        },
        "address": "Grand Regency Hotel, Nairobi, Kenya",
        "categories": [
            "{\"title\":\"Software & tech\",\"name\":\"software\"}"
        ],
        "extraOrganizer": [],
        "guests": [],
        "extraContacts": [],
        "agenda": [],
        "createdAt": "2024-07-08T12:54:01.207Z",
        "updatedAt": "2024-07-08T12:54:03.608Z",
        "__v": 0
    }
  ]




export default function EventScreen() {

    const { screenType, id } = useLocalSearchParams();


  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <EventHeader item={events[2]} screenType={screenType}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <EventScreenBody item={events[2]} screenType={screenType}/>
            </ScrollView>
            
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
    searchButton: {
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '90%',
        borderRadius: 20,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    }
  
  
  
  
});
