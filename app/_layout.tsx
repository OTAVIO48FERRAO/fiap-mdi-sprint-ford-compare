// app/_layout.tsx
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ComparisonProvider } from '../context/ComparisonContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const doc = (globalThis as { document?: Document }).document;

      if (doc) {
        const styleId = 'ford-intelligence-no-text-selection';
        let styleTag = doc.getElementById(styleId) as HTMLStyleElement | null;

        if (!styleTag) {
          styleTag = doc.createElement('style');
          styleTag.id = styleId;
          styleTag.textContent = `
            body,
            #root,
            #root * {
              user-select: none !important;
              -webkit-user-select: none !important;
              -webkit-touch-callout: none !important;
              cursor: default !important;
            }

            input,
            textarea,
            [contenteditable="true"] {
              user-select: text !important;
              -webkit-user-select: text !important;
              -webkit-touch-callout: default !important;
              cursor: text !important;
            }
          `;
          doc.head.appendChild(styleTag);
        }
      }
    }
  }, []);

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
          <Stack.Screen name="monitoring" options={{ title: 'Monitoramento' }} />
          <Stack.Screen name="details" options={{ title: 'Ranger Raptor' }} />
          <Stack.Screen name="report" options={{ title: 'Relatório' }} />
          <Stack.Screen name="about" options={{ title: 'Sobre' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="signup" options={{ title: 'Signup' }} />
        </Stack>
      </ComparisonProvider>
    </SafeAreaProvider>
  );
}