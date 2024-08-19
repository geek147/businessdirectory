import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Colors} from '../../constants/Colors'
import { query, collection, getDocs } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'

export type CategoryDataType = {
    id: string;
    name: string;
    icon: string;
  };

export interface CategoryProps {
    explore: boolean;
    onCategorySelect: (category: CategoryDataType) => void;
}
export default function Category({ explore, onCategorySelect }: CategoryProps) {
  
    const [categoryList, setCategoryList] = useState<CategoryDataType[]>([]);
    const router = useRouter();
    useEffect(() => {
        GetCategoryList();
    }, []);
    const GetCategoryList = async() => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            console.log( doc.data());
            setCategoryList(prevState => [...prevState, doc.data() as CategoryDataType]);
        })
    }  
    
    const onCategoryPressHandler = (category: CategoryDataType) => {    
        if (explore) {
            onCategorySelect(category);
        } else {
            router.push(`/businesslist/${category.name}`);
        }
    }

  return (
    <View>
        {!explore && <View style={{
            padding: 20, 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
             }}>
            <Text style={{
                fontFamily: 'Raleway-Bold',
                fontSize: 20,
            }}>Category List</Text>
            <Text style={{
                color:Colors.PRIMARY, 
                fontFamily: 'Raleway-Bold',
                fontSize: 16,
            }}>View All</Text>
        </View>}

        <FlatList
            data={categoryList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{marginLeft: 20}}
            renderItem={({item, index}) =>(
                <CategoryItem 
                    category={item} 
                    key={index} 
                    onCategoryPress={(category: CategoryDataType) => onCategoryPressHandler(category)}
                />
            )}
        />

        
    </View>
  )
}