import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import LoginScreen from "@/components/LoginScreen";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}


export default function RootLayout() {
  useFonts ({
    "Raleway": require("./../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Bold": require("./../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Medium": require("./../assets/fonts/Raleway-Medium.ttf"),
  });
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey} >
      <ClerkLoaded>
        <SignedIn>
            <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name="(tabs)"/>
        </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
