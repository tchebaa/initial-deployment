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
      </Stack>
    
  );
}
