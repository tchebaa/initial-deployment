import { Stack } from 'expo-router';

import { useEffect } from 'react';




export default function ProfileLayout() {

  return (
    
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
      </Stack>
    
  );
}
