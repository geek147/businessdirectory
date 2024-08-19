import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { BusinessItemDataType } from '../Home/PopularBusiness';
import BusinessListCard from './BusinessListCard';

export interface BusinessListProps {
    businessList: BusinessItemDataType[];
}

export default function ExploreBusiness({ businessList }: BusinessListProps) {
  return (
    <View style={{
        marginBottom: 20,
    }}>
      <FlatList
        data={businessList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
            <View >
                <BusinessListCard business={item} key={index}/>
            </View>
        )}
      />
      
    </View>
  )
}