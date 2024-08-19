import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import {Colors} from '../../constants/Colors'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function Header() {
  const {user} = useUser();
  return (
    <View style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        }}>
            <Image source={{uri: user?.imageUrl}} style={{width: 50, height: 50, borderRadius: 99}}/>
            <View>
                <Text style={{
                    color: '#fff'
                }}>Welcome, </Text>
                <Text style={{
                    fontSize: 19,
                    color: '#fff',
                    fontFamily: 'Raleway-Medium'
                }}>{user?.fullName}</Text>
                
            </View>
        </View>
        {/* Search Bar */}
        <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    marginTop: 15,
                    borderRadius: 8
                }}>
                    <FontAwesome5 name="search" size={25} color= {Colors.PRIMARY}/>
                    <TextInput placeholder="Search..." style={{
                        fontFamily: 'Raleway',
                        fontSize: 16,
                    }}></TextInput>
                </View>
    </View>
  )
}