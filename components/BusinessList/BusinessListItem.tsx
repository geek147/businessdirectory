import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BusinessItemProps } from '../Home/PopularBusinessItem'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
export default function BusinessListItem({business}: BusinessItemProps) {
    const router= useRouter();
    return (
    <TouchableOpacity style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    }}
    onPress={()=>router.push(`/businessdetail/${business.id}`)}
    >
        <Image source={{uri: business.imageUrl}}
         style={{width: 120, height: 120, borderRadius:15 }} />
        <View style={{
            flex: 1,
            gap: 7,
        }}>
            <Text style={{fontSize: 20, fontFamily:'Raleway-Bold'}}>{business.name}</Text>
            <Text style={{fontSize: 15, fontFamily:'Raleway-Bold' , color: Colors.GRAY}}>{business.address}</Text>
            <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                    }}>
                <Image source={ require('./../../assets/images/star.png')} style={{ width: 20, height: 20 }} />
                <Text style={{fontFamily: 'Raleway'}}>4</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}