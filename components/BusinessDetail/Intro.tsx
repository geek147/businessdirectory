import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { BusinessItemProps } from '../Home/PopularBusinessItem'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business} : BusinessItemProps) {
  const router = useRouter();
  const {user} = useUser();
  const onDelete=() => {
    Alert.alert('Are you sure you want to delete this business?', 'You will not be able to recover this business', [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => deleteBusiness(), style: 'destructive'},
    ]);
  };
  
  const deleteBusiness = async()=> {
    await deleteDoc(doc(db, 'BusinessList', business?.id));
    router.back();
    ToastAndroid.show('Business Deleted', ToastAndroid.LONG);
  }
  return (
    <View>
        <View
            style={{ 
                position: 'absolute',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'space-between',
                width: '100%',
                padding: 20,
            }}
        >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
        </View>
      <Image source={{uri: business?.imageUrl}} style={{width: 400, height: 250}}/>
      <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-between',
          padding: 20,
          marginTop: -20,
          backgroundColor: '#fff',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,

        }}>
          <View
          >
            <Text style={{
              fontSize: 26, fontFamily:'Raleway-Bold' ,color: 'black'
              }}>{business?.name}
            </Text>
            <Text style={{fontSize: 18, color: 'black'}}>{business?.address}</Text>
          </View>
        {user?.primaryEmailAddress?.emailAddress==business?.userEmail && <TouchableOpacity onPress={()=>onDelete()}>
            <Feather name="trash" size={24} color="black" />  
        </TouchableOpacity>}
      </View>
    </View>
  )
}