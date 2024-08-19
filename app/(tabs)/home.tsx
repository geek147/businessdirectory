import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category, { CategoryDataType } from '../../components/Home/Category'
import PopularBusiness from '@/components/Home/PopularBusiness'
import { useRouter } from 'expo-router'

export default function home() {
  const router = useRouter();
  const handleCategorySelect = (category: CategoryDataType) => {
    router.push(`/businesslist/${category.name}`);

  };
  return (
    <ScrollView>
      { /* Header  */}
      <Header />
      { /* Slider  */}
      <Slider />
      { /* Category  */}
      <Category 
        explore={false}
        onCategorySelect={handleCategorySelect} 
      />
      { /* Popular Business List  */}
      <PopularBusiness />
    </ScrollView>
  )
}