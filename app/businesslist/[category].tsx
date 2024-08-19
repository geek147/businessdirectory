import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection , query, where, getDocs} from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import BusinessListItem from '@/components/BusinessList/BusinessListItem';
import { BusinessItemDataType } from '@/components/Home/PopularBusiness';
import { Colors } from '@/constants/Colors';

export default function BusinessListByCategory() {
   const navigation = useNavigation();
   const {category} = useLocalSearchParams();
   const [businesslist, setBusinessList] = useState<BusinessItemDataType[]>([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
            headerStyle: {
                backgroundColor: Colors.PRIMARY,
            },
            headerTintColor: '#fff',

        })
        GetBusinessList();
   }, [])

   const GetBusinessList=async()=>{
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where("category", '==', category));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            setBusinessList(prev => [...prev, doc.data() as BusinessItemDataType ])
         })
        setLoading(false);
   }
   return (
    <View>
        {businesslist. length > 0 && loading == false?<FlatList
            data={businesslist}
            onRefresh={GetBusinessList}
            refreshing={loading}
            renderItem={({item, index}) => (
                <BusinessListItem 
                    business={item}
                    key={index}
                />
            )}
        />:
        loading? <ActivityIndicator
            style={{marginTop: '50%'}}
            size={'large'}
            color={Colors.PRIMARY}
        />:
        <Text
                style={{
                    fontFamily: 'Raleway-Bold',
                    fontSize: 20,
                    color: Colors.GRAY,
                    textAlign: 'center',
                    marginTop: 50,
                }}
        >No Business List</Text>}
    </View>
  )
}