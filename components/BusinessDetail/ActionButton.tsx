import { View, Text, Share, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { BusinessItemProps } from '../Home/PopularBusinessItem'

type ActionButtonItem = {
    id: number;
    name: string;
    icon: any; 
    url?: string | { (): Promise<void> }; // URL for non-share actions, or onShare function for Share action
  };

export default function ActionButton({business} : BusinessItemProps) {
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: 'Check out this awesome content! ' + business.name,
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
      
    
      const actionButtonMenu: ActionButtonItem[] = [
        {
            id: 1,
            name: 'Call',
            icon: require('./../../assets/images/call.png'),
            url:'tel:'+ business?.contact,
        },
        {
            id: 2,
            name: 'Location',
            icon: require('./../../assets/images/location.png'),
            url: 'http://www.google.com/maps/dir/?api=1&destination='+ business?.address,
        },
        {
            id: 3,
            name: 'Share',
            icon: require('./../../assets/images/share.png'),
            url: onShare,
        },
        {
            id: 4,
            name: 'Web',
            icon: require('./../../assets/images/internet.png'),
            url: business?.website
        }
    ]

    const onPressHandler = (item: ActionButtonItem) => {
        if (item.name === 'Share') {
            onShare();
          } else if (item.url) {
            if (typeof item.url === 'string') {
              Linking.openURL(item.url);
            }
          }
    }
  
    return (
    <View
        style={{ 
            backgroundColor: '#fff',
            padding: 20,
        }}
    >
        <FlatList 
            data={actionButtonMenu}
            numColumns={4}
            columnWrapperStyle={{ justifyContent:'space-between' }}
            renderItem={({item, index}) => (
                <TouchableOpacity key={index} onPress={() => onPressHandler(item)}  >
                    <Image style={{width: 50, height: 50, borderRadius: 20}} source={item.icon} />
                    <Text
                        style={{
                            fontFamily: 'Raleway-Medium',
                            textAlign: 'center',
                            marginTop: 3,
                        }}
                    >{item?.name}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}