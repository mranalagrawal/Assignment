import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, ActivityIndicator } from 'react-native';
import { fetchRandomDogImage } from '../services/dogApi';
import { errorHandler } from '../utils/helper';

const DogImageScreen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const getImage = async () => {
    setLoading(true);
    try {
      const res = await fetchRandomDogImage();
      setImageUrl(res);
    } catch (error) {
      setImageUrl('');
      console.log(error);
      errorHandler(error, 'Failed to fetch pet data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Text>Here's a random dog!</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 300, height: 300, marginVertical: 16 }}
        />
      ) : (
        <Text>Could not load image.</Text>
      )}
      <Button title="Load Another Dog" onPress={getImage} />
    </View>
  );
};

export default DogImageScreen;
