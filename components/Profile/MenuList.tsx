import { View, Text, FlatList, Image, TouchableOpacity,Share} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Href, useRouter } from 'expo-router';
import { SignedOut, useAuth } from '@clerk/clerk-expo';

export type MenuItem = {
  id: number;
  name: string;
  icon: any; 
  path?: string | { (): Promise<void> }; 
};

export default function MenuList() {
  const router = useRouter();
  const  {signOut} = useAuth();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app',
        url: 'https://example.com', // Optional: Add a URL to share
        title: 'Awesome Content',    // Optional: Title for the share dialog
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // If an activity type is returned, log it or perform other actions
          console.log('Shared with activity type: ', result.activityType);
        } else {
          // Shared with no specific activity
          console.log('Content shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // The share dialog was dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };
  const menuList : MenuItem[] = [
    {
        id: 1,
        name: 'Add Business',
        icon: require('./../../assets/images/addbusiness.png'),
        path: '/business/add-business'
    },
    {
      id: 2,
      name: 'My Business',
      icon: require('./../../assets/images/cooperation.png'),
      path: '/business/my-business'
    },
    {
      id: 3,
      name: 'Share App',
      icon: require('./../../assets/images/share.png'),
      path: ''
    },
    {
      id: 4,
      name: 'Logout',
      icon: require('./../../assets/images/logout.png'),
      path: ''
    }
  ];

  const onMenuItemPress = (item: MenuItem) => {
    if (item.id === 3) {
      onShare();
    } else if (item.id === 4) {
      signOut();
      return ;
    } else {
      router.push(item.path as Href<string>);
    }
  }
  return (
    <View style={{
      marginTop:50,
    }}>
      <FlatList 
        data={menuList}
        numColumns={2}
        renderItem={({item , index }) => (
          <TouchableOpacity
          onPress={() => onMenuItemPress(item)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            flex: 1,
            padding: 10,
            borderRadius: 15,
            borderWidth: 1,
            margin: 10,
            backgroundColor: '#fff',
            borderColor: Colors.GRAY,  
          }}>
              <Image source={item.icon} style={{width: 50, height: 50,}} />
              <Text style={{fontSize: 16, fontFamily: 'Raleway-Bold', flex: 1}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{
        fontFamily: 'Raleway',
        textAlign: 'center',
        marginTop: 50,
        color: Colors.GRAY,
      }}>Developed by geek147 @ 2024</Text>
    </View>
  )
}