import { Stack } from 'expo-router';
import { HabitProvider } from '@/context/HabitContext';
import { useEffect } from 'react';

import {
  requestNotificationPermission,
  scheduleDailyNotification,
} from '@/services/notifications';

export default function RootLayout() {
  useEffect(() => {
    async function setupNotification() {
      const granted = await requestNotificationPermission();
      if (granted) {
        await scheduleDailyNotification();
      }
    }

    setupNotification();
  }, []);

  return (
    <HabitProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </HabitProvider>
  );
}
