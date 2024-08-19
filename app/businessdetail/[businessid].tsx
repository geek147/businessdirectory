import { View, ActivityIndicator, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { db } from '@/configs/FirebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { BusinessItemDataType } from '@/components/Home/PopularBusiness';
import { Colors } from '@/constants/Colors';
import Intro from '@/components/BusinessDetail/Intro';
import ActionButton from '@/components/BusinessDetail/ActionButton';
import About from '@/components/BusinessDetail/About';
import Reviews from '@/components/BusinessDetail/Reviews';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState<BusinessItemDataType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (businessid) {
      GetBusinessDetailById(businessid as string);
    }
  }, [businessid]);

  const GetBusinessDetailById = async (id: string) => {
    setLoading(true);
    const docRef = doc(db, 'BusinessList', id);

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        console.log("Document data:", docSnapshot.data());
        setBusiness(docSnapshot.data() as BusinessItemDataType);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (!business) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Business Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[business]} // FlatList expects an array
      keyExtractor={(item) => item.id}
      renderItem={() => (
        <View>
          {/* Intro */}
          <Intro business={business} />
          {/* Action Button */}
          <ActionButton business={business} />
          {/* About Section */}
          <About business={business} />
          {/* Review Section */}
          <Reviews business={business} />
        </View>
      )}
    />
  );
}
