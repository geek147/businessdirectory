import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import { CategoryDataType } from './Category'

export interface CategoryItemProps {
    category: CategoryDataType;
    onCategoryPress: (category: CategoryDataType) => void;
  }

export default function CategoryItem({category, onCategoryPress} : CategoryItemProps) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View
            style={{
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: 99,   
                marginRight: 10,
            }}
        >
            <Image 
                source={{uri: category.icon}}
                style={{width: 60, height: 60}} 
            />
       </View>
       <Text
        style={{color: '#000', fontSize: 12, paddingTop: 10, textAlign: 'center', fontFamily: 'Raleway-Medium',
        }}>{category.name}</Text>
    </TouchableOpacity>
  )
}