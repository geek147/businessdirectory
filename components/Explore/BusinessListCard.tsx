import { View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BusinessItemProps } from '../Home/PopularBusinessItem'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router';

export default function BusinessListCard({ business }: BusinessItemProps) {
    const router = useRouter();
    return (
    <TouchableOpacity 
        onPress={() => router.push(`/businessdetail/${business.id}`)}
        style={{ 
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15,
    }}>
        <Image source={{ uri: business.imageUrl }} style={{ 
            width: 350,
            height: 150,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        }} />
        <View style={{ 
            padding: 10,
        }}>
            <Text style={{ fontSize: 20, fontFamily: 'Raleway-Bold' }}>{business.name}</Text>
            <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: Colors.GRAY }}>{business.address}</Text>
        </View>
    </TouchableOpacity>
  )
}