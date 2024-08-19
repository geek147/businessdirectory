import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';
import { useOAuth } from '@clerk/clerk-expo'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tab)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View>
      <View style={{ 
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,

      }}>
      <Image source={require('./../assets/images/book.png')} 
          style={{ width: 300, height: 400, borderRadius:20, borderWidth: 6, borderColor: '#000' }}
      />   
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{ fontSize: 30, fontFamily: 'Raleway-Bold', textAlign: 'center' }}
        >Your Ultimate <Text style={{ color: Colors.PRIMARY}}>Community Business Directory </Text>App</Text>
        <Text style={{ 
          fontSize: 15,
          color: Colors.GRAY, 
          marginVertical: 15,
          fontFamily: 'Raleway',
          textAlign: 'center',
        }}>Find your favorite business near you and post your favorite business in your community </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Raleway-Bold', textAlign: 'center' }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding:16,
    borderRadius: 99,
    marginTop: 10,
  }
})