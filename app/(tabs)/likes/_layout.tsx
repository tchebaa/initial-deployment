import { Stack } from 'expo-router';

import { useEffect } from 'react';




export default function LikesLayout() {

  return (
    
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="event" options={{headerShown: false}}/>
      </Stack>
    
  );
}
