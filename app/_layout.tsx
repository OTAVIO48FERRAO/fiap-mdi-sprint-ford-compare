// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ComparisonProvider } from '../context/ComparisonContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const val = await AsyncStorage.getItem('isLoggedIn');
        if (val !== 'true') {
          router.replace('/login');
        }
      } catch (err) {
        // se falhar, manter usuário na rota atual
        console.error('Auth check failed', err);
      }
    };

    checkAuth();
  }, []);
  return (
    <SafeAreaProvider>
      <ComparisonProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="comparison" options={{ title: 'Comparison Results', presentation: 'modal' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="signup" options={{ title: 'Signup' }} />
        </Stack>
      </ComparisonProvider>
    </SafeAreaProvider>
  );
}