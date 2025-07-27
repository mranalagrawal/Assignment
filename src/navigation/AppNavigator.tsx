import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DogImageScreen from '../screens/DogImageScreen';
import PetFormScreen from '../screens/PetFormScreen';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'PetForm' ? 'paw-outline' : 'image-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="PetForm" component={PetFormScreen} />
      <Tab.Screen name="DogImage" component={DogImageScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
