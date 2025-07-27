import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { postPetDetails } from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { errorHandler } from '../utils/helper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from '../constants/dimension';
import { RFValue } from 'react-native-responsive-fontsize';
import { sizes } from '../constants/fontsSize';

type PetForm = {
  name: string;
  breed: string;
  age?: string;
};

const PetFormScreen = () => {
  const [form, setForm] = useState<PetForm>({ name: '', breed: '', age: '' });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleChoosePhoto = async () => {
    const res = await launchImageLibrary({ mediaType: 'photo' });
    if (res.assets && res.assets.length > 0) {
      setImageUri(res.assets[0].uri || null);
    }
  };

  const handleCamera = async () => {
    const res = await launchCamera({ mediaType: 'photo' });
    if (res.assets && res.assets.length > 0) {
      setImageUri(res.assets[0].uri || null);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.breed || !form.age || !imageUri) {
      Alert.alert(
        'Validation Error',
        'Please fill all required fields and select an image.',
      );
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('breed', form.breed);
    formData.append('age', form.age); 
    formData.append('image', {
      uri: imageUri,
      name: 'pet.jpg',
      type: 'image/jpeg',
    } as any); // TS fix

    try {
      const response = await postPetDetails(formData);
      Alert.alert('Success', 'Pet details submitted!');
      navigation.navigate('DogImage');
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
      errorHandler(error, 'Something went wrong while submitting pet details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Pet Name*</Text>
      <View style={styles.InputStyle}>
        <TextInput
          autoCapitalize="none"
          value={form.name}
          onChangeText={text => setForm({ ...form, name: text })}
          placeholderTextColor={'#D5D5D5'}
          style={[styles.Input]}
          placeholder={'Input Dog Name'}
        ></TextInput>
      </View>
      <Text>Breed*</Text>
      <View style={styles.InputStyle}>
        <TextInput
          autoCapitalize="none"
          value={form.breed}
          onChangeText={text => setForm({ ...form, breed: text })}
          placeholderTextColor={'#D5D5D5'}
          style={[styles.Input]}
          placeholder={'Input Dog Breed'}
        ></TextInput>
      </View>
      <Text>Age (optional)</Text>
      <View style={styles.InputStyle}>
        <TextInput
          autoCapitalize="none"
          value={form.age}
          onChangeText={text => setForm({ ...form, age: text })}
          placeholderTextColor={'#D5D5D5'}
          style={[styles.Input]}
          placeholder={'Input Dog Age'}
        ></TextInput>{' '}
      </View>
      <Button title="Pick from Gallery" onPress={handleChoosePhoto} />
      <Button title="Take Photo" onPress={handleCamera} />

      {imageUri && (
        <View style={styles.dogImage}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={[styles.buttonStyleText]}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PetFormScreen;

const styles = StyleSheet.create({
  InputStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: horizontalScale(5),
    backgroundColor: 'white',
    marginVertical: verticalScale(8),
    justifyContent: 'space-between',
  },

  Input: {
    width: '90%',
    paddingLeft: horizontalScale(5),
    color: 'black',
    height: verticalScale(windowWidth > 600 ? 30 : 35),
    fontSize: RFValue(sizes.p6, 667),
  },
  dogImage: {
    width: '50%',
    height: 150,
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(10),
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  buttonStyleText: {
    color: '#4c495a',
    fontSize: RFValue(sizes.p3, 667),
    marginLeft: horizontalScale(20),
  },
});
