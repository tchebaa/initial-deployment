import { Tabs } from 'expo-router';
import React, {useEffect} from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useUser} from '../../context/UserContext'
import { Link, useRouter } from 'expo-router';
import {useLanguage} from '../../context/LanguageContext'


export default function TabLayout() {


  const {t} = useLanguage()
  const colorScheme = useColorScheme();

  const router = useRouter()

  const {userDetails, setUserDetails} = useUser()

  useEffect(()=> {

     //console.log(userDetails)
    if(!userDetails) {
      router.push('/')
    }
  },[userDetails])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: t('home'),
          tabBarIcon: ({ color }) => <AntDesign size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('search'),
          tabBarIcon: ({ color }) => <AntDesign size={24} name="search1" color={color} />,
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: t('likes'),
          tabBarIcon: ({ color }) => <AntDesign size={24} name="hearto" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: t('tickets'),
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="ticket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
