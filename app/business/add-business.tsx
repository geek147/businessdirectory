import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect , useState} from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, query, getDocs, setDoc, doc} from 'firebase/firestore';
import { db, storage } from '@/configs/FirebaseConfig';
import { CategoryDataType } from '@/components/Home/Category';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';


export default function addBusiness() {
    const router = useRouter();
    const navigation = useNavigation()
    const [image, setImage] = useState<string | null>(null);
    const [categoryList, setCategoryList] = useState<CategoryDataType[]>([]);
    const {user} = useUser();
     const [name,setName] = useState('');
     const [address,setAddress] = useState('');
     const [contact,setContact] = useState('');
     const [website,setWebsite] = useState('');
     const [about,setAbout] = useState('');
     const [category,setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true,
        });
        GetCategoryList();
    }, [])

    const onImagePick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result?.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } else {
        setImage(null); 
      }
      console.log(result);
      console.log(image);
    }

    const onAddNewBusiness = async () => {
        setLoading(true);
        const fileName = Date.now().toString() + '.jpg';
        const resp = await fetch(image!!);
        const blob = await resp.blob();

        const imageRef =ref(storage, `business/${fileName}`);
        uploadBytes(imageRef, blob).then((snapshot)=>{
            console.log('File uploaded');
        }).then( resp =>{
          getDownloadURL(imageRef).then(async(url)=>{ 
            console.log(url);
            saveBusinessDetails(url)
            })
        });
        setLoading(false);
    }

    const saveBusinessDetails = async (imageUrl: string) => {
      const id = Date.now().toString();
      await setDoc(doc(db, 'BusinessList', id), {
        name: name,
        address: address,
        contact: contact,
        website: website,
        about: about,
        imageUrl: imageUrl,
        category: category,
        username: user?.fullName || 'Anonymous',
        userEmail: user?.primaryEmailAddress?.emailAddress || '',
        userImage: user?.imageUrl || '',
        id: id,
      });
      setLoading(false);
      router.back();
      ToastAndroid.show('Business Added', ToastAndroid.LONG);
    }

    const GetCategoryList=async() => {
        setCategoryList([]);

        const q = query(collection(db, 'Category'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            console.log( doc.data());
            setCategoryList(prevState => [...prevState, doc.data() as CategoryDataType]);
        })
    }
   return (
    <ScrollView
    style={{
        padding: 20,
        marginBottom: 30,
    }}
    >
      <Text
      style={{ 
        fontFamily: 'Raleway-Medium',
        fontSize: 20,
      }}
      >Add New Business</Text>
      <Text
        style={{ 
            fontFamily: 'Raleway',
            color: Colors.GRAY,
        }}
      >Fill all details in order to add new business</Text>
      <TouchableOpacity style={{
        marginTop: 20
      }}
      onPress={() => onImagePick()}
      > 
        {!image ? <Image source={require('@/assets/images/photo.png')} style={{ width: 100, height: 100, }} /> :
        <Image source={{uri:image}} style={{ width: 100, height: 100, borderRadius: 15}} /> }
      </TouchableOpacity> 

      <View>
        <TextInput placeholder='Business Name' 
          onChangeText={(text) => setName(text)}
          style={{ 
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize:17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'Raleway-Medium',
          }}
        />
        <TextInput placeholder='Address' 
          onChangeText={(text) => setAddress(text)}
          style={{ 
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize:17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'Raleway-Medium',
          }}
        />
        <TextInput placeholder='Contact' 
          onChangeText={(text) => setContact(text)}
          style={{ 
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize:17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'Raleway-Medium',
          }}
        />
        <TextInput placeholder='Website'
          onChangeText={(text) => setWebsite(text)} 
          style={{ 
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize:17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'Raleway-Medium',
          }}
        />
        <TextInput placeholder='About' 
          onChangeText={(text) => setAbout(text)}
          multiline
          numberOfLines={5}
          style={{ 
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize:17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'Raleway-Medium',
            height: 100,
          }}
        />
        <View style={{
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
        }}>
            <RNPickerSelect
              onValueChange={(value) =>   setCategory(value)}
              items={categoryList.map(item => ({ label: item.name, value: item.name }))}
            />
        </View>
      </View>  

      <TouchableOpacity
       disabled={loading}
       style={{
           padding: 15,
           backgroundColor: Colors.PRIMARY,
           borderRadius: 5,
           marginTop: 20,
        }}
        onPress={() => onAddNewBusiness()}
      >
        {loading ? <ActivityIndicator size={'large'} color={'#fff'}/>:<Text style={{
            textAlign: 'center',
            fontFamily: 'Raleway-Medium',
            paddingBottom: 30,
            color: '#fff',  
         }}>Add New Business</Text>}
      </TouchableOpacity>
      
    </ScrollView>
  )
}