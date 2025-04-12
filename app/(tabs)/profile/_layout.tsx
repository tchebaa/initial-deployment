import { Stack } from 'expo-router';

import { useEffect } from 'react';




export default function ProfileLayout() {

  return (
    
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="manageEvents" options={{headerShown: false}}/>
        <Stack.Screen name="postEvent" options={{headerShown: false}}/>
        <Stack.Screen name="message" options={{headerShown: false}}/>
        <Stack.Screen name="settings" options={{headerShown: false}}/>
        <Stack.Screen name="chats" options={{headerShown: false}}/>
        <Stack.Screen name="admin" options={{headerShown: false}}/>
        <Stack.Screen name="allAdmins" options={{headerShown: false}}/>
        <Stack.Screen name="analytics" options={{headerShown: false}}/>
        <Stack.Screen name="eventAnalytics" options={{headerShown: false}}/>
        <Stack.Screen name="eventBookings" options={{headerShown: false}}/>
        <Stack.Screen name="users" options={{headerShown: false}}/>
      </Stack>
    
  );
}
