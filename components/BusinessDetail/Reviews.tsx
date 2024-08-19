import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { BusinessItemProps } from '../Home/PopularBusinessItem';
import { Rating } from 'react-native-ratings';
import { Colors } from '@/constants/Colors';
import { db } from '@/configs/FirebaseConfig';
import { arrayUnion, updateDoc, doc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

type ReviewItem = {
  rating: number;
  comment: string;
  userName: string;
  userImage: string;
};

export default function Reviews({ business }: BusinessItemProps) {
  const [rating, setRating] = useState(0);
  const [userInput, setUserInput] = useState('');
  const { user } = useUser();

  const onSubmit = async () => {
    try {
      const docRef = doc(db, 'BusinessList', business.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user?.fullName || 'Anonymous',
          userImage: user?.imageUrl || '',
        }),
      });

      ToastAndroid.show('Review Submitted Successfully', ToastAndroid.SHORT);
      setUserInput(''); // Reset the input after submission
      setRating(0); // Reset the rating after submission
    } catch (e) {
      console.error('Error submitting review:', e);
      ToastAndroid.show('Failed to submit review', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <View>
        <Rating
          imageSize={25}
          showRating={false}
          onFinishRating={(value: number) => setRating(value)}
          style={styles.rating}
        />
        <TextInput
          placeholder="Write a review"
          value={userInput}
          onChangeText={(text: string) => setUserInput(text)}
          numberOfLines={4}
          style={styles.textInput}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={onSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Show all Reviews */}
      <View>
        {business?.reviews?.map((item:  ReviewItem, index: number) => (
          <View key={index} style={styles.reviewItem}>
            <Image
              source={{ uri: item.userImage }}
              style={styles.userImage}
            />
            <View style={styles.reviewContent}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Rating
                imageSize={25}
                startingValue={item.rating}
                readonly
                style={styles.reviewRating}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
  },
  rating: {
    paddingVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
  },
  reviewItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginTop: 10,
    borderRadius: 15,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  reviewContent: {
    display: 'flex',
    gap: 5,
  },
  userName: {
    fontFamily: 'Raleway-Bold',
  },
  reviewRating: {
    alignItems: 'flex-start',
  },
});
