import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';
import Category, { CategoryDataType } from '@/components/Home/Category';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { BusinessItemDataType } from '@/components/Home/PopularBusiness';
import ExploreBusiness from '@/components/Explore/ExploreBusiness';


export default function explore() {
  const [businessList, setBusinessList] = useState<BusinessItemDataType[]>([]);
  const GetBusinessByCategory=async (category: CategoryDataType)=>{
      setBusinessList([]);
      const q= query(collection(db, 'BusinessList'), where('category', '==', category.name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          console.log(doc.data());  
          setBusinessList(prev=>[...prev,doc.data() as BusinessItemDataType]);
      });
  }
  return (
    <View style={{
      padding: 20,
    }}>
      <Text style={{
        fontFamily: 'Raleway-Bold',
        fontSize: 30,
      }}>Explore More</Text>
      {/* Searchbar */}
      <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    marginTop: 15,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                }}>
                    <FontAwesome5 name="search" size={25} color= {Colors.PRIMARY}/>
                    <TextInput placeholder="Search..." style={{
                        fontFamily: 'Raleway',
                        fontSize: 16,
                    }}></TextInput>
                </View>
      {/* Category */}
      <Category 
        explore={true}
        onCategorySelect={(category)=> GetBusinessByCategory(category)}
      />
          
      {/* BusinessList */}
      <ExploreBusiness businessList={businessList}/>

    </View>
  )
}