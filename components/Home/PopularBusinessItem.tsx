import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BusinessItemDataType } from './PopularBusiness';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
export interface BusinessItemProps {
    business: BusinessItemDataType;
  }

export default function PopularBusinessItem({ business }: BusinessItemProps) {
  const router = useRouter();
  return (
    <TouchableOpacity style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,  
        marginBottom: 20,
    }}
    onPress={()=>router.push(`/businessdetail/${business?.id}`)}
    >
        <Image source={{ uri: business?.imageUrl }} 
        style={{ width: 200, height: 130, borderRadius:15,  }} />
        <View style={{ 
            marginTop: 7,
            gap: 5,
        }}>
            <Text style={{ fontSize: 16, fontFamily: 'Raleway-Bold' }}>{business?.name}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Raleway-Medium' , color: Colors.GRAY}}>{business?.address}</Text>
             <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
             }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                }}>
                    <Image source={ require('./../../assets/images/star.png')} style={{ width: 20, height: 20 }} />
                    <Text style={{fontFamily: 'Raleway'}}>4</Text>
                </View>
                <Text style={{fontFamily: 'Raleway-Medium', backgroundColor: Colors.PRIMARY, fontSize:10, color:'#fff', padding:5, borderRadius: 10}}>{business?.category}</Text>
            </View>
        </View>

    </TouchableOpacity>
  )
}