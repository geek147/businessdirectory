import { View, Text } from 'react-native'
import React from 'react'
import { BusinessItemProps } from '../Home/PopularBusinessItem'

export default function About({business} : BusinessItemProps) {
  return (
    <View
        style={{
            padding: 20,
            backgroundColor: '#fff',
        }}
    >
      <Text
        style={{
            fontFamily: 'Raleway-Bold',
            fontSize: 20,
         }}
      >About</Text>
      <Text
        style={{
            fontFamily: 'Raleway',
            lineHeight: 25,
         }}
      >{business?.about}</Text>
    </View>
  )
}