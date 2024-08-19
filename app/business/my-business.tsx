import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { BusinessItemDataType } from '@/components/Home/PopularBusiness';
import BusinessListItem from '@/components/BusinessList/BusinessListItem';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function myBusiness() {
    const {user} = useUser();
    const [BusinessList, setBusinessList] = useState<BusinessItemDataType[]>([]);
    const [loading,setLoading]=useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business',
            headerStyle: {
                backgroundColor: Colors.PRIMARY,
            },
            headerTintColor: '#fff',
        })
       user&& GetUserBusiness();
    },[user]);
    const GetUserBusiness=async()=>{
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log( doc.data());
            setBusinessList(prev=>[...prev,doc.data() as BusinessItemDataType]);
        })
        setLoading(false);
    }
    return (
    <View style={{ padding: 20}}>
      <Text style={{
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
      }}>My Business</Text>

      <FlatList 
        data={BusinessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item, index}) => (
            <BusinessListItem
             business={item} 
             key={index}
             />
        )}
      />
    </View>
  )
}