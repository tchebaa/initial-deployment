import { Stack } from 'expo-router';

import { useEffect } from 'react';




export default function TicketsLayout() {

  return (
    
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
      </Stack>
    
  );
}
