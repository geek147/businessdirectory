import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from '../../constants/Colors'
import { query, collection, limit, getDocs } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import PopularBusinessItem from './PopularBusinessItem'

export type BusinessItemDataType = {
  reviews: any
  about: string;
  address: string;
  category: string;
  contact: string;
  imageUrl: string;
  name: string;
  rating: number;
  website: string;
  id: string;
  username: string;
  userEmail: string;
  userImage: string;
};
export default function PopularBusiness() {
  
  const [BusinessList, setBusinessList] = useState<BusinessItemDataType[]>([]);
  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList=async()=>{
      setBusinessList([]);
      const q = query(collection(db, 'BusinessList'), limit(10));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        console.log(doc.data());
        setBusinessList(prev=>[...prev,doc.data() as BusinessItemDataType]);
      })
  }
  return (
    <View>
      <View style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
             }}>
            <Text style={{
                fontFamily: 'Raleway-Bold',
                fontSize: 20,
            }}>Popular Business</Text>
            <Text style={{
                color:Colors.PRIMARY, 
                fontFamily: 'Raleway-Bold',
                fontSize: 16,
            }}>View All</Text>
        </View>

        <FlatList
          data={BusinessList}
          showsHorizontalScrollIndicator={false}
          style={{
            marginRight: 20, 
          }}
          horizontal={true}
          renderItem={({ item, index }) => (
            <PopularBusinessItem key={index} business={item}/>
          )}
        />
    </View>
  )
}