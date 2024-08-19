import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig';
export default function Slider() {
    type DocDataType = {
        id: string;
        name: string;
        imageUrl: string;
      };
    const[sliderList,setSliderList]=useState<DocDataType[]>([]);
    useEffect(()=>{
        GetSliderList();
    },[])
    
    const GetSliderList=async()=>{
        setSliderList([]);
        const q =query(collection(db,'Slider'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev=>[...prev,doc.data() as DocDataType]);
        });
    }
  return (
    <View>
      <Text style={{
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
        padding: 20,
      }}>Special For You</Text>

      <FlatList 
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft: 20, marginRight: 20}}
        renderItem={({item, index}) => (
            <Image 
            source={{uri:item.imageUrl}} 
            style={{
                width: 300, 
                height: 150,
                borderRadius: 15,
                marginRight: 20,
            }} 
            />
        )}
      />


    </View>
  )
}